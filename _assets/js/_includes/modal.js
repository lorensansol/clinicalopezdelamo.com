// MODAL
const elementClickToModalOpen = document.querySelectorAll('[data-toggle="modal"][data-target],[data-toggle="modal"][href^="#"]')
const elementClickToModalClose = document.querySelectorAll('[data-dismiss="modal"], .modal')

// Open modal
elementClickToModalOpen.forEach(e => {
  e.addEventListener('click', () => {
    const modal = document.querySelector(e.dataset.target) || document.querySelector(e.hash)
    modal.classList.add('show')
    document.body.classList.add('overflow-hidden')
    // Add hash
    window.location.hash = modal.id
  })
})
// Open modal wen load if URL there is hash
if (window.location.hash) {
  const idLikeHash = document.querySelector(window.location.hash + '.modal')
  if (idLikeHash) {
    idLikeHash.classList.add('show')
    document.body.classList.add('overflow-hidden')
  }
}

// Close modal
function closeModal () {
  const modalShow = document.querySelector('.modal.show')
  modalShow && modalShow.classList.remove('show')
  document.body.classList.remove('overflow-hidden')
  // Remove hash
  if (window.location.hash) {
    history.pushState('', document.title, window.location.pathname + window.location.search)
  }
}
elementClickToModalClose.forEach(e => {
  e.addEventListener('click', click => {
    if (click.target.classList.contains('modal') || click.target.dataset.dismiss === 'modal') {
      closeModal()
    }
  })
})
// When keyup escape
document.addEventListener('keyup', e => e.keyCode == 27 && closeModal())
