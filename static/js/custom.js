'use strict';

(function ($) {
  $('.navbar-collapse a').on('click', () => {
    $('.navbar-collapse').collapse('hide');
  });

  const artistsRow = document.querySelector('.artists-row');
  if (artistsRow) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio === 0) {
          entry.target.querySelector('video')?.pause();
        } else {
          entry.target.querySelector('video')?.play();
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
  
    document.querySelectorAll('.artists-thumb').forEach(e => observer.observe(e));
  }
})(window.jQuery);
