'use strict';

(function ($) {
  $('.navbar-collapse a').on('click', () => {
    $('.navbar-collapse').collapse('hide');
  });

  const artistsRow = document.querySelector('.artists-row');
  if (artistsRow) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelector('video')?.play();
        } else {
          entry.target.querySelector('video')?.pause();
        }
  
        if (entry.intersectionRatio === 1.0) {
          $(entry.target).css('opacity', 1.0);
        } else {
          $(entry.target).css('opacity', 0.4);
        }
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
})(window.jQuery);
