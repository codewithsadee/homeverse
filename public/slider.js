const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
let sliderInterval;

function changeSlide() {
    slides[currentSlide].style.opacity = 0;
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.opacity = 1;
}

function startSlider() {
    sliderInterval = setInterval(changeSlide, 5000);
}

function stopSlider() {
    clearInterval(sliderInterval);
}

slides.forEach(slide => {
    slide.addEventListener("mouseover", stopSlider);
    slide.addEventListener("mouseout", startSlider);
});

startSlider();