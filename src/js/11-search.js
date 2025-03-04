;(function () {
  'use strict'

  // Initial hookup setup -------------------------------------------

  const search = document.querySelector('#search')
  if (!search) return

  const searchContainer = search.querySelector('.content')
  const searchInput = search.querySelector('input')

  const results = document.querySelector('#results')
  const resultContainer = results.querySelector('.list')
  const resultClass = 'hit'

  const modeToggle = document.querySelector('#mode-toggle')

  // Hookup events for the search UI buttons
  const buttons = search.querySelectorAll('button')
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i]
    if (button.classList.contains('x')) {
      // button.addEventListener('click', (e) => {
      //   e.preventDefault()
      //   clearInput()
      // })
    } else {
      button.addEventListener('click', (e) => {
        e.preventDefault()
        focusInput()
      })
    }
  }

  // Position results container to line up with search
  const repositionResults = () => {
    const rect = searchContainer.getBoundingClientRect()
    const fontSize = parseInt(window.getComputedStyle(searchContainer).fontSize, 10)

    let left = parseInt('' + rect.x, 10)
    let width = parseInt('' + rect.width, 10)

    // maximize the width of the results on narrow screens
    if (width < 375) {
      const center = left + Math.floor(width / 2)
      width = 375
      left = center - Math.floor(width / 2)
    }

    results.style.left = `${left}px`
    results.style.width = `${width}px`
    const y = parseInt('' + rect.top, 10) + (2.5 * fontSize)
    results.style.top = `${y}px`
  }
  window.addEventListener('resize', () => { repositionResults() })

  // Utility functions ----------------------------------------------

  // Finds an ancestor node with matching class, or returns null
  const findAncestor = (el, cls) => {
    if (el.classList.contains(cls)) return el
    while ((el = el.parentElement) && !el.classList.contains(cls)) {
    }
    return el
  }

  // Highlights the first search result, if it exists
  const highlightFirst = () => {
    const first = resultContainer.querySelector(`.${resultClass}`)
    if (first) {
      first.classList.add('pick')
    }
  }

  // Focuses the search input
  const focusInput = () => {
    searchInput.focus()
  }

  // Any click on the search UI should focus the search input
  search.addEventListener('click', (e) => {
    e.preventDefault()
    focusInput()
  })

  const showResults = () => {
    repositionResults()
    results.style.display = 'flex'
  }

  const hideResults = () => {
    results.style.display = 'none'
  }

  const resetResults = () => {
    while (resultContainer.firstChild) {
      resultContainer.removeChild(resultContainer.firstChild)
    }
  }

  // const hasFocus = () => document.activeElement === searchInput

  let inResults = false
  document.addEventListener('mousedown', (e) => {
    inResults = results.contains(e.target)
  })

  const clickResult = (e) => {
    let p = e.target
    if (!p.classList.contains(resultClass)) {
      p = findAncestor(p, resultClass)
    }
    e.preventDefault()
    window.location = p.dataset.url
  }

  // Events ---------------------------------------------------------

  searchInput.addEventListener('focus', () => {
    if (searchInput.value === '') {
      resetResults()
      showResults()
    }
  })

  searchInput.addEventListener('blur', (e) => {
    if (e.relatedTarget) {
      e.preventDefault()
      if (e.relatedTarget.tagName === 'A') {
        e.relatedTarget.click()
      }
      if (
        e.relatedTarget === modeToggle ||
        modeToggle.contains(e.relatedTarget) ||
        inResults
      ) {
        setTimeout(() => { focusInput() }, 0)
        return
      }
    } else {
      if (inResults) {
        setTimeout(() => { focusInput() }, 0)
        return
      }
    }

    if (!e.relatedTarget || document.activeElement !== searchInput) {
      resetResults()
      hideResults()
    }
  })

  // Pagefind -------------------------------------------------------

  window.addEventListener('DOMContentLoaded', () => {
    const article = document.querySelector('article.doc')
    const siteRoot = article.dataset.antora_siteroot ?? '.'
    // const filter = article.dataset['pagefind-filter']
    // console.log(`Filter: ${filter}`)
    const PagefindModularUI = window.PagefindModularUI

    const instance = new PagefindModularUI.Instance()

    instance.add(new PagefindModularUI.Input({
      inputElement: '#search input',
      debounceTimeoutMs: 100,
    }))

    instance.add(new PagefindModularUI.Summary({
      containerElement: '#results .summary',
      defaultMessage: 'No results.',
    }))

    instance.add(new PagefindModularUI.FilterPills({
      containerElement: '#results .filters.component',
      filter: 'component',
      alwaysShow: true,
    }))

    instance.add(new PagefindModularUI.ResultList({
      containerElement: '#results .list',
      placeholderTemplate: () => {
        return '<p>Loading...</p>'
      },
      resultTemplate: (result) => {
        // Compose a relative URL to click to reach the result page
        const url = siteRoot + result.raw_url

        // create the outer wrapper
        const li = document.createElement('div')
        li.classList.add(resultClass)
        li.setAttribute('data-url', url)

        // // create the thumbnail image
        // const thumb = document.createElement('div')
        // thumb.classList.add('thumb')
        // if (result.meta.image) {
        //   const image = document.createElement('img')
        //   image.setAttribute('alt', result.meta.image_alt)
        //   const ru = result.raw_url
        //   image.setAttribute(
        //     'src',
        //     ru.substr(0, ru.lastIndexOf('/')) +
        //     '/' +
        //     result.meta.image
        //   )
        //   thumb.appendChild(image)
        // }

        // create the inner wrapper
        const inner = document.createElement('div')
        inner.classList.add('inner')

        // create title
        const title = document.createElement('p')
        title.classList.add('title')
        title.innerHTML = `<a href="${url}">${result.meta.title}</a>`

        // create excerpt
        const excerpt = document.createElement('p')
        excerpt.classList.add('excerpt')
        excerpt.innerHTML = `<a href="${url}">${result.excerpt}</a>`

        // create the breadcrumbs
        const breadcrumb = document.createElement('p')
        breadcrumb.classList.add('breadcrumb')
        breadcrumb.innerHTML = `<a href="${url}">${result.meta.breadcrumb}</a>`

        // complete the structure
        // li.appendChild(thumb)
        inner.appendChild(title)
        inner.appendChild(excerpt)
        inner.appendChild(breadcrumb)
        li.appendChild(inner)

        li.addEventListener('click', clickResult)
        return li
      },
    }))

    instance.on('results', async (e) => {
      repositionResults()

      if (e.results) {
        setTimeout(() => { highlightFirst() }, 250)
      }

      // console.log(Date.now(), results)
      // for (let i = 0; i < results.results.length; i++) {
      //   const result = results.results[i]
      //   const data = await result.data()
      //   console.log(`Result ${i + 1}:`, data)
      //   const raw_url = data.raw_url
      //   const image = data.meta.image
      //   var new_image = raw_url.substr(0, raw_url.lastIndexOf('/')) + image
      //   console.log(`New image: ${new_image}`)
      //   data.meta.image = new_image
      // }
    })
  })
})()
