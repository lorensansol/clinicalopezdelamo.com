// SHOW WITH SCROLL TO UP
// Require scroll-shot.js
scrollShot(
  '-5%',
  '-5%',
  '[data-showup]',
  nodo => nodo.classList.remove('showup'),
  nodo => nodo.classList.add('showup')
)
