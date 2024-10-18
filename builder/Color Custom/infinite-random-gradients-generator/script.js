var bod = document.getElementById('holdMe')
colors = 0    

function loadAgain(){

  var buildPage = setInterval(buildGradient, 50)

  function buildGradient(){

    var colorBox = document.createElement('div')
    colorBox.className = "colorBox"

    var color = document.createElement('textarea')
    color.className = "color"
    color.onclick = function() {
      navigator.clipboard.writeText(this.value);
      this.parentElement.classList.add('copied')
      var b = this
      setTimeout(function(){
        b.parentElement.classList.remove('copied')
      },1500)
    }
    color.setAttribute("spellcheck","false")
    var colorOne = '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6)
    var colorTwo = '#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6)
    if(colorOne.length < 7) {
      colorOne = colorOne + "0"
    }
    if(colorTwo.length < 7) {
      colorTwo = colorTwo + "0"
    }
    var dir = Math.floor(Math.random()*8)*45
    color.style.background = "linear-gradient("+dir+"deg,"+colorOne+","+colorTwo+")"
    color.innerHTML = "linear-gradient("+dir+"deg, "+colorOne+", "+colorTwo+")"

    var colorUno = document.createElement('div')
    colorUno.className = "colorOne"
    colorUno.innerHTML = "<div class='colorSwatch' style='background-color:"+colorOne+"'></div> "+colorOne+"<div class='colorSwatch' style='background-color:"+colorTwo+"'></div> "+colorTwo

    if(colors < 100) {
      colors++
      bod.appendChild(colorBox).append(color, colorUno)
    } else {
      colors = 0
      clearInterval(buildPage)
      var num = Math.floor(Math.random()*100)   
      }
  }
}

function addMore() {
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 200) {
    window.removeEventListener('scroll', addMore)
    loadAgain()
    setTimeout(function(){
      window.addEventListener('scroll', addMore)
    }, 1000)
  }
}

window.addEventListener('scroll', addMore)
loadAgain()