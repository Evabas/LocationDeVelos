var timer;

function Timer(mins, secs) {

    this.mins = mins;
    this.secs = secs;
}
Timer.prototype.stop = function() {
    clearTimeout(this.timeOut);
}
Timer.prototype.decrement = function() {
    minutes = document.getElementById("minutes");
    seconds = document.getElementById("secondes");
    this.secs = this.secs - 1;

    if (this.secs < 0) {
        this.mins = this.mins - 1
        this.secs = 59
    }
    if (this.mins < 0) {
        minutes.value = 0;
        seconds.value = 0;
        alert('Réservation expirée !');
    } else {
        minutes.value = this.mins;
        seconds.value = this.secs;
        this.timeOut = setTimeout(() => { this.decrement() }, 1000);
    }
}

//---------session storage timer-------------


if (sessionStorage.getItem("fin")) {
    var currentTime = Math.floor(Date.now() / 1000);
    var endTime = parseInt(sessionStorage.getItem("fin"));
    var remainingTime = endTime - currentTime;
    if (remainingTime >= 0) {
        var remainingMinutes = Math.floor(remainingTime / 60);
        var remainingSeconds = remainingTime - remainingMinutes * 60;
        timer = new Timer(remainingMinutes, remainingSeconds);
        timer.decrement();
    }
}