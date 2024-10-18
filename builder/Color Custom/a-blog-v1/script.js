$(document).ready(function(){
  
  
  const setBg = () => {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return randomColor
  
}
  
 
  var el = $('#bottom'); 
  var bottom = el.position().top + el.outerHeight(true);
  
  
  $("main").css({
  display:"flex",
  justifyContent: 'center',
  alignItems:"center",
  position:"fixed"
   
  });
  
  
  $("input").animate({
   width: "230px",
   height:"100px"
   });
  
  
   
  $(".button").click(function(){
    if($("input").val()==""){
      alert("you have to write something")
    }else{
     const ourText=document.createElement('p');
      ourText.innerHTML =$("input").val();
      $("div").prepend(ourText);
      $("input").val("");
       ourText.classList.add("Text")
       ourText.style.backgroundColor="#" + setBg() ;
    }
  })
  
  $(".empty").click(function(){
   var r= confirm("This will delete all your posts")
      if(r==true){
        $("div").empty()
      }else{
        return
      }
  })
  

});