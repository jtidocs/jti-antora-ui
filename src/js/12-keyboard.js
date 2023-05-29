;(function () {
  'use strict'

  document.addEventListener('keydown', (e) => {
    // Don't interfere with certain UI elements
    if (e.target.nodeName === 'TEXTAREA' ||
      e.target.nodeName === 'SELECT'
    ) {
      return
    }

    const search = document.querySelector('#search input')

    // Determine current focus, and ignore specific elements
    var active = document.activeElement
    var focused = active
    if (!focused || focused === document.body) {
      focused = null
    } else {
      focused = document.querySelector(':focus')
      if (active === search) {
        focused = null
      }
    }
    if (focused) return

    var plain = !(e.altKey || e.ctrlKey || e.metaKey)
    var keyCode = e.code
    var link

    switch (keyCode) {
      case 'KeyT':
        if (active === search) return

        window.scrollTo(0, 0)
        e.preventDefault()
        break

      case 'KeyB':
        if (active === search) return

        window.scrollTo(0, document.body.scrollHeight)
        e.preventDefault()
        break

      case 'ArrowLeft':
        if (plain) {
          link = document.querySelector('link[rel="prev"]')
        }
        break

      case 'ArrowRight':
        if (plain) {
          link = document.querySelector('link[rel="next"]')
        }
        break

      case 'Slash':
        if (plain) {
          search.focus()
          e.preventDefault()
        }
        break

      case 'Escape':
        if (active === search && search.value === '') {
          search.blur()
        }
        break
    }

    if (link) {
      window.location = link.getAttribute('href')
    }
  }, false)
})()
