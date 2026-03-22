const segDur = 0.4;
const fadeInDur = 1.5;
const spiralDelay = 0.2;
const paths = document.querySelectorAll('svg path');
const images = document.querySelectorAll('svg image');
const generateImg = document.querySelector('#generate-img');
const uploadImg = document.querySelector('#upload-img');
let selectedDot = null;
let current = -1;
const dotTexts = [
  "generated on 2024-01-03 08:12:04 by username345",
  "generated on 2024-01-11 14:33:21 by username345",
  "generated on 2024-01-28 09:55:47 by username345",
  "generated on 2024-02-06 11:20:13 by username345",
  "generated on 2024-02-19 16:44:38 by username345",
  "generated on 2024-03-02 07:08:55 by username345",
  "generated on 2024-03-15 13:27:30 by username345",
  "generated on 2024-03-29 10:51:09 by username345",
  "generated on 2024-04-08 15:36:44 by username345",
  "generated on 2024-04-22 08:03:17 by username345",
  "generated on 2024-05-01 12:19:52 by username345",
  "generated on 2024-05-14 17:42:06 by username345",
  "generated on 2024-05-27 09:14:33 by username345",
  "generated on 2024-06-09 11:58:21 by username345",
  "generated on 2024-06-23 14:07:48 by username345",
  "generated on 2024-07-04 08:30:15 by username345",
  "generated on 2024-07-18 16:22:59 by username345",
  "generated on 2024-08-01 10:45:34 by username345",
  "generated on 2024-08-13 13:11:07 by username345",
  "generated on 2024-08-26 07:54:42 by username345",
  "generated on 2024-09-07 15:28:19 by username345",
  "generated on 2024-09-20 09:03:56 by username345",
  "generated on 2024-10-04 12:37:31 by username345",
  "generated on 2024-10-17 16:52:08 by username345",
  "generated on 2024-10-31 08:16:45 by username345",
  "generated on 2024-11-12 11:41:22 by username345",
  "generated on 2024-11-25 14:05:59 by username345",
  "generated on 2024-12-08 09:29:36 by username345",
  "generated on 2024-12-19 13:54:13 by username345",
  "generated on 2025-01-06 07:18:50 by username345",
  "generated on 2025-01-21 15:43:27 by username345",
];

paths.forEach(p => {
  p.style.strokeDasharray = 144.7;
  p.style.strokeDashoffset = 144.7;
  p.style.animation = 'none';
  p.style.opacity = 0;
});
images.forEach(img => {
  img.style.opacity = 0;
  img.style.animation = 'none';
});

generateImg.style.opacity = 0;
uploadImg.style.opacity = 0;

function fadeIn(el) {
  el.style.transition = 'none';
  el.style.opacity = 0;
  setTimeout(() => {
    el.style.transition = `opacity ${fadeInDur}s ease`;
    el.style.opacity = 1;
  }, 50);
}

function fadeOut(el) {
  el.style.transition = `opacity ${fadeInDur}s ease`;
  el.style.opacity = 0;
}

document.querySelector('#upload-btn').addEventListener('click', () => {
  if (current >= images.length - 1) return;
  current++;

  fadeOut(generateImg);

  uploadImg.style.transition = 'none';
  uploadImg.style.opacity = 0;
  uploadImg.src = `./assets/${current}File/0.png`;

  setTimeout(() => {
    fadeIn(uploadImg);
  }, 50);
});

document.querySelector('#next-btn').addEventListener('click', () => {
  if (current < 0) return;


  if (current === 0) {
    generateImg.style.transition = 'none';
    generateImg.style.opacity = 0;
    generateImg.src = `./assets/${current}File/1.png`;

    setTimeout(() => {
      fadeIn(generateImg);
      images[0].style.opacity = 1;
    }, spiralDelay * 1000);

  } else {
    setTimeout(() => {
      // fade in generate and draw spiral at the same time
      generateImg.style.transition = 'none';
      generateImg.style.opacity = 0;
      generateImg.src = `./assets/${current}File/1.png`;
      setTimeout(() => fadeIn(generateImg), 50);

      const path = paths[current - 1];
      path.style.opacity = 1;
      path.style.strokeDashoffset = 144.7;
      path.style.animation = `drawPath ${segDur}s linear forwards`;

      setTimeout(() => {
        images[current].style.opacity = 1;
      }, segDur * 1000);
    }, spiralDelay * 1000);
  }
});
images.forEach((img, i) => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => {
    if (img.style.opacity == 0) return;
        // reset previously selected dot
    if (selectedDot) {
      selectedDot.style.transform = 'scale(1)';
    }

    // keep this dot large
    img.style.transform = 'scale(1.5)';
    selectedDot = img;


    document.querySelector('#lightbox-image-upload').src = `./assets/${i}File/0.png`;
    document.querySelector('#lightbox-image-generate').src = `./assets/${i}File/1.png`;
    document.querySelector('#lightbox p').textContent = dotTexts[i] ?? '';
    document.querySelector('#lightbox').style.display = 'block';
  });
});

document.querySelector('.close').addEventListener('click', () => {
  document.querySelector('#lightbox').style.display = 'none';
  if (selectedDot) {
    selectedDot.style.transform = 'scale(1)';
    selectedDot = null;
  }
});

document.querySelector('#lightbox').addEventListener('click', (e) => {
  if (e.target === document.querySelector('#lightbox')) {
    document.querySelector('#lightbox').style.display = 'none';
     if (selectedDot) {
      selectedDot.style.transform = 'scale(1)';
      selectedDot = null;
    }
  }
});