// document.querySelector('.wrapper').addEventListener('click', function (e) {
//   console.log(e.target)
//   if (e.target.id === 'submit') {
//     console.log('hit button')
//     console.log(e.currentTarget)

//     const input = document.querySelector('.title input')
//     if(!(input.value)) return

//     const list = document.querySelector('.list')

//     const addDiv= document.createElement('div')
//     const addInput= document.createElement('input')
//     const addP= document.createElement('p')
//     const addButton= document.createElement('button')

//     list.prepend(addDiv)
//     document.querySelector('.list div').classList.add('single')

//     document.querySelector('.list div').append(addInput)
//     document.querySelector('.list div input').setAttribute('type', 'checkbox')

//     document.querySelector('.list div').append(addP)
//     document.querySelector('.list div p').innerText = input.value

//     document.querySelector('.list div').append(addButton)
//     document.querySelector('.list div button').classList.add('delete')
//     document.querySelector('.list div button').innerText = 'delete'
//   }
//   if (e.target.className === 'delete') {
//     e.target.parentElement.remove()
//   }
// })

// // 加上刪除線
//   if (e.target.nodeName === 'INPUT') {
//     if (e.target.checked) {
//       let del = e.target.parentElement.querySelector('p')
//       let delValue = e.target.parentElement.querySelector('p').innerText
//       del.innerHTML = `
//         <del>${delValue}</del>
//       `
//     }
//     else {
//       let del = e.target.parentElement.querySelector('p')
//       let delValue = e.target.parentElement.querySelector('p').innerText
//       del.innerHTML = `
//         <p>${delValue}</p>
//       `
//     }

//   }
