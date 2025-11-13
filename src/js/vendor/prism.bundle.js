;(function () {
  const hlLines = document.querySelectorAll('.doc div[class*=" lines-"].listingblock')
  for (const d of hlLines) {
    const classes = d.classList
    for (const c of classes) {
      const mg = c.match(/lines-(.+)/)
      if (mg) {
        const lines = mg[1].replace('_', ',')
        const p = d.querySelector('pre.highlight')
        if (p) {
          p.setAttribute('data-line', lines)
        }
      }
    }
  }
  const codeBlocks = document.querySelectorAll('.doc .listingblock code')
  for (const b of codeBlocks) {
    b.setAttribute('tabindex', '0')
  }

  const Prism = require('prismjs')
  window.Prism = Prism
  require('prismjs/components/prism-clike')
  require('prismjs/components/prism-markup')
  require('prismjs/components/prism-css')
  require('prismjs/components/prism-javascript')
  require('prismjs/components/prism-bash')
  require('prismjs/components/prism-go')
  require('prismjs/components/prism-groovy')
  require('prismjs/components/prism-http')
  require('prismjs/components/prism-ini')
  require('prismjs/components/prism-java')
  require('prismjs/components/prism-json')
  require('prismjs/components/prism-kotlin')
  require('prismjs/components/prism-makefile')
  require('prismjs/components/prism-markdown')
  require('prismjs/components/prism-powershell')
  require('prismjs/components/prism-properties')
  require('prismjs/components/prism-python')
  require('prismjs/components/prism-ruby')
  require('prismjs/components/prism-rust')
  require('prismjs/components/prism-scala')
  require('prismjs/components/prism-sql')
  require('prismjs/components/prism-swift')
  require('prismjs/components/prism-velocity')
  require('prismjs/components/prism-yaml')
  require('prismjs/plugins/keep-markup/prism-keep-markup.min')
  require('prismjs/plugins/line-numbers/prism-line-numbers.min')
  require('prismjs/plugins/line-highlight/prism-line-highlight.min')
})()
