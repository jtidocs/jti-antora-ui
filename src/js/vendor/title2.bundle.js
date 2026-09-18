/* This file make page adjustments to conform to ADA Title 2 and WCAG 2.1 AA requirements. */

document.addEventListener('DOMContentLoaded', () => {
  const imageObjects = document.querySelectorAll('.doc .imageblock object')
  var title, table
  for (const b of imageObjects) {
    var altnode = b.querySelector('.alt')
    title = 'An image'
    if (altnode) {
      title = altnode.innerHTML.toString()
    }
    b.setAttribute('title', title)
    console.log(`Set title attribute for ${b} to '${title}`)
  }

  const videoBlocks = document.querySelectorAll('.doc .videoblock')
  for (const b of videoBlocks) {
    var iframe = b.querySelector('iframe')
    if (iframe) {
      var blocktitle = b.querySelector('.title')
      title = 'A video'
      if (blocktitle) {
        title = blocktitle.innerHTML.toString()
      }
      iframe.setAttribute('title', title)
    }
  }

  const listBlocks = document.querySelectorAll('.doc .colist, .doc .hdlist')
  for (const b of listBlocks) {
    table = b.querySelector('table')
    if (table) {
      table.setAttribute('role', 'presentation')
    }
  }

  const admonBlocks = document.querySelectorAll('.doc .admonitionblock')
  for (const b of admonBlocks) {
    table = b.querySelector('table')
    if (table) {
      table.setAttribute('role', 'presentation')
    }
  }
})
