const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/0ec8eaee9877738ee3e7b2fde131d0c8/'+latitude+','+longitude+'?units=si'

    //destructuring response object to get only body 
    //using object shorthand property for url
    
    request({url, json: true},(error,{body}) =>{                
        if(error){
            callback("Unable to connect to location service",undefined);
        }else if(body.error){
            callback("Unable to find location",undefined);
        }else{
            // callback(undefined,{
            //     Todays_forecast: body.daily.data[0].summary,
            //     Current_temperature: body.currently.temperature,
            //     Rain_probability: body.currently.precipProbability
            // })

            callback(undefined,body.daily.data[0].summary + ' It is currently ' + 
            body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports=forecast