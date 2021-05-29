function burgerChange(x) {
  x.classList.toggle('change')
  console.log('click')
}
const burgerBox = document.querySelector('input[type="checkbox"]')
const burger = document.querySelector('.burger')
burgerBox.addEventListener('click', (e) => {
  burgerChange(burger)
})

const element = document.querySelector('.question')
element.addEventListener('click', (e) => {
  if (e.target.nodeName !== 'H3') return
  e.target.nextElementSibling.classList.toggle('show')
})
