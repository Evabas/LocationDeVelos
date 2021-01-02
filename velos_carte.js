//-----------carte et utilisation des données JC décaux----------------

// moteur de carte
var carte = L.map('maCarte').setView([47.218371, -1.553621], 14);
// fond de carte osm
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(carte);

jcdurl = 'https://api.jcdecaux.com/vls/v1/stations?contract=Nantes&apiKey=f54ba1632ff68485766d93a0824e2ebd8aae11e9'

var logo = L.icon({
    iconUrl: 'images/icone.png',
    iconSize: [30, 35],
});

// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
const ajaxGet = (url, callback) => {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function() {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function() {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}

//-------------Affichage des données obtenues (marqueurs + panneau latéral)---------
$('#reservation').prop("disabled", true);
var monTableau = [];
var currentElement;
const afficherSurCarte = (reponse) => {
    // Transforme la réponse en tableau d'objets JavaScript
    monTableau = JSON.parse(reponse);
    // lire le nombre d'elements du tableau
    var nbStation = monTableau.length;

    for (i = 0; i < nbStation; i++) {
        var latStation = monTableau[i].position.lat;
        var lngStation = monTableau[i].position.lng;
        var infos = monTableau[i].address;
        L.marker([latStation, lngStation], {
                icon: logo,
            })
            .bindPopup(infos)
            .addTo(carte)
            .on('click', (e) => {
                currentElement = monTableau.find((element) => element.address === e.target._popup._content);
                $('#panneauInfo').html('<p><b>Détails de la station</b></br></br><b>Adresse</b> : ' + currentElement.address + '</p>');
                $('#panneauInfo').append('<p><b>Statut</b> : ' + currentElement.status + '</p>');
                $('#panneauInfo').append('<p><b>Vélos disponibles</b> : ' + currentElement.available_bikes + '</p>');
                $('#reservation').prop("disabled", false);
            });
    }
};

ajaxGet(jcdurl, afficherSurCarte);