console.log('Client side javascript');


const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const msgone=document.querySelector('#error-msg')
const msgfore=document.querySelector('#forecast-msg')

weatherform.addEventListener('submit',(e)=>{        //e stands for event
    e.preventDefault()             //prevent default behvaiour of form submission i.e, refresh page 
    
    const location=search.value

    msgone.textContent='Loading......'
    msgfore.textContent=''      //to clear value of previous fetched data
    
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
        if(data.error){
            msgone.textContent= data.error
            
        }
        else{
            msgone.textContent=data.location
            msgfore.textContent= data.forecast
            
        }
        
    })
})
    
})