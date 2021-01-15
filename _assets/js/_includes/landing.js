// Variables
const navbar = document.querySelector('.navbar')
const burger = document.querySelector('.navbar-toggler')
const burgerTarget = burger && document.querySelector(burger.dataset.target)
const navLink = document.querySelectorAll('.nav-link')

// Navbar burguer click
burger && burger.addEventListener('click', () => {
  burgerTarget.classList.toggle('collapse')
  burger.classList.toggle('active')
  navbar.classList.toggle('navbar-transparent')
})

// Navbar links click (close menu)
navbar && navbar.addEventListener('click', e => {
  if (e.target.classList.contains('nav-link') && window.innerWidth < 992) {
    burgerTarget.classList.add('collapse')
    burger.classList.remove('active')
    navbar.classList.add('navbar-transparent')
  }
})

// Shot Top Scroll
navbar && setTimeout(() => {
  if (window.innerWidth >= 1200) {
    scrollShot(
      '20%',
      '-120%',
      'body',
      () => navbar.classList.remove('top'),
      () => undefined,
      () => navbar.classList.add('top')
    )
  } else {
    navbar.classList.add('navbar-transparent')
  }
}, 100)

// Navbar Scroll Spy
scrollShot(
  '-50%',
  '-50%',
  'section[id],header[id]',
  e => {
    navLink.forEach(item => item.classList.remove('active'))
    const navLinkId = document.querySelector('.nav-link[href="#' + e.id + '"]')
    // const navLinkButtonId = document.querySelector('.navbar-item.is-tab > [href="#'+e.id+'"]')
    navLinkId && navLinkId.classList.add('active')
    // navLinkButtonId && navLinkButtonId.parentNode.classList.add('active')
  },
  () => undefined,
  () => undefined
)
