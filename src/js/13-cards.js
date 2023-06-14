;(function () {
  'use strict'

  const cardsBlocks = document.querySelectorAll('.cards')
  if (!cardsBlocks) return

  // Finds an ancestor node with matching class, or returns null
  const findAncestor = (el, cls) => {
    if (el.classList.contains(cls)) return el
    while ((el = el.parentElement) && !el.classList.contains(cls)) {
    }
    return el
  }

  cardsBlocks.forEach((cards) => {
    cards.querySelectorAll('.card').forEach((card) => {
      if (card.querySelector('.icon')) {
        card.classList.add('hasIcon')
      }

      card.addEventListener('click', (e) => {
        e.preventDefault()
        const parent = findAncestor(e.target, 'card')
        if (!parent) return

        const link = parent.querySelector('.link a')
        if (!link) return

        window.location = link.getAttribute('href')
      })
    })
  })
})()
