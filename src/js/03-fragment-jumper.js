;(function () {
  'use strict'

  var article = document.querySelector('article.doc')
  var toolbar = document.querySelector('.toolbar')

  function decodeFragment (hash) {
    return hash && (~hash.indexOf('%') ? decodeURIComponent(hash) : hash).slice(1)
  }

  function computePosition (el, sum) {
    return article.contains(el) ? computePosition(el.offsetParent, el.offsetTop + sum) : sum
  }

  function jumpToAnchor (e) {
    if (e) {
      if (e.altKey || e.ctrlKey) return
      window.location.hash = '#' + this.id
      e.preventDefault()
    }
    window.scrollTo(0, computePosition(this, 0) - toolbar.getBoundingClientRect().bottom)
  }

  function jumpOnLoad (e) {
    const fragment = decodeFragment(window.location.hash)
    if (fragment && fragment.length) {
      const target = document.getElementById(fragment)
      if (target) {
        jumpToAnchor.bind(target)()
        setTimeout(jumpToAnchor.bind(target), 0)
      } else {
        const command = fragment.slice(0, 1)
        const arg = fragment.slice(1)
        let xpath, query, i, length, el, pct, rect
        switch (command) {
          case '/': // search for term
            xpath = `.//*//text()[contains(., "${arg}")]`
            query = document.evaluate(xpath, article, null, 7, null)
            for (i = 0, length = query.snapshotLength; i < length; i++) {
              // It's a text node, so find its parent and check visibility.
              el = query.snapshotItem(i).parentNode
              if (el.offsetParent) {
                jumpToAnchor.bind(el)()
                setTimeout(jumpToAnchor.bind(el), 0)
                break
              }
            }
            break
          case 'P': // paragraph by number
            xpath = `/descendant::p[${parseInt(arg, 10)}]`
            query = document.evaluate(xpath, article, null, 7, null)
            for (i = 0, length = query.snapshotLength; i < length; i++) {
              // It's a text node, so find its parent and check visibility.
              el = query.snapshotItem(i).parentNode
              if (el.offsetParent) {
                jumpToAnchor.bind(el)()
                setTimeout(jumpToAnchor.bind(el), 0)
                break
              }
            }
            break
          case 'S': // scroll percentage
            pct = parseInt(arg, 10) / 100
            rect = article.getBoundingClientRect()
            setTimeout(function () {
              window.scroll(0, Math.max(0, rect.height * pct))
            }, 0)
            break
          default:
            console.log('Unrecognized fragment:', fragment)
        }
      }
    }
  }

  window.addEventListener('load', function (e) {
    jumpOnLoad(e)
    window.removeEventListener('load', jumpOnLoad)
  }, false)
  window.addEventListener('hashchange', function (e) {
    jumpOnLoad(e)
    window.removeEventListener('hashchange', jumpOnLoad)
  }, false)

  window.fragmentJumper = () => {
    Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]')).forEach(function (el) {
      var fragment, target
      if ((fragment = decodeFragment(el.hash)) && (target = document.getElementById(fragment))) {
        el.addEventListener('click', jumpToAnchor.bind(target))
      }
    })
  }
  window.fragmentJumper()
})()
