import pets from '../js/pets.js';

window.addEventListener('resize', function () {
  console.log(window.screen.width);
});

//burget menu fo mobile
document.getElementById('burger').addEventListener('click', function () {
  let hamburger = document.querySelector('#burger');
  hamburger.classList.toggle('active');

  let topMenuNav = document.querySelector('#top-menu-nav');
  topMenuNav.classList.toggle('open');

  let innerBg = document.querySelector('#shadow-page');
  innerBg.classList.toggle('close');

  let topLogo = document.querySelector('#top-menu-logo');
  topLogo.classList.toggle('top-logo');
});

let burgerMenu = document.getElementById('header-lists');
let burgerMenuItems = burgerMenu.querySelectorAll('li');
burgerMenuItems.forEach((item) =>
  item.addEventListener('click', function () {
    let hamburger = document.querySelector('#burger');
    hamburger.classList.remove('active');
    let innerBg = document.querySelector('#shadow-page');
    innerBg.classList.toggle('close');
    let topMenuNav = document.querySelector('#top-menu-nav');
    topMenuNav.classList.remove('open');
    let topLogo = document.querySelector('#top-menu-logo');
    topLogo.classList.remove('top-logo');
  })
);

document.querySelector('.shadow-page').addEventListener('click', function () {
  let hamburger = document.querySelector('#burger');
  hamburger.classList.remove('active');
  let innerBg = document.querySelector('#shadow-page');
  innerBg.classList.toggle('close');
  let topMenuNav = document.querySelector('#top-menu-nav');
  topMenuNav.classList.remove('open');
  let topLogo = document.querySelector('#top-menu-logo');
  topLogo.classList.remove('top-logo');
});

console.log(pets[1].name);
