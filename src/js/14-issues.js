;(function () {
  'use strict'

  const lists = document.querySelectorAll('.doc .ulist.issue')
  console.log(lists)
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
    })
  }
})()
