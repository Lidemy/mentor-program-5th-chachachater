const burgerBox = document.querySelector('.burger-checkbox')
const burger = document.querySelector('.burger')
burgerBox.addEventListener('click', (e) => {
  burgerChange(burger)
})
function burgerChange(x) {
  x.classList.toggle('change')
}
