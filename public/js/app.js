
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

messageOne.textContent='Wait, loading!'
    const location = search.value

fetch('/weather?search='+location).then((response)=>{
        response.json().then((data)=>{
            messageOne.textContent=data.location.location
            messageTwo.textContent=data.forecast  
           
            
        })
    
    }) 


})