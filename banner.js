//Mobile Number Pattern Check
function checkMobileNumber() {
    var mobileNum = getValue('mobile');
    var mobilePattern = /^(?:\+88|88)?(01[3-9]\d{8})$/;

    if (mobileNum.match(mobilePattern)) {
        if (mobileNum.length > 11) {
            checkingMobile(mobileNum.slice(-11));
        } else {
            checkingMobile(mobileNum);
        }
        return true;
    } else {
        setInnerHtml('errorCheck',"*Mobile Number is not valid<br>");
        addClass('mobile', 'error');
        addClass('submitBtn', 'disabled');
        removeClass('submitBtn', 'enabled');
        return false;
    }
}
// Duplication Check
function checkingMobile(mobileNum) {
    var xhttp;
    if (mobileNum == "") {
        return;
    }
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if ('used' == this.responseText) {
                setInnerHtml('errorCheck',"*Mobile Number is Already used<br>");
                addClass('mobile', 'error');
                addClass('submitBtn', 'disabled');
                removeClass('submitBtn', 'enabled');
            } else {
                setInnerHtml('errorCheck',"<br>");
                addClass('submitBtn', 'enabled');
                removeClass('submitBtn', 'disabled');
                removeClass('mobile', 'error');
            }
        }else{
            setInnerHtml("errorCheck","*Server Connection Failed<br>");
        }
    };
    xhttp.open("GET", "http://localhost/banner-xml/checkMobileNumber.php?q=" + mobileNum, true);
    xhttp.send();
}
// Email
function checkEmail() {
    var emailText = document.getElementById('email').value;
    var emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{1,8}$/;

    if (emailText.match(emailPattern)) {
        setInnerHtml('errorCheck',"<br>");
        removeClass('email', 'error');
        return true;
    } else {
        setInnerHtml('errorCheck',"*Email Address Not valid. [some@thing.some]<br>");
        addClass('email', 'error');
        return false;
    }
}
// Name
function checkName() {
    var nameLength = document.getElementById('name').value.length;
    if (nameLength == 0) {
        addClass('name', 'error');
        setInnerHtml('errorCheck',"*Name is not valid<br>");
        return false;
    } else {
        removeClass('name', 'error');
        setInnerHtml('errorCheck',"<br>");
        return true;
    }
}

// Submit
function submitOperation() {
    var name = getValue('name');
    var email = getValue('email');
    var mobileNum = getValue('mobile');
    var division = getValue('division');
    var errorInfo;

    if (mobileNum.length > 11) {
        mobileNum = mobileNum.slice(-11);
    }
    if (!(checkName())) {
        errorInfo = '*Name is not valid';
    } else if (!(checkEmail())) {
        errorInfo = "*Email is not Valid"
    } else {
        if (mobileNum.length > 11) {
            submitForm(name, email, mobileNum.slice(-11), division);
        } else {
            submitForm(name, email, mobileNum, division);
        }

    }
}

function submitForm(name, email, mobileNum, division) {
    var xhttp;
    if (mobileNum == "" || email == "" || name == "" || division == "") {
        return;
    }
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if ('success' == this.responseText) {
                setInnerHtml('banner',"<h3 id='submissionSuccess'>Successfully Inserted</h3>");
            } else {
                document.getElementById("banner").innerHTML = "<p>" + this.responseText + "</p>";
            }
        }else{
            setInnerHtml('banner',"<h3 id='failSubmission'>Submission Failed<br> Server Not Working</h3>");
        }
    };
    var submitLink = 'http://localhost/banner-xml/formSubmit.php?name=' + name + '&email=' + email + '&mobile=' + mobileNum + '&division=' + division;
    xhttp.open("GET", submitLink, true);
    xhttp.send();
}

// Add remove Get set
function addClass(elementId, className) {
    document.getElementById(elementId).classList.add(className);
}
function removeClass(elementId, className) {
    document.getElementById(elementId).classList.remove(className);
}

function getValue(elementId){
    return document.getElementById(elementId).value;
}
function setInnerHtml(elementId,text){
    document.getElementById(elementId).innerHTML = text;
}