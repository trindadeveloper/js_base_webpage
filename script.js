let startY;
const slides = document.querySelectorAll(".slider .slide");
let currentSlide = 0;
const indicators = document.querySelector("#indicator");
let locked = false;
let timerI = 900;
let zind = "0";
let inid;

slides.forEach((_, idx) => {
  const circle = document.createElement("div");
  circle.classList.add("circle");

  if (idx === currentSlide) circle.classList.add("active");
  circle.addEventListener("click", () => {
    const transformOrigin = currentSlide > idx ? "bottom" : "top";
    const delta = idx - currentSlide;
    switchSlide(delta, transformOrigin);
  });
  indicators.appendChild(circle);
});

// Modify the switchSlide function
function switchSlide(delta, transformOrigin) {
  currentSlide += delta;

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  } else if (currentSlide >= slides.length){
    currentSlide = 0;
  }

  // Acerta indicators
  const circles = document.querySelectorAll(".indicator .circle");
  circles.forEach((circle) => {
    circle.classList.remove("active");
  });

  indicators.children[currentSlide].classList.add("active");

  showSlide(currentSlide, transformOrigin);
  
  start = false;
  digita();
}

function showSlide(slideIndex, transformOrigin) {
  slides.forEach((slide, index) => {
    const slideWrapper = slide.querySelector(".slide-wrapper");
    
    if (index === slideIndex) {
      setSlideTransform(slideWrapper, slide, 1, 0, transformOrigin, true);
    } else {
      setSlideTransform(slideWrapper, slide, 1.1, 0.5, transformOrigin, false);
    }
  });
}

function handleMouseWheel(event) {
  if (!locked)
    change(event)
}

function handleTouchMove(event) {
  if (!locked){
    change(event)
    window.removeEventListener("touchmove", handleTouchMove);
  }
}

function change(event){
  if (!locked) {
    locked = true;
    inid = new Date()
    const indicador = document.querySelector(".active");
    
    const delta = Math.sign(event.deltaY);
    const transformOrigin = delta > 0 ? "bottom" : "top";
    
    if (delta > 0) {
      switchSlide(1, transformOrigin);
    } else {
      switchSlide(-1, transformOrigin);
    }

    setTimeout(() => {
      const date = new Date()
      let d = date-inid;
      const indicador = document.querySelector(".active");
      locked = false;
    }, timerI);
  }
}

function handleTouchStart(event) {
  startY = event.touches[0].clientY;
  window.addEventListener("touchmove", handleTouchMove);
}

function setSlideTransform(slideWrapper, slide, scale, translateY, transformOrigin, isCurrentSlide) {
  slideWrapper.style.transition = "transform 0.8s ease, clip-path 1.2s";
  
  if (isCurrentSlide) {
    slideWrapper.classList.add("activeSlide");
    slideWrapper.style.clipPath = "inset(0% 0% 0% 0%)";
    slide.style.zIndex = "1";
    slideWrapper.addEventListener("transitionend", () => {
      setTimeout(function() {
        slides.forEach((slide, index) => {
          slide.style.zIndex = "1";
        });

        const activeSlide = document.querySelector(".activeSlide");
        const parentElement = activeSlide.parentElement;
        parentElement.style.zIndex = "2";
      }, 900);
    });
  } else {
    slideWrapper.classList.remove("activeSlide");
    if (transformOrigin === "top") {
      slideWrapper.style.clipPath = "inset(0% 0% 100% 0%)";
    } else {
      slideWrapper.style.clipPath = "inset(100% 0% 0% 0%)";
    }
    slide.style.zIndex = zind;
    zind = "2";
  }
  slideWrapper.style.transform = `scale(${scale}) translateY(${translateY}%)`;
  slideWrapper.style.transformOrigin = transformOrigin;
}

showSlide(currentSlide, "top");
slides[currentSlide].style.zIndex =3; //Coloca o primeiro no top quando inicia

document.addEventListener('DOMContentLoaded', function () {
    var menuToggle = document.querySelector('.menu-toggle');
    var menuItems = document.querySelectorAll('.menu li');

    menuToggle.addEventListener('click', function () {
        for (var i = 0; i < menuItems.length; i++) {
            menuItems[i].classList.toggle('active');
        }
    });

    if ("ontouchstart" in window) {
      window.addEventListener("touchstart", handleTouchStart);
    } else {
      window.addEventListener("wheel", handleMouseWheel);
    }
});

function type(typingEffect, text, index, campo) {
  if (!start)
    return;

  if (index < text.length && typingEffect != undefined) {
    typingEffect.innerHTML += text.charAt(index);
    index++;
    
    setTimeout(function() {
      if (!start)
        return;
      type(typingEffect, text, index, campo);
    }, 115);
  }
  else{
    campo+=1;
    
    let nome = 'dig' + campo
    let text;
    if (nome == 'dig1')
      text = 'nteligente';
    else if (nome == 'dig2')
      text = 'novador';
    else if (nome == 'dig3')
      text = 'ntuitivo';
    else if (nome == 'dig4')
      text = 'ndispensável';

    let typingEffect = document.getElementById(nome);
    if (typingEffect == undefined)
      return;

    var img = document.createElement("img");
    img.src = 'imagens/ai.png';
    typingEffect.appendChild(img)

    type(typingEffect, text, 0, campo);
  }
}

let start = false;
async function digita(){
  await new Promise(r => setTimeout(r, 150));

  let dig = document.getElementById('dig1');
  dig.innerHTML = '';
  dig = document.getElementById('dig2');
  dig.innerHTML = '';
  dig = document.getElementById('dig3');
  dig.innerHTML = '';
  dig = document.getElementById('dig4');
  dig.innerHTML = '';
  
  start = true;
  type(undefined, '', 0, 0);
}
digita();

function isValidEmail(email) {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

function submitEmail() {
  const emailInput = document.getElementById("email");
  const emailForm = document.getElementById("email-form");
  const emailValue = emailInput.value;

  //if (isValidEmail(emailValue)){
    let url = 'https://web.concilia.ai/recebeemail.aspx?'+emailValue;
    location.href = url;
  //}
}