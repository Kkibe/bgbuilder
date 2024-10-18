function myfunction(){
        var fname = document.getElementById("First").value;
        var lname = document.getElementById("Last").value;
        var firstname = fname.charAt(0);
        document.getElementById("Fname").innerHTML = firstname;
        var lastname = lname.charAt(0);
        document.getElementById("Lname").innerHTML = lastname;
    };