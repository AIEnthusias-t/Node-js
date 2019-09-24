const request=require('request')
const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibGFtYmFqaXRpbjI0IiwiYSI6ImNrMDVjYmIxZzA1YnIzbXFpOW0zZ2pqb3UifQ.HQZGVoywgBb-SUlvvFOJ6Q&limit=1'
    
    //using object shorthand property for url
    
    request({url, json: true},(error,{body}) =>{            //(error,response) here {body} is the response, object destructuring
        if(error){
            callback("Unable to connect to location services!",undefined)
        }else if(body.features.length===0){
            callback("Unable to find location. Try Another search")
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })   
        }
    })
}

module.exports=geocode