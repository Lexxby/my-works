import i18Obj from './styles/translate.js';

function getLocalStorageLang() {
  if (localStorage.getItem('lang')) {
    const lang = localStorage.getItem('lang');
    getTranslate(lang);
  }
}
window.addEventListener('load', getLocalStorageLang);

function getLocalStorageTheme() {
  if (localStorage.getItem('theme')) {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
      getChangeTheme(theme);
    }
  }
}
window.addEventListener('load', getLocalStorageTheme);

//burget menu fo mobile
document.getElementById('burger').addEventListener('click', function () {
  let hamburger = document.querySelector('#hamburger');
  hamburger.classList.toggle('active');

  let topMenuNav = document.querySelector('#top-menu-nav');
  topMenuNav.classList.toggle('open');
});

document.getElementById('header-lists').addEventListener('click', function () {
  let hamburger = document.querySelector('#hamburger');
  hamburger.classList.remove('active');

  let topMenuNav = document.querySelector('#top-menu-nav');
  topMenuNav.classList.remove('open');
});

//chance images in portfolio if push the button
const portfolioBtns = document.querySelector('.portfolio-buttons');
const portfolioImages = document.querySelectorAll('.portfolio-img');
portfolioBtns.addEventListener('click', (event) => {
  if (event.target.classList.contains('black-button')) {
    const { target } = event;
    const season = target.dataset.season;
    portfolioImages.forEach((img, index) => {
      const newImg = new Image();
      newImg.src = `./assets/img/${season}/${index + 1}.jpg`;
      img.src = newImg.src;
    });
  }
});

//change languages
const languages = document.querySelector('.switch-language');
const wordsToTranslate = document.querySelectorAll('[data-i18]');

function setLocalStorageLang(language) {
  localStorage.setItem('lang', language);
}

function getTranslate(lang) {
  if (lang === 'ru') {
    document.querySelector('.header-swith-language-ru').style.color = '#bdae82';
    document.querySelector('.header-swith-language-en').style.color = '#fff';
    document.getElementById('header-lists').style.width = '530px'; //  не влезло русское меню
  }
  if (lang === 'en') {
    document.querySelector('.header-swith-language-ru').style.color = '#fff';
    document.querySelector('.header-swith-language-en').style.color = '#bdae82';
  }
  wordsToTranslate.forEach((data) => {
    const getData = data.dataset.i18;
    data.innerHTML = i18Obj[lang][getData];
  });
}

languages.addEventListener('click', (event) => {
  const { target } = event;
  const language = target.textContent;
  getTranslate(language);
  window.addEventListener('beforeunload', setLocalStorageLang(language));
});

//change theme
const controls = document.querySelector('.controls');
function getChangeTheme(theme) {
  let sections = document.querySelectorAll('section');
  document.body.classList.toggle('body__light');
  if (theme === 'light') {
    document.querySelector('.switch-theme').classList.add('moon');
    document.querySelector('.switch-theme').classList.toggle('sun');
  } else {
    document.querySelector('.switch-theme').classList.add('sun');
    document.querySelector('.switch-theme').classList.toggle('moon');
  }
  sections.forEach((e, index) => {
    if (index >= 1 && index <= 4) {
      return e.classList.toggle('light');
    }
  });
  controls.classList.toggle('light');
}

document.querySelector('.switch-theme').addEventListener('click', function () {
  getChangeTheme();
  function setLocalStorageTheme() {
    if (document.body.classList.contains('body__light')) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  }
  window.addEventListener('beforeunload', setLocalStorageTheme);
});

//custom-video task
let isPlay = false;
const video = document.querySelector('video');
const play = document.querySelector('.play');
const volume = document.querySelector('.volume');
const mute = document.querySelector('.volume-icon');
const videoTime = document.querySelector('.video-time');
const currentTime = document.querySelector('.current-time');
const durationTime = document.querySelector('.duration-time');
const bigButtonPlay = document.querySelector('.play-video');

document.querySelector('.play-video').addEventListener('click', function () {
  bigButtonPlay.classList.toggle('display-none');
  document.querySelector('.video-content').style.zIndex = '-1';
  video.play();
  isPlay = true;
  play.classList.toggle('pause');
});

let currentVolume = 0;
controls.addEventListener('click', (event) => {
  const { target } = event;
  if (target.classList.contains('volume-icon')) {
    currentVolume += video.volume;
    video.volume ? (video.volume = false) : (video.volume = currentVolume);
    mute.classList.toggle('volumeOff');
    if (mute.classList.contains('volumeOff') === false) {
      video.volume = currentVolume;
      currentVolume = 0;
    }
  }
  if (target.classList.contains('move-back-video')) {
    video.currentTime -= 5;
  }
  if (target.classList.contains('move-forvard-video')) {
    video.currentTime += 5;
  }
  if (target.classList.contains('play')) {
    if (target.classList.contains('pause')) {
      bigButtonPlay.classList.remove('display-none');
      video.pause();
      play.classList.remove('pause');
    } else {
      bigButtonPlay.classList.add('display-none');
      play.classList.add('pause');
      video.play();
    }
  }
});

// document.querySelector('.pause').addEventListener('click', (e) => {
//   console.log(e.target);
//   // bigButtonPlay.classList.remove('display-none');
//   // video.pause();
//   // play.classList.remove('pause');
//   // console.log(target.classList.contains('pause'));
// });

video.volume = 0.5;

volume.addEventListener('change', (event) => {
  const { target } = event;
  target.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${target.value}%, rgb(200, 200, 200) ${target.value}%, rgb(200, 200, 200) 100%)`;
  video.volume = target.value / 100;
  if (video.volume === 0) {
    mute.classList.add('volumeOff');
  } else {
    mute.classList.remove('volumeOff');
  }
});

video.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    play.classList.add('pause');
    bigButtonPlay.classList.toggle('display-none');
  } else {
    video.pause();
    play.classList.remove('pause');
    bigButtonPlay.classList.toggle('display-none');
  }
});

video.onloadedmetadata = function () {
  videoTime.max = ~~video.duration;
};

setInterval(function () {
  videoTime.value = ~~video.currentTime;
  let percentToStyle = (100 / video.duration) * videoTime.value;
  videoTime.style.background = `linear-gradient(to right, rgb(189, 174, 130) 0%, rgb(189, 174, 130) ${percentToStyle}%, rgb(200, 200, 200) ${percentToStyle}%, rgb(200, 200, 200) 100%)`;
  currentTime.textContent =
    '00:' + (Math.round(video.currentTime) < 10 ? '0' + Math.round(video.currentTime) : Math.round(video.currentTime));
  durationTime.textContent = '00:' + Math.round(video.duration);
}, 1000);

videoTime.addEventListener('click', (event) => {
  const { target } = event;
  video.currentTime = target.value;
  video.play();
});
