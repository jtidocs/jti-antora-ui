;(function () {
  'use strict'

  const preferenceName = 'mode-preference'
  const modeClass = 'darkMode'
  const body = document.body
  const toggle = document.querySelector('#mode-toggle')

  const getMode = () => {
    var isDark = window.localStorage.getItem(preferenceName)
    if (!isDark ||
      (isDark !== 'light' && isDark !== 'dark')
    ) {
      isDark = window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches
        ? 'dark'
        : 'light'
      setMode(isDark)
    }

    return isDark
  }

  function modeSwitch () {
    var isDark = getMode()
    isDark = (isDark === 'light') ? 'dark' : 'light'
    setMode(isDark)
  }

  function setMode (isDark) {
    // toggle.innerText = (isDark === 'dark') ? '🌞' : '🌚'
    if (isDark === 'dark') {
      body.classList.add(modeClass)
    } else {
      body.classList.remove(modeClass)
    }
    window.localStorage.setItem(preferenceName, isDark)
  }

  if (toggle) {
    toggle.addEventListener('click', modeSwitch)
  }

  setMode(getMode())
})()
