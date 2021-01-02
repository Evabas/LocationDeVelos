//Canvas

context = document.getElementById('canvas').getContext("2d");

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

redraw();

//Mouse down event: Quand l'utilisateur clique, on enregistre la position de la souris        
// dans un tableau avec la fonction addClick puis mise à jour du canvas avec redraw.
//Addclick, fonction qui sauve la position du clic
$('#canvas').mousedown(function(e) {
    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop); //on prend la position en x de la souris et on enlève la position du canvas en x (d'où offsetLeft uniquement)
    redraw();
});

//Mouse move event: paint va nous indiquer si le marqueur virtuel est appuyé sur le papier ou non
//Si paint est true alors nous enregistrons la valeur
//redraw : mise à jour

$('#canvas').mousemove(function(e) {
    if (paint) {
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        redraw();
    }
});

//Mouse up event: la souris est décliquée, le marqueur ne touche plus la page
$('#canvas').mouseup(function(e) {
    paint = false;
});

//Mouse leave event: le marqueur sort de la page
$('#canvas').mouseleave(function(e) {
    paint = false;
});


function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
    $('#validationCanvas').prop("disabled", false);
}

//propriétés du trait : couleur, forme, épaisseur
function redraw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    context.strokeStyle = "#000";
    context.lineJoin = "round";
    context.lineWidth = 5;

    for (var i = 0; i < clickX.length; i++) {
        context.beginPath();
        if (clickDrag[i] && i) {
            context.moveTo(clickX[i - 1], clickY[i - 1]);
        } else {
            context.moveTo(clickX[i] - 1, clickY[i]); //juste un point au mousedown
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
    }
}

// le canvas est nettoyé et les tableaux également
function effacer() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    clickX = [];
    clickY = [];
    clickDrag = [];
}