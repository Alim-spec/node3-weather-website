const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require ('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()



app.set('view engine','hbs')
app.use(express.static(path.join(__dirname,'../public')))
app.set('views', path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.get('', (req,res)=>{
    res.render('index',{
        name: 'Alim',
        title: 'Weather App'
    })

})

app.get('/about', (req,res)=>{
    res.render('about', {
        name: 'Alim',
        title: 'About me'
    })})

app.get('/help', (req,res)=>{
        res.render('help', {
            msg: 'Example help message',
            name: 'Alim',
            title: 'Help'
        })})
    

app.get('/weather', (req, res)=>{
    if (!req.query.search) {
        return res.send ({
            error: 'You must provide an address!'
        })
    }
    geocode (req.query.search, (error, data)=>{
        if (error) {
            return res.send ({error: error})
        }
        forecast(data.lat, data.lon, (error, forecastData) => {
            if (error) {
                return res.send ({error: error})
            }
      
  res.send({
        address: req.query.search,
        forecast: forecastData,
        location: data
        })

        })
    })})
  


app.get('/products', (req, res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })

    }
    console.log(req.query.search)
    res.send({
        products: [] 
    })

})

app.get('/help/*', (req,res)=>{
    res.render('404-generic',{
        errorMsg: "Help page is not found! HBS",
        title: '404-help',
        name: 'Alim'
    })
}
)

app.get('*', (req,res)=>{
res.render('404-generic', {
    errorMsg: 'Page does not exist! HBS',
    title: '404',
    name: 'Alim'
})
 


}
)
app.listen(3000,()=>{
    console.log('Server is up on port 3000')

})
