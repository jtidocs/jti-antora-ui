;(function () {
  'use strict'

  // Add title attributes to li items for release note issues to
  // identify the issue type.
  const lists = document.querySelectorAll('.doc .ulist.issue')
  if (lists) {
    lists.forEach((list) => {
      if (list.classList.contains('new')) {
        const li = list.querySelector('li')
        if (li) {
          li.setAttribute('title', 'New Feature')
        }
      }

      if (list.classList.contains('task')) {
        const li = list.querySelector('li')
        if (li) {
          li.setAttribute('title', 'Task')
        }
      }

      if (list.classList.contains('bug')) {
        const li = list.querySelector('li')
        if (li) {
          li.setAttribute('title', 'Bug')
        }
      }

      if (list.classList.contains('cosmetic')) {
        const li = list.querySelector('li')
        if (li) {
          li.setAttribute('title', 'Cosmetic')
        }
      }

      if (list.classList.contains('techdebt')) {
        const li = list.querySelector('li')
        if (li) {
          li.setAttribute('title', 'Technical Debt')
        }
      }
    })
  }
})()
