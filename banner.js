function checkingMobile(mobileNum) {
    var xhttp;
    if (mobileNum == "") {
        return;
    }
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if ('used' == this.responseText) {
                document.getElementById("errorCheck").innerHTML = "*Mobile Number Already used<br>";
                document.getElementById('mobile').classList.add("error");
                document.getElementById('submitBtn').classList.add("disabled");
                document.getElementById('submitBtn').classList.remove("enabled");
            } else {
                document.getElementById("errorCheck").innerHTML = "<br>";
                document.getElementById('mobile').classList.remove("error");
                document.getElementById('submitBtn').classList.remove("disabled");
                document.getElementById('submitBtn').classList.add("enabled");
            }

        }
    };
    xhttp.open("GET", "checkMobileNumber.php?q=" + mobileNum, true);
    xhttp.send();
}

function checkMobileNumber() {
    var mobileNum = document.getElementById('mobile').value;
    var mobilePattern = /^(?:\+88|88)?(01[3-9]\d{8})$/;

    if (mobileNum.match(mobilePattern)) {
        checkingMobile(mobileNum);
        return true;
    } else {
        document.getElementById("errorCheck").innerHTML = "<br>";
        document.getElementById('mobile').classList.add("error");
        document.getElementById('submitBtn').classList.add("disabled");
        document.getElementById('submitBtn').classList.remove("enabled");
        return false;
    }

}

function checkName() {
    var nameLength = document.getElementById('name').value.length;
    if (nameLength == 0) {
        document.getElementById('name').classList.add("error");
        return false;
    } else {
        document.getElementById('name').classList.remove("error");
        return true;
    }
}