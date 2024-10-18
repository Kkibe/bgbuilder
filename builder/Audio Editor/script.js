(function() {
  var App, Interface, Parse, Player, Porting, SubClass, Words,
    boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

  SubClass = class SubClass {
    constructor(parent, data) {
      this.root = parent.root || parent;
      this.parent = parent;
      if (typeof this.init === "function") {
        this.init(data);
      }
    }

  };

  Words = (function() {
    class Words extends SubClass {
      constructor() {
        super(...arguments);
        this.onScroll = this.onScroll.bind(this);
        this.makeNewWordElement = this.makeNewWordElement.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
      }

      init() {
        this.getElements();
        return this.addListeners();
      }

      getElements() {
        var element, i, len, ref, results;
        this.sliderContainer = document.querySelector(".words");
        this.elementContainer = document.querySelector(".words .slider");
        this.elements = document.querySelectorAll(".word");
        this.newWordButton = document.querySelector(".add-words");
        ref = this.elements;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          element = ref[i];
          results.push(this.addItemListeners(element));
        }
        return results;
      }

      addListeners() {
        this.newWordButton.addEventListener("click", this.makeNewWordElement);
        return this.elementContainer.addEventListener("mousewheel", this.onScroll);
      }

      onScroll(e) {
        boundMethodCheck(this, Words);
        e.preventDefault();
        this.sliderContainer.scrollLeft += e.deltaY;
        return this.sliderContainer.scrollLeft += e.deltaX;
      }

      makeNewWordElement() {
        var item, last;
        boundMethodCheck(this, Words);
        item = document.createElement("li");
        item.setAttribute("class", "word");
        item.innerHTML = this.template;
        last = this.elementContainer.lastChild;
        this.elementContainer.insertBefore(item, last);
        this.addItemListeners(item);
        return item.querySelector(".string").focus();
      }

      addItemListeners(item) {
        var pitch;
        item.querySelector(".delete").onclick = this.deleteItem;
        item.querySelector(".play").onclick = () => {
          return this.root.parse.item(item);
        };
        item.querySelector(".string").onchange = () => {
          return this.root.parse.item(item);
        };
        item.querySelector(".pitch").onchange = () => {
          var pitch;
          pitch = item.querySelector(".pitch").value / 100;
          item.querySelector(".string").style.top = `${100 - (10 + (pitch / 2 * 80))}%`;
          return this.root.parse.item(item);
        };
        item.querySelector(".rate").onchange = () => {
          return this.root.parse.item(item);
        };
        pitch = item.querySelector(".pitch").value / 100;
        return item.querySelector(".string").style.top = `${100 - (10 + (pitch / 2 * 80))}%`;
      }

      deleteItem(event) {
        var item;
        boundMethodCheck(this, Words);
        item = event.srcElement.parentNode.parentNode;
        return item.parentNode.removeChild(item);
      }

    };

    Words.prototype.template = "<div class=\"position\"> <input class=\"string\" type=\"text\" /> </div> <div class=\"settings\"> <button class=\"play\"></button><button class=\"delete\"></button> <label>Rate</label> <input class=\"rate\" type=\"range\" min=\"0\" value=\"10\" max=\"50\" /> <label>Pitch</label> <input class=\"pitch\" type=\"range\" min=\"0\" value=\"100\" max=\"200\" /> </div>";

    Words.prototype.list = [];

    Words.prototype.elements = [];

    return Words;

  }).call(this);

  Parse = (function() {
    class Parse extends SubClass {
      constructor() {
        super(...arguments);
        this.item = this.item.bind(this);
        this.words = this.words.bind(this);
      }

      init() {
        var i, len, option, results, select, voice, voices;
        voices = window.speechSynthesis.getVoices();
        select = document.querySelector(".voice-name");
        if (voices.length === 0) {
          return setTimeout(() => {
            return this.init();
          }, 100);
        } else {
          results = [];
          for (i = 0, len = voices.length; i < len; i++) {
            voice = voices[i];
            if (voice.name.substring(0, 6) !== "Google") {
              option = document.createElement("option");
              option.text = voice.name;
              option.voice = voice;
              results.push(select.appendChild(option));
            } else {
              results.push(void 0);
            }
          }
          return results;
        }
      }

      item(item) {
        var name, pitch, rate, string, utterance, voice, voices;
        boundMethodCheck(this, Parse);
        this.utterances = [];
        voices = speechSynthesis.getVoices();
        name = document.querySelector(".voice-name");
        voice = name[name.selectedIndex].voice;
        string = item.querySelector(".string").value;
        rate = item.querySelector(".rate").value / 10;
        pitch = item.querySelector(".pitch").value / 100;
        if (string.length > 0) {
          utterance = new SpeechSynthesisUtterance(string);
          utterance.voice = voice;
          utterance.pitch = pitch;
          utterance.rate = rate;
          utterance.element = item;
          this.utterances.push(utterance);
          return this.root.player.run();
        }
      }

      words() {
        var i, item, items, len, name, pitch, rate, string, utterance, voice, voices;
        boundMethodCheck(this, Parse);
        this.utterances = [];
        voices = speechSynthesis.getVoices();
        items = document.querySelectorAll(".words .slider .word");
        name = document.querySelector(".voice-name");
        voice = name[name.selectedIndex].voice;
        for (i = 0, len = items.length; i < len; i++) {
          item = items[i];
          string = item.querySelector(".string").value;
          rate = item.querySelector(".rate").value / 10;
          pitch = item.querySelector(".pitch").value / 100;
          item.querySelector(".string").style.top = `${100 - (10 + (pitch / 2 * 80))}%`;
          if (string.length > 0) {
            utterance = new SpeechSynthesisUtterance(string);
            utterance.voice = voice;
            utterance.pitch = pitch;
            utterance.rate = rate;
            utterance.element = item;
            this.utterances.push(utterance);
          }
        }
        return this.root.player.run();
      }

    };

    Parse.prototype.voice = null;

    Parse.prototype.utterances = [];

    return Parse;

  }).call(this);

  Player = class Player extends SubClass {
    run() {
      var i, index, len, self, utterance, utterances;
      utterances = this.root.parse.utterances;
      if (utterances.length > 0) {
        for (index = i = 0, len = utterances.length; i < len; index = ++i) {
          utterance = utterances[index];
          if (index + 1 !== utterances.length) {
            utterance.next = utterances[index + 1];
            self = this;
            utterance.onend = function() {
              var next;
              this.element.classList.remove("playing");
              next = this.next;
              self.speak(next);
              return this.onend = void 0;
            };
          }
        }
        return this.speak(utterances[0]);
      }
    }

    speak(utterance) {
      var ref;
      if ((ref = this.lastUtterance) != null) {
        ref.element.classList.remove("playing");
      }
      this.lastUtterance = utterance;
      this.lastUtterance.element.classList.add("playing");
      if (this.lastUtterance.onend === null) {
        this.lastUtterance.onend = function() {
          return this.element.classList.remove("playing");
        };
      }
      return window.speechSynthesis.speak(utterance);
    }

  };

  Interface = class Interface extends SubClass {
    init() {
      this.getElements();
      return this.addListeners();
    }

    getElements() {
      return this.playingButton = document.querySelector(".play-state");
    }

    addListeners() {
      this.playingButton.addEventListener("click", () => {
        if (this.playingButton.classList.contains("playing")) {

        } else {
          // todo: pause
          return this.root.parse.words();
        }
      });
      return setInterval(() => {
        if (window.speechSynthesis.speaking) {
          return this.playingButton.classList.add("playing");
        } else {
          return this.playingButton.classList.remove("playing");
        }
      }, 100);
    }

  };

  Porting = class Porting extends SubClass {
    init() {
      this.getElements();
      return this.addListeners();
    }

    getElements() {
      this.importButton = document.querySelector("button.import");
      this.exportButton = document.querySelector("button.export");
      this.modal = document.querySelector("aside");
      return this.closeButton = this.modal.querySelector(".close");
    }

    addListeners() {
      this.importButton.addEventListener("click", () => {
        this.modal.classList.add("active");
        this.modal.classList.remove("exporting");
        return this.modal.classList.add("importing");
      });
      this.exportButton.addEventListener("click", () => {
        this.modal.classList.add("active");
        this.modal.classList.remove("importing");
        return this.modal.classList.add("exporting");
      });
      return this.closeButton.addEventListener("click", () => {
        return this.modal.classList.remove("active");
      });
    }

  };

  App = class App {
    constructor() {
      this.words = new Words(this);
      this.parse = new Parse(this);
      this.player = new Player(this);
      this.interface = new Interface(this);
      this.porting = new Porting(this);
    }

  };

  new App();

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLEdBQUEsRUFBQSxTQUFBLEVBQUEsS0FBQSxFQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxFQUFBLEtBQUE7SUFBQTs7RUFBTSxXQUFOLE1BQUEsU0FBQTtJQUVFLFdBQWEsQ0FBRSxNQUFGLEVBQVcsSUFBWCxDQUFBO01BQ1gsSUFBQyxDQUFDLElBQUYsR0FBUyxNQUFNLENBQUMsSUFBUCxJQUFlO01BQ3hCLElBQUMsQ0FBQyxNQUFGLEdBQVc7O1FBQ1gsSUFBQyxDQUFDLEtBQU07O0lBSEc7O0VBRmY7O0VBT007SUFBTixNQUFBLE1BQUEsUUFBb0IsU0FBcEI7OztZQW1DRSxDQUFBLGVBQUEsQ0FBQTtZQUtBLENBQUEseUJBQUEsQ0FBQTtZQXNCQSxDQUFBLGlCQUFBLENBQUE7OztNQTVDQSxJQUFNLENBQUEsQ0FBQTtRQUNKLElBQUMsQ0FBQyxXQUFGLENBQUE7ZUFDQSxJQUFDLENBQUMsWUFBRixDQUFBO01BRkk7O01BSU4sV0FBYSxDQUFBLENBQUE7QUFDZixZQUFBLE9BQUEsRUFBQSxDQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQTtRQUFJLElBQUMsQ0FBQyxlQUFGLEdBQW9CLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCO1FBQ3BCLElBQUMsQ0FBQyxnQkFBRixHQUFxQixRQUFRLENBQUMsYUFBVCxDQUF1QixnQkFBdkI7UUFDckIsSUFBQyxDQUFDLFFBQUYsR0FBYSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsT0FBMUI7UUFDYixJQUFDLENBQUMsYUFBRixHQUFrQixRQUFRLENBQUMsYUFBVCxDQUF1QixZQUF2QjtBQUVsQjtBQUFBO1FBQUEsS0FBQSxxQ0FBQTs7dUJBQ0UsSUFBQyxDQUFDLGdCQUFGLENBQW1CLE9BQW5CO1FBREYsQ0FBQTs7TUFOVzs7TUFTYixZQUFjLENBQUEsQ0FBQTtRQUNa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LFNBQUosQ0FBYyxJQUFkO01BQ2QsSUFBQyxDQUFDLE9BQUYsR0FBWSxJQUFJLE9BQUosQ0FBWSxJQUFaO0lBTEQ7O0VBRmY7O0VBU0EsSUFBSSxHQUFKLENBQUE7QUFuT0EiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTdWJDbGFzc1xuICBcbiAgY29uc3RydWN0b3I6ICggcGFyZW50ICwgZGF0YSApIC0+XG4gICAgQC5yb290ID0gcGFyZW50LnJvb3Qgb3IgcGFyZW50XG4gICAgQC5wYXJlbnQgPSBwYXJlbnRcbiAgICBALmluaXQ/IGRhdGFcbiAgICBcbmNsYXNzIFdvcmRzIGV4dGVuZHMgU3ViQ2xhc3NcbiAgXG4gIHRlbXBsYXRlOiBcIlxuICAgIDxkaXYgY2xhc3M9XFxcInBvc2l0aW9uXFxcIj5cbiAgICAgIDxpbnB1dCBjbGFzcz1cXFwic3RyaW5nXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiAvPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XFxcInNldHRpbmdzXFxcIj5cbiAgICAgIDxidXR0b24gY2xhc3M9XFxcInBsYXlcXFwiPjwvYnV0dG9uPjxidXR0b24gY2xhc3M9XFxcImRlbGV0ZVxcXCI+PC9idXR0b24+XG4gICAgICA8bGFiZWw+UmF0ZTwvbGFiZWw+XG4gICAgICA8aW5wdXQgY2xhc3M9XFxcInJhdGVcXFwiIHR5cGU9XFxcInJhbmdlXFxcIiBtaW49XFxcIjBcXFwiIHZhbHVlPVxcXCIxMFxcXCIgbWF4PVxcXCI1MFxcXCIgLz5cbiAgICAgIDxsYWJlbD5QaXRjaDwvbGFiZWw+XG4gICAgICA8aW5wdXQgY2xhc3M9XFxcInBpdGNoXFxcIiB0eXBlPVxcXCJyYW5nZVxcXCIgbWluPVxcXCIwXFxcIiB2YWx1ZT1cXFwiMTAwXFxcIiBtYXg9XFxcIjIwMFxcXCIgLz5cbiAgICA8L2Rpdj5cbiAgXCJcbiAgXG4gIGxpc3Q6IFtdXG4gIGVsZW1lbnRzOiBbXVxuICBcbiAgaW5pdDogLT5cbiAgICBALmdldEVsZW1lbnRzKClcbiAgICBALmFkZExpc3RlbmVycygpXG4gICAgXG4gIGdldEVsZW1lbnRzOiAtPlxuICAgIEAuc2xpZGVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciBcIi53b3Jkc1wiXG4gICAgQC5lbGVtZW50Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciBcIi53b3JkcyAuc2xpZGVyXCJcbiAgICBALmVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCBcIi53b3JkXCJcbiAgICBALm5ld1dvcmRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIFwiLmFkZC13b3Jkc1wiXG4gICAgXG4gICAgZm9yIGVsZW1lbnQgaW4gQC5lbGVtZW50c1xuICAgICAgQC5hZGRJdGVtTGlzdGVuZXJzIGVsZW1lbnRcbiAgICBcbiAgYWRkTGlzdGVuZXJzOiAtPlxuICAgIEAubmV3V29yZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiAsIEAubWFrZU5ld1dvcmRFbGVtZW50XG4gICAgQC5lbGVtZW50Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIgXCJtb3VzZXdoZWVsXCIgLCBALm9uU2Nyb2xsXG4gICAgXG4gIG9uU2Nyb2xsOiAoIGUgKSA9PlxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIEAuc2xpZGVyQ29udGFpbmVyLnNjcm9sbExlZnQgKz0gZS5kZWx0YVlcbiAgICBALnNsaWRlckNvbnRhaW5lci5zY3JvbGxMZWZ0ICs9IGUuZGVsdGFYXG4gICAgXG4gIG1ha2VOZXdXb3JkRWxlbWVudDogPT5cbiAgICBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImxpXCJcbiAgICBpdGVtLnNldEF0dHJpYnV0ZSBcImNsYXNzXCIgLCBcIndvcmRcIlxuICAgIGl0ZW0uaW5uZXJIVE1MID0gQC50ZW1wbGF0ZVxuICAgIGxhc3QgPSBALmVsZW1lbnRDb250YWluZXIubGFzdENoaWxkXG4gICAgQC5lbGVtZW50Q29udGFpbmVyLmluc2VydEJlZm9yZSBpdGVtICwgbGFzdFxuICAgIEAuYWRkSXRlbUxpc3RlbmVycyBpdGVtXG4gICAgaXRlbS5xdWVyeVNlbGVjdG9yKFwiLnN0cmluZ1wiKS5mb2N1cygpXG4gICAgXG4gIGFkZEl0ZW1MaXN0ZW5lcnM6ICggaXRlbSApIC0+XG4gICAgaXRlbS5xdWVyeVNlbGVjdG9yKCBcIi5kZWxldGVcIiApLm9uY2xpY2sgPSBALmRlbGV0ZUl0ZW0gXG4gICAgaXRlbS5xdWVyeVNlbGVjdG9yKCBcIi5wbGF5XCIgKS5vbmNsaWNrID0gPT4gQC5yb290LnBhcnNlLml0ZW0gaXRlbVxuICAgIGl0ZW0ucXVlcnlTZWxlY3RvciggXCIuc3RyaW5nXCIgKS5vbmNoYW5nZSA9ID0+IEAucm9vdC5wYXJzZS5pdGVtIGl0ZW1cbiAgICBpdGVtLnF1ZXJ5U2VsZWN0b3IoIFwiLnBpdGNoXCIgKS5vbmNoYW5nZSA9ID0+XG4gICAgICBwaXRjaCA9IGl0ZW0ucXVlcnlTZWxlY3RvciggXCIucGl0Y2hcIiApLnZhbHVlIC8gMTAwXG4gICAgICBpdGVtLnF1ZXJ5U2VsZWN0b3IoIFwiLnN0cmluZ1wiICkuc3R5bGUudG9wID0gXCIjezEwMCAtICgxMCsgKCBwaXRjaCAvIDIgKiA4MCApKX0lXCJcbiAgICAgIEAucm9vdC5wYXJzZS5pdGVtIGl0ZW1cbiAgICBpdGVtLnF1ZXJ5U2VsZWN0b3IoIFwiLnJhdGVcIiApLm9uY2hhbmdlID0gPT4gQC5yb290LnBhcnNlLml0ZW0gaXRlbVxuICAgIFxuICAgIHBpdGNoID0gaXRlbS5xdWVyeVNlbGVjdG9yKCBcIi5waXRjaFwiICkudmFsdWUgLyAxMDBcbiAgICBpdGVtLnF1ZXJ5U2VsZWN0b3IoIFwiLnN0cmluZ1wiICkuc3R5bGUudG9wID0gXCIjezEwMCAtICgxMCsgKCBwaXRjaCAvIDIgKiA4MCApKX0lXCJcbiAgXG4gIGRlbGV0ZUl0ZW06ICggZXZlbnQgKSA9PlxuICAgIGl0ZW0gPSBldmVudC5zcmNFbGVtZW50LnBhcmVudE5vZGUucGFyZW50Tm9kZVxuICAgIGl0ZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCBpdGVtXG4gICAgXG5jbGFzcyBQYXJzZSBleHRlbmRzIFN1YkNsYXNzXG4gIFxuICB2b2ljZTogbnVsbFxuICB1dHRlcmFuY2VzOiBbXVxuICBcbiAgaW5pdDogLT5cbiAgICB2b2ljZXMgPSB3aW5kb3cuc3BlZWNoU3ludGhlc2lzLmdldFZvaWNlcygpXG4gICAgc2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciBcIi52b2ljZS1uYW1lXCJcbiAgICBcbiAgICBpZiB2b2ljZXMubGVuZ3RoIGlzIDBcbiAgICAgIHNldFRpbWVvdXQgPT5cbiAgICAgICAgQC5pbml0KCkgXG4gICAgICAsIDEwMFxuICAgIGVsc2VcbiAgICAgIGZvciB2b2ljZSBpbiB2b2ljZXNcbiAgICAgICAgaWYgdm9pY2UubmFtZS5zdWJzdHJpbmcoIDAsIDYgKSBpc250IFwiR29vZ2xlXCJcbiAgICAgICAgICBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwib3B0aW9uXCJcbiAgICAgICAgICBvcHRpb24udGV4dCA9IHZvaWNlLm5hbWVcbiAgICAgICAgICBvcHRpb24udm9pY2UgPSB2b2ljZVxuICAgICAgICAgIHNlbGVjdC5hcHBlbmRDaGlsZCBvcHRpb25cbiAgICAgICAgICBcbiAgaXRlbTogKCBpdGVtICkgPT5cbiAgICBALnV0dGVyYW5jZXMgPSBbXVxuICAgIHZvaWNlcyA9IHNwZWVjaFN5bnRoZXNpcy5nZXRWb2ljZXMoKVxuICAgIFxuICAgIG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIFwiLnZvaWNlLW5hbWVcIlxuICAgIHZvaWNlID0gbmFtZVsgbmFtZS5zZWxlY3RlZEluZGV4IF0udm9pY2VcbiAgICAgIFxuICAgIHN0cmluZyA9IGl0ZW0ucXVlcnlTZWxlY3RvciggXCIuc3RyaW5nXCIgKS52YWx1ZVxuICAgIHJhdGUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoIFwiLnJhdGVcIiApLnZhbHVlIC8gMTBcbiAgICBwaXRjaCA9IGl0ZW0ucXVlcnlTZWxlY3RvciggXCIucGl0Y2hcIiApLnZhbHVlIC8gMTAwXG5cbiAgICBpZiBzdHJpbmcubGVuZ3RoID4gMFxuICAgICAgdXR0ZXJhbmNlID0gbmV3IFNwZWVjaFN5bnRoZXNpc1V0dGVyYW5jZSBzdHJpbmdcbiAgICAgIHV0dGVyYW5jZS52b2ljZSA9IHZvaWNlXG4gICAgICB1dHRlcmFuY2UucGl0Y2ggPSBwaXRjaFxuICAgICAgdXR0ZXJhbmNlLnJhdGUgPSByYXRlXG4gICAgICB1dHRlcmFuY2UuZWxlbWVudCA9IGl0ZW1cbiAgICAgIEAudXR0ZXJhbmNlcy5wdXNoIHV0dGVyYW5jZVxuICAgIFxuICAgICAgQC5yb290LnBsYXllci5ydW4oKVxuICAgICAgXG4gIHdvcmRzOiA9PlxuICAgIFxuICAgIEAudXR0ZXJhbmNlcyA9IFtdXG4gICAgdm9pY2VzID0gc3BlZWNoU3ludGhlc2lzLmdldFZvaWNlcygpXG4gICAgXG4gICAgaXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsIFwiLndvcmRzIC5zbGlkZXIgLndvcmRcIlxuICAgIG5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIFwiLnZvaWNlLW5hbWVcIlxuICAgIHZvaWNlID0gbmFtZVsgbmFtZS5zZWxlY3RlZEluZGV4IF0udm9pY2VcbiAgICBcbiAgICBmb3IgaXRlbSBpbiBpdGVtc1xuICAgICAgXG4gICAgICBzdHJpbmcgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoIFwiLnN0cmluZ1wiICkudmFsdWVcbiAgICAgIHJhdGUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoIFwiLnJhdGVcIiApLnZhbHVlIC8gMTBcbiAgICAgIHBpdGNoID0gaXRlbS5xdWVyeVNlbGVjdG9yKCBcIi5waXRjaFwiICkudmFsdWUgLyAxMDBcbiAgICAgIFxuICAgICAgaXRlbS5xdWVyeVNlbGVjdG9yKCBcIi5zdHJpbmdcIiApLnN0eWxlLnRvcCA9IFwiI3sxMDAgLSAoMTAgKyAoIHBpdGNoIC8gMiAqIDgwICkpfSVcIlxuICAgICAgXG4gICAgICBpZiBzdHJpbmcubGVuZ3RoID4gMFxuICAgICAgICB1dHRlcmFuY2UgPSBuZXcgU3BlZWNoU3ludGhlc2lzVXR0ZXJhbmNlIHN0cmluZ1xuICAgICAgICB1dHRlcmFuY2Uudm9pY2UgPSB2b2ljZVxuICAgICAgICB1dHRlcmFuY2UucGl0Y2ggPSBwaXRjaFxuICAgICAgICB1dHRlcmFuY2UucmF0ZSA9IHJhdGVcbiAgICAgICAgdXR0ZXJhbmNlLmVsZW1lbnQgPSBpdGVtXG4gICAgICAgIEAudXR0ZXJhbmNlcy5wdXNoIHV0dGVyYW5jZVxuICAgIFxuICAgIEAucm9vdC5wbGF5ZXIucnVuKClcbiAgICAgICAgXG5jbGFzcyBQbGF5ZXIgZXh0ZW5kcyBTdWJDbGFzc1xuICBcbiAgcnVuOiAtPiBcbiAgICB1dHRlcmFuY2VzID0gQC5yb290LnBhcnNlLnV0dGVyYW5jZXNcbiAgICBpZiB1dHRlcmFuY2VzLmxlbmd0aCA+IDBcbiAgICAgIGZvciB1dHRlcmFuY2UsIGluZGV4IGluIHV0dGVyYW5jZXNcbiAgICAgICAgaWYgaW5kZXggKyAxIGlzbnQgdXR0ZXJhbmNlcy5sZW5ndGhcbiAgICAgICAgICB1dHRlcmFuY2UubmV4dCA9IHV0dGVyYW5jZXNbIGluZGV4ICsgMSBdXG4gICAgICAgICAgc2VsZiA9IEBcbiAgICAgICAgICB1dHRlcmFuY2Uub25lbmQgPSAtPlxuICAgICAgICAgICAgQC5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUgXCJwbGF5aW5nXCJcbiAgICAgICAgICAgIG5leHQgPSBALm5leHRcbiAgICAgICAgICAgIHNlbGYuc3BlYWsgbmV4dFxuICAgICAgICAgICAgQC5vbmVuZCA9IHVuZGVmaW5lZFxuICAgICAgICAgICAgXG4gICAgICBALnNwZWFrIHV0dGVyYW5jZXNbMF1cbiAgICAgICAgICBcbiAgc3BlYWs6ICggdXR0ZXJhbmNlICkgLT5cbiAgICBcbiAgICBALmxhc3RVdHRlcmFuY2U/LmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSBcInBsYXlpbmdcIlxuICAgIEAubGFzdFV0dGVyYW5jZSA9IHV0dGVyYW5jZVxuICAgIEAubGFzdFV0dGVyYW5jZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQgXCJwbGF5aW5nXCJcbiAgICBcbiAgICBpZiBALmxhc3RVdHRlcmFuY2Uub25lbmQgaXMgbnVsbFxuICAgICAgQC5sYXN0VXR0ZXJhbmNlLm9uZW5kID0gLT5cbiAgICAgICAgQC5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUgXCJwbGF5aW5nXCJcbiAgICBcbiAgICB3aW5kb3cuc3BlZWNoU3ludGhlc2lzLnNwZWFrIHV0dGVyYW5jZVxuICBcbmNsYXNzIEludGVyZmFjZSBleHRlbmRzIFN1YkNsYXNzXG4gIFxuICBpbml0OiAtPlxuICAgIEAuZ2V0RWxlbWVudHMoKVxuICAgIEAuYWRkTGlzdGVuZXJzKClcbiAgICBcbiAgZ2V0RWxlbWVudHM6IC0+XG4gICAgQC5wbGF5aW5nQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciBcIi5wbGF5LXN0YXRlXCJcbiAgICBcbiAgYWRkTGlzdGVuZXJzOiAtPlxuICAgIEAucGxheWluZ0J1dHRvbi5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiAsID0+XG4gICAgICBpZiBALnBsYXlpbmdCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zIFwicGxheWluZ1wiXG4gICAgICAgICMgdG9kbzogcGF1c2VcbiAgICAgIGVsc2VcbiAgICAgICAgQC5yb290LnBhcnNlLndvcmRzKClcbiAgICBcbiAgICBzZXRJbnRlcnZhbCA9PlxuICAgICAgaWYgd2luZG93LnNwZWVjaFN5bnRoZXNpcy5zcGVha2luZ1xuICAgICAgICBALnBsYXlpbmdCdXR0b24uY2xhc3NMaXN0LmFkZCBcInBsYXlpbmdcIlxuICAgICAgZWxzZVxuICAgICAgICBALnBsYXlpbmdCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSBcInBsYXlpbmdcIlxuICAgICwgMTAwXG4gICAgXG5jbGFzcyBQb3J0aW5nIGV4dGVuZHMgU3ViQ2xhc3NcbiAgXG4gIGluaXQ6IC0+XG4gICAgQC5nZXRFbGVtZW50cygpXG4gICAgQC5hZGRMaXN0ZW5lcnMoKVxuICAgIFxuICBnZXRFbGVtZW50czogLT5cbiAgICBALmltcG9ydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgXCJidXR0b24uaW1wb3J0XCJcbiAgICBALmV4cG9ydEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgXCJidXR0b24uZXhwb3J0XCJcbiAgICBALm1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciBcImFzaWRlXCJcbiAgICBALmNsb3NlQnV0dG9uID0gQC5tb2RhbC5xdWVyeVNlbGVjdG9yIFwiLmNsb3NlXCJcbiAgICBcbiAgYWRkTGlzdGVuZXJzOiAtPlxuICAgIEAuaW1wb3J0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIgXCJjbGlja1wiICwgPT5cbiAgICAgIEAubW9kYWwuY2xhc3NMaXN0LmFkZCBcImFjdGl2ZVwiXG4gICAgICBALm1vZGFsLmNsYXNzTGlzdC5yZW1vdmUgXCJleHBvcnRpbmdcIlxuICAgICAgQC5tb2RhbC5jbGFzc0xpc3QuYWRkIFwiaW1wb3J0aW5nXCJcbiAgICBALmV4cG9ydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiAsID0+XG4gICAgICBALm1vZGFsLmNsYXNzTGlzdC5hZGQgXCJhY3RpdmVcIlxuICAgICAgQC5tb2RhbC5jbGFzc0xpc3QucmVtb3ZlIFwiaW1wb3J0aW5nXCJcbiAgICAgIEAubW9kYWwuY2xhc3NMaXN0LmFkZCBcImV4cG9ydGluZ1wiXG4gICAgQC5jbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiAsID0+XG4gICAgICBALm1vZGFsLmNsYXNzTGlzdC5yZW1vdmUgXCJhY3RpdmVcIlxuICAgIFxuY2xhc3MgQXBwXG4gIFxuICBjb25zdHJ1Y3RvcjogLT5cbiAgICBALndvcmRzID0gbmV3IFdvcmRzIEBcbiAgICBALnBhcnNlID0gbmV3IFBhcnNlIEBcbiAgICBALnBsYXllciA9IG5ldyBQbGF5ZXIgQFxuICAgIEAuaW50ZXJmYWNlID0gbmV3IEludGVyZmFjZSBAXG4gICAgQC5wb3J0aW5nID0gbmV3IFBvcnRpbmcgQFxuICAgXG5uZXcgQXBwXG4gICJdfQ==
//# sourceURL=coffeescript