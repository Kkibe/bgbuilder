var stateLists = {
     USA: {"AK":"Alaska", "AL":"Alabama", "AR":"Arkansas", "AS":"American Samoa", "AZ":"Arizona", "CA":"California", "CO":"Colorado", "CT":"Connecticut", "DC":"District of Columbia", "DE":"Delaware", "FL":"Florida", "FM":"Federated States of Micronesia", "GA":"Georgia", "GU":"Guam", "HI":"Hawaii", "IA":"Iowa", "ID":"Idaho", "IL":"Illinois", "IN":"Indiana", "KS":"Kansas", "KY":"Kentucky", "LA":"Louisiana", "MA":"Massachusetts", "MD":"Maryland", "ME":"Maine", "MH":"Marshall Islands", "MI":"Michigan", "MN":"Minnesota", "MO":"Missouri", "MP":"Northern Mariana Islands", "MS":"Mississippi", "MT":"Montana", "NC":"North Carolina", "ND":"North Dakota", "NE":"Nebraska", "NH":"New Hampshire", "NJ":"New Jersey", "NM":"New Mexico", "NV":"Nevada", "NY":"New York", "OH":"Ohio", "OK":"Oklahoma", "OR":"Oregon", "PA":"Pennsylvania", "PR":"Puerto Rico", "PW":"Palau", "RI":"Rhode Island", "SC":"South Carolina", "SD":"South Dakota", "TN":"Tennessee", "TX":"Texas", "UT":"Utah", "VA":"Virginia", "VI":"Virgin Islands", "VT":"Vermont", "WA":"Washington", "WI":"Wisconsin", "WV":"West Virginia", "WY":"Wyoming"}
   , Canada:  {"AB":"Alberta", "BC":"British Columbia", "MB":"Manitoba", "NB":"New Brunswick", "NL":"Newfoundland", "NS":"Nova Scotia", "NT":"Northwest Territories", "NU":"Nunavut", "ON":"Ontario", "PE":"Prince Edward Island", "QC":"Quebec", "SK":"Saskatchewan", "YT":"Yukon"}
}

var select = document.getElementById('state')

function setStates(el) {
  if (el.value) {
    select.options.length = 0
    var list = stateLists[el.value]
    for (key in list) {
      var opt = document.createElement('option');
      opt.value = key;
      opt.innerHTML = list[key];
      select.appendChild(opt);
    }
  }
}  
function newWindow() {
   newwindow = window.open('', 'popup', 'width=700,height=1000');
    
   var firstname = document.getElementById('fname').value; var lastname = document.getElementById('lname').value; 
var address1 = document.getElementById('add1').value; 
var addy2 = document.getElementById('add2').value;
var city = document.getElementById('city').value;
     var state = document.getElementById('state').value;
    var zip = document.getElementById('zip').value;
     var country = document.getElementById('country').value;
    var college = document.getElementById('college').value;
    var occ = document.getElementById('occ').value;
var company = document.getElementById('comp').value; 
var textarea = document.getElementById('textbox').value;
  
   results= "<!DOCTYPE html><html lang='en'><head></head><body><h1>" + firstname + " " + lastname + "</h1><br>"+ address1 + "<br>" + addy2 + "<br>" + city + ", " + state + " " + zip + "<br>" + country + "<br>" + college + "<br>" + occ + "<br>"+ company + "<br><br>" + textarea + "</p>";     
newwindow.document.write(results)
}

function myFunction(){
document.getElementById("form1").style.color = "#ff0000";  
document.getElementById('form1').innerHTML = "Thank you for your submission! Please review your resume in the pop-up window."

}