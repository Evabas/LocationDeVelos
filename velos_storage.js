//----------local storage des noms-------------

$(document).ready(function() {

    var inputName = document.getElementById('nom');
    var inputSurname = document.getElementById('prenom');

    if (!localStorage.getItem('nom')) {
        populateStorage();
    } else {
        retrieve();
    }

    function populateStorage() {
        localStorage.setItem('nom', inputName.value);
        localStorage.setItem('prenom', inputSurname.value);
    }

    function retrieve() {
        var currentName = localStorage.getItem('nom');
        var currentSurname = localStorage.getItem('prenom');

        inputName.value = currentName;
        inputSurname.value = currentSurname;

    }
    inputName.onchange = populateStorage;
    inputSurname.onchange = populateStorage;

});