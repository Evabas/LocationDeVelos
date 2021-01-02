function Slider(slides) {
    var myTimer;
    $('#nextButton').click(() => { this.plusSlide(1) });
    $('#prevButton').click(() => { this.plusSlide(-1) });
    $('#pauseButton').click(() => { this.pause() });
    $('#playButton').click(() => { this.play() });

    $(document).keydown(function(e) {
        switch (e.keyCode) {
            case 37:
                sliderVelo.plusSlide(-1)
                break;
            case 39:
                sliderVelo.plusSlide(1)
                break;
        }
    });
    this.slideIndex = -1;
    this.slides = slides
}
Slider.prototype.showSlide = function() {
    var i;
    for (i = 0; i < this.slides.length; i++) {
        this.slides[i].style.display = "none";
    }
    if (this.slideIndex >= this.slides.length) { this.slideIndex = 0 }
    if (this.slideIndex < 0) { this.slideIndex = this.slides.length - 1 }

    this.slides[this.slideIndex].style.display = "block";
}

Slider.prototype.plusSlide = function(n) {
    this.slideIndex += n
    this.showSlide();
}

Slider.prototype.autoSlide = function() {
    this.slideIndex++;
    this.showSlide();
    myTimer = setTimeout(() => { this.autoSlide() }, 5000);
}

Slider.prototype.pause = function() {
    clearTimeout(myTimer);
}

Slider.prototype.play = function() {
    this.autoSlide();
}

var theSlides = document.getElementsByClassName("mySlides");
var sliderVelo = new Slider(theSlides);
sliderVelo.autoSlide();