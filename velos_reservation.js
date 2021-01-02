//----------------------------bouton reservation--------------------------------------
$(document).ready(function() {

    var appSignature = document.getElementById("signature");
    var inputAddress = document.getElementById("adresse");
    var inputStatut = document.getElementById("statut");
    var inputvelosDisp = document.getElementById("velosDisp");

    document.getElementById("reservation").onclick = function() {
        currentElement; // variable dÃ©clarÃ©e dans velos-carte.js
        appSignature.style.display = "block";
        window.scrollTo(1000, 2000);
        $('#validationCanvas').prop("disabled", true);
        if (timer) { // s'il y avait une rÃ©sa elle est annulÃ©e
            timer.stop()
            minutes.value = 0;
            seconds.value = 0;
        };

        sessionStorage.setItem("adresse", currentElement.address);
        sessionStorage.setItem("statut", currentElement.status);
        sessionStorage.setItem("velosDisp", currentElement.available_bikes);

        if (sessionStorage.getItem("adresse")) {
            var currentAddress = sessionStorage.getItem("adresse");
            inputAddress.value = currentAddress;
        };

        if (sessionStorage.getItem("statut")) {
            var currentStatus = sessionStorage.getItem("statut");
            inputStatut.value = currentStatus;
        };

        if (sessionStorage.getItem("velosDisp")) {
            var currentavailableBike = sessionStorage.getItem("velosDisp");
            inputvelosDisp.value = currentavailableBike - 1;
        };

        if (currentavailableBike == 0) {
            alert("Il n'y a plus de vélos disponibles à cette station. Choisissez une autre station.")
            inputvelosDisp.value = 0;
            $('#reservation').prop("disabled", true);
            window.scrollTo(1000, 600);
        };
    };

    //----------------------------bouton validation canvas-------------------------------------- 

    document.getElementById("validationCanvas").onclick = function() {
        var currentTime = Math.floor(Date.now() / 1000);
        var endTime = currentTime + 1200;
        sessionStorage.setItem("fin", endTime);
        var remainingTime = endTime - currentTime;
        var compteARebours = document.getElementById("compteARebours");
        compteARebours.style.display = "block";
        if (remainingTime >= 0) {
            var remainingMinutes = Math.floor(remainingTime / 60);
            var remainingSeconds = remainingTime - remainingMinutes * 60;
            if (timer) {
                timer.stop();
            }
            timer = new Timer(remainingMinutes, remainingSeconds);
            timer.decrement();
        }
        document.getElementById("signature").style.display = "none";
    };

    //----------------------------bouton annulation canvas--------------------------------------

    document.getElementById("annulerCanvas").onclick = function() {

        effacer();
        if (timer) {
            timer.stop()
            minutes.value = 0;
            seconds.value = 0;
        };
        inputAddress.value = null;
        inputStatut.value = null;
        inputvelosDisp.value = null;
        sessionStorage.clear();
        $('#validationCanvas').prop("disabled", true);
    };

    //----------------------------bouton effacer canvas--------------------------------------

    document.getElementById("effacerCanvas").onclick = function() {
        effacer();
        if (timer) {
            timer.stop()
            minutes.value = 0;
            seconds.value = 0;
        };
        $('#validationCanvas').prop("disabled", true);
    };

    //----------------------------bouton annulation reservation--------------------------------------

    document.getElementById("annulation").onclick = function() {

        effacer();
        if (timer) {
            timer.stop()
            minutes.value = 0;
            seconds.value = 0;
        };
        inputAddress.value = null;
        inputStatut.value = null;
        inputvelosDisp.value = null;
        sessionStorage.clear();
    };
});

//------------persistance de l'affichage du timer au rafraichissement de la page----------------

$(document).ready(function() {
    if (sessionStorage.getItem("fin")) {
        compteARebours.style.display = "block";
    }
});