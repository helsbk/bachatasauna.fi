'use strict';

(function () {
  const artistsRow = document.querySelector('.artists-row');
  if (artistsRow) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelector('video')?.play();
        } else {
          entry.target.querySelector('video')?.pause();
        }
  
        entry.target.classList.toggle('visible', entry.intersectionRatio === 1.0);
      });
    }, {
      root: artistsRow,
      threshold: [
        0,
        0.01,
        0.99,
        1.0,
      ],
    });

    artistsRow.querySelectorAll('.artists-thumb').forEach(thumb => {
      observer.observe(thumb);

      const video = thumb.querySelector('video');
      video?.addEventListener('mouseup', () => video.play());
      video?.addEventListener('touchend', () => video.play());
    });
  }

  document.querySelectorAll('.navbar-collapse a').forEach(e => e.addEventListener('click', () => toggleMenu()));
})();

function toggleMenu() {
  document.getElementById("navbarNav")?.classList.toggle('show');
  document.getElementById("navbarToggler")?.classList.toggle('open');
}