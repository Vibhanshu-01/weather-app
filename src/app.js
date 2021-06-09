// const express = require('express')
// const { isAbsolute } = require('path')
// const path = require('path')
// const hbs = require('hbs')
// const forecast = require('./utils/forecast')
// const geocode = require('./utils/geocode')


// const app = express()

// // Define path for express config 
// const publicDirectory = path.join(__dirname,'../public')
// const viewspath = path.join(__dirname,'../templatest/views')
// const partialpath= path.join(__dirname,'../templatest/partials')

// //setup handelbars engine and views location 
// app.set('view engine','hbs')
// app.set('views', viewspath)
// hbs.registerPartials(partialpath)

// //setup static directory to serve

// app.use(express.static(publicDirectory))

// app.get('', (req, res)=> {
//     res.render('index',{
//         title:'Weather App',
//         name:'Vibhanshu'
//     })

// })
// app.get('/about',(req,res)=>{
//     res.render('about',{
//         title:'about',
//         name: 'vibhanshu'
//     })
// })

// app.get('/help',(req,res)=> {
//     res.render('help', {
//         title:'help',
//         example:'get help from google',
//         name:'vibhanshu'
//     })
// })
// app.get('/weather', (req, res) => {
//     if(!req.query.address)
//     return res.send('provide the adress')

//     geocode(req.query.address, (error, {latitude, longitude, location  }={})=>{
//         if(error)
//         {
//             return  console.log(error)
//         }
//         forecast(latitude ,longitude, (error, forecastData) => {
//          if(error)
//          {
//               return console.log(error)
//          }
//           return res.send({
//             address:req.query.address ,
//             forecast: forecastData,
//             location
//         })
//           })
//   })

// })
// app.get('/help/*', (req,res)=> {
//     res.render('error404', {
//         errormessage:'help article not found',
//         name:'vibhanshu'
//     })
// })

// app.get('/products', (req,res)=> {
//     if(!req.query.search)
//     return res.send({error:
//     'please enter the search term '})
     
//     console.log(req.query)
//     res.send(req.query)
// })
// app.get('*', (req,res)=> {
//   res.render('error404',{
//       errormessage:'page not found',
//       name: 'vibhanshu'
//   })
// })


// app.listen(3000, () => {
//     console.log('Server is up on port 3000.')
// })

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templatest/views')
const partialsPath = path.join(__dirname, '../templatest/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vibhanshu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Vibhanshu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Vibhanshu'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: '404',
        name: 'Vibhanshu',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        title: '404',
        name: 'Vibhanshu',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})