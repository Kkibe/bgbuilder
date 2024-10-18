init();
function init() {
  /*Remove*/
  /*var currentURL = document.URL;
  var params = currentURL.extract();
  alert(params.c);
  $(".hexinput").val(params.c);
  /*To here to make it work, I'm editing*/
  setInterval(update,100);
}

update();
var previous = "";
$(".hexinput").change(function() {
  //alert();
  update();
});
function update() {
  var text = $(".hexinput").val();
  if (text.charAt(0) == "#") {
    text = text.slice(1);
  }
  if (text.length == 3) {
    text = text.charAt(0) + text.charAt(0) + text.charAt(1) + text.charAt(1) + text.charAt(2) + text.charAt(2);
  }
  if(/(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i.test(text) && text != previous) {
    previous = text;
    $("body").css("background-color","#" + text);
    $(".top .b0").css("background-color","#" + text).text("#" + text);
    $(".top .b1").css("background-color",blendColors("#" + text, "#FFFFFF", 0.1)).text(blendColors("#" + text, "#FFFFFF", 0.1));
    $(".top .b2").css("background-color",blendColors("#" + text, "#FFFFFF", 0.2)).text(blendColors("#" + text, "#FFFFFF", 0.2));
    $(".top .b3").css("background-color",blendColors("#" + text, "#FFFFFF", 0.3)).text(blendColors("#" + text, "#FFFFFF", 0.3));
    $(".top .b4").css("background-color",blendColors("#" + text, "#FFFFFF", 0.4)).text(blendColors("#" + text, "#FFFFFF", 0.4));
    $(".top .b5").css("background-color",blendColors("#" + text, "#FFFFFF", 0.5)).text(blendColors("#" + text, "#FFFFFF", 0.5));
    $(".top .b6").css("background-color",blendColors("#" + text, "#FFFFFF", 0.6)).text(blendColors("#" + text, "#FFFFFF", 0.6));
    $(".top .b7").css("background-color",blendColors("#" + text, "#FFFFFF", 0.7)).text(blendColors("#" + text, "#FFFFFF", 0.7));
    $(".top .b8").css("background-color",blendColors("#" + text, "#FFFFFF", 0.8)).text(blendColors("#" + text, "#FFFFFF", 0.8));
    $(".top .b9").css("background-color",blendColors("#" + text, "#FFFFFF", 0.9)).text(blendColors("#" + text, "#FFFFFF", 0.9));
    $(".top .b10").css("background-color",blendColors("#" + text, "#FFFFFF", 1.0)).text(blendColors("#" + text, "#FFFFFF", 1));
    
    $(".bottom .b0").css("background-color","#" + text).text("#" + text);
    $(".bottom .b1").css("background-color",blendColors("#" + text, "#000000", 0.1)).text(blendColors("#" + text, "#000000", 0.1));
    $(".bottom .b2").css("background-color",blendColors("#" + text, "#000000", 0.2)).text(blendColors("#" + text, "#000000", 0.2));
    $(".bottom .b3").css("background-color",blendColors("#" + text, "#000000", 0.3)).text(blendColors("#" + text, "#000000", 0.3));
    $(".bottom .b4").css("background-color",blendColors("#" + text, "#000000", 0.4)).text(blendColors("#" + text, "#000000", 0.4));
    $(".bottom .b5").css("background-color",blendColors("#" + text, "#000000", 0.5)).text(blendColors("#" + text, "#000000", 0.5));
    $(".bottom .b6").css("background-color",blendColors("#" + text, "#000000", 0.6)).text(blendColors("#" + text, "#000000", 0.6));
    $(".bottom .b7").css("background-color",blendColors("#" + text, "#000000", 0.7)).text(blendColors("#" + text, "#000000", 0.7));
    $(".bottom .b8").css("background-color",blendColors("#" + text, "#000000", 0.8)).text(blendColors("#" + text, "#000000", 0.8));
    $(".bottom .b9").css("background-color",blendColors("#" + text, "#000000", 0.9)).text(blendColors("#" + text, "#000000", 0.9));
    $(".bottom .b10").css("background-color",blendColors("#" + text, "#000000", 1.0)).text(blendColors("#" + text, "#000000", 1));
  }
}

function blendColors(c0, c1, p) {
    var f=parseInt(c0.slice(1),16),t=parseInt(c1.slice(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
    return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).slice(1);
}

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}