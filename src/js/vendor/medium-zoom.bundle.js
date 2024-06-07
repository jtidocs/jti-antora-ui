;(function () {
  var Mzm = (window.mzm = require('medium-zoom/dist/medium-zoom.min'))
  Mzm(
    // 'span.frame img, span.zoom img, div.imageblock img',
    'div.imageblock:not(.nozoom) img, span:not(.nozoom) img',
    {
      background: 'var(--color-white)',
    }
  )
})()
