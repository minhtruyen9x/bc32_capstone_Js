const carousel = document.querySelector(".carousel")
const slides = document.querySelectorAll(".slide__image")
const indicator = document.querySelectorAll(".slide__indicator button")

let currentSlide = 0
let isAnimate = false
let autoID = setAuto()

carousel.onanimationend = function () {
    isAnimate = false
}

carousel.onmouseenter = function () {
    clearInterval(autoID)
}

carousel.onmouseleave = function () {
    autoID = setAuto()
}

carousel.onclick = function (e) {
    const element = e.target.closest("[data-type]")

    if (!element) return

    const elementType = element.dataset.type

    if (elementType === "nextSlide") {
        goTo("next")
        return
    }

    if (elementType === "prevSlide") {
        goTo("prev")
        return
    }
}

function goTo(type) {
    if (isAnimate) return

    slides.forEach(slide => {
        slide.classList.remove("goOutLeft", "goOutRight")
    })

    slides[currentSlide].classList.remove("goInLeft", "goInRight")
    indicator[currentSlide].classList.remove("active")

    if (type === "next") {
        slides[currentSlide].classList.add("goOutLeft")
        if (currentSlide === slides.length - 1) currentSlide = -1
        currentSlide++
        slides[currentSlide].classList.add("goInLeft")
    }
    else if (type === "prev") {
        slides[currentSlide].classList.add("goOutRight")
        if (currentSlide === 0) currentSlide = slides.length
        currentSlide--
        slides[currentSlide].classList.add("goInRight")
    }

    indicator[currentSlide].classList.add("active")
    isAnimate = true
}

function setAuto() {
    return setInterval(() => {
        goTo("next")
    }, 3000);
}

