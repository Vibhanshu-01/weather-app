// console.log('js file running')



// const weatherform = document.querySelector('form')
// const searchsubmit = document.querySelector('input')

// weatherform.addEventListener('submit', (e)=>{
//     e.preventDefault()
    
//     const location = searchsubmit.value
//     fetch('http://localhost:3000/weather?address='+location).then((response)=>{
//     response.json().then((data)=>
//     {
//         if(data.error)
//         {
//             console.log(data.error)
//         }
//         else
//         {
//             console.log(data)
//         }
//     })
// })
//     console.log(location)
// })


console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    console.log(location)
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageTwo.textContent = data.error
                console.log(data.error)
            } else {
                messageOne.textContent = data.location 
                messageTwo.textContent = data.forecast
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})