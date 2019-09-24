const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

//Define paths for Express config
const publicDirect=path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine','hbs')                //using hbs for dynamic page
app.set('views',viewsPath)                  //set default views which express looks for to another folder with path viewsPath
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirect))       //setting directory

app.get('',(req,res)=>{                 
    res.render('index',{
        title: 'Weather app',
        name: "Jitin Lamba"                   //we can access these object property in .hbs using{{}}
    })
})

app.get('/about',(req,res)=>{                 
    res.render('about',{
        title: 'About',
        name: "Jitin Lamba"                   
    })
})

app.get('/help',(req,res)=>{                 
    res.render('help',{
        title: 'Support',
        name: "Jitin Lamba",
        content: 'Contact us on xyz@mail.com'                   
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide the address'
        })
    }
    
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{        //undefined objects can't be destructured ,hence we assigned default ={}
    //it is not a convention, but a good practise to take error and data both as parameters in callback fn
    //destructuring data object
    
        if(error){
            return res.send({
                error                   //using shorthand object property
            })
                
        }
                
        forecast(latitude,longitude, (error, forecastdata) => {        
            if(error){
                return res.send({
                    error               //using shorthand object property
                })
            }
            
            res.send({
                location,
                forecast: forecastdata
            })
        })   

    })

    
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
        
    }
    res.send({
        products: []
    })
})


//Wildcard routes for pages not created
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: "Jitin Lamba",
        message: 'Help article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: "Jitin Lamba",
        message: 'Page not found'
    })
})

app.listen(3000, ()=>{
    console.log("Server Started on port 3000");
    
}) 