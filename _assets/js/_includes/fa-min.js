const icons = {% include_relative _includes/fa-used.json %};
const faElements = document.querySelectorAll('i[class*="fa-"]')
icons && faElements && faElements.forEach(i => {
  // get icon name
  const faIconName = i.classList.value.match(/fa-(\w|-){3,}/g).toString().replace('fa-', '')
  // if exist in the json/svg list
  if(icons[faIconName]) {
    // change main fa class name
    i.classList.add('svg-inline--fa')
    // save all classes + add fa width class
    const faIconClasses = `${i.classList.value} fa-w-${icons[faIconName][0]/icons[faIconName][1]*16}`
    // create svg
    const svgIcon = `
      <svg
        class="${faIconClasses}"
        xmlns="http://www.w3.org/2000/svg"
        viewbox="0 0 ${icons[faIconName][0]} ${icons[faIconName][1]}"
      >
        <path fill="currentColor" d="${icons[faIconName][4]}"></path>
      </svg>`
    // add svg near i.fa element
    i.insertAdjacentHTML('afterend', svgIcon)
    // remove i.fa element
    i.remove()
  }
})