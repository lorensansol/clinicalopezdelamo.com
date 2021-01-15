// ACORDION
const acordionButtons = document.querySelectorAll('.acordion .card-header [data-toggle="collapse"]')
acordionButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    const collapseTarget = document.querySelector(e.target.dataset.target)
    const collapseShow = document.querySelector('.acordion .collapse.show')
    if (collapseTarget.classList.contains('show')) {
      collapseTarget.classList.remove('show')
    } else {
      collapseShow && collapseShow.classList.remove('show')
      collapseTarget.classList.add('show')
    }
  })
})
