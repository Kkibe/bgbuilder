function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah')
                    .attr('src', e.target.result)
                    .width()
                    .height();
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
        function emi()
        {      
		      
         
                var P = document.formval.pr_amt.value;

                var rate = document.formval.int_rate.value; 
                var n = document.formval.period.value; 
                var em=document.formval.email.value;
                var ph=document.formval.mobile.value;
                var sk=document.formval.skill.value;
                 var l1 = document.formval.lang1.value; 
                var l2=document.formval.lang2.value;
                var l3=document.formval.lang3.value;
                 var w=document.formval.wd.value;
                  var d=document.formval.due.value;
                  var w1=document.formval.explain.value;
                  var qualification=document.formval.grad.value;
                  var qualid=document.formval.graddur.value;
                  var summary1=document.formval.s1.value;
                  var qualification1=document.formval.grad1.value;
                  var qualid1=document.formval.graddur1.value;
                  var summary2=document.formval.s2.value;
                   var qualification2=document.formval.grad1.value;
                  var qualid2=document.formval.graddur1.value;
                  var summary3=document.formval.s2.value;


                 /*operation*/
                document.getElementById("name").innerHTML=P;
                document.getElementById("position").innerHTML=rate;
                document.getElementById("place").innerHTML=n;
                document.getElementById("email").innerHTML=em;
                document.getElementById("mb").innerHTML=ph;
                document.getElementById("w3review").innerHTML=sk;

                document.getElementById("one").value=l1;
                document.getElementById("two").value=l2;
                document.getElementById("three").value=l3;
                document.getElementById("WE").innerHTML=w;
                  document.getElementById("duration").innerHTML=d;
                  document.getElementById("work2").innerHTML=w1;

                // course1
                  document.getElementById("cr1").innerHTML=qualification;
                document.getElementById("cd1").innerHTML=qualid;
                document.getElementById("sum1").innerHTML=summary1;

                                // course2
                  document.getElementById("cr2").innerHTML=qualification1;
                document.getElementById("cd2").innerHTML=qualid1;
                document.getElementById("sum2").innerHTML=summary2;
                  // course2
                  document.getElementById("cr3").innerHTML=qualification2;
                document.getElementById("cd3").innerHTML=qualid2;
                document.getElementById("sum3").innerHTML=summary3;



                
                 if(P=="" && rate=="" && n=="")
                 {
                     document.getElementById("demo").innerHTML="Must fill valid data";
                 }
                 else {
                 	document.getElementById("demo").innerHTML="";
                 	document.getElementById("bexresult").style.display = "block";
                  document.getElementById("box").style.display = "none";
                 }
          
        }
        function emires(){
		 document.getElementById("bexresult").style.display = "none";
        	     document.formval.pr_amt.value="";
                 document.formval.int_rate.value="";
                 document.formval.period.value=""; 
                 document.formval.field1.value = "";
                 document.formval.field2.value = "";
                 document.formval.field3.value = "";
                 document.formval.field4.value = "";

                 document.getElementById("demo").innerHTML="";
        }