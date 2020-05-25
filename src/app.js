const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('../src/utils/forecast');
const geocode = require('../src/utils/geocode');

const app = express()
const port = process.env.PORT || 3000

///_____________Define paths for express config________________
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


///____________setup handlebars engine and views location________
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// __________________Setup static directory to serv_______________
app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Claudiu',
    })
})

app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather App',
        name: 'Claudiu'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Claudiu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Claudiu',
        message: 'This is a message from programers to the user'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } else {
        geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            } else {
                forecast(latitude, longitude, (error, forcastData) => {
                    if (error) {
                        return res.send({ error })
                    }
                    res.send({
                        forecast: `${forcastData}`,
                        address: req.query.address,
                        location: `${location}`,
                        latitude,
                        longitude,
                        link: ``
                    })
                })
            }
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: [req.query]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: `${req.url} is not found on server. Pls check the link`,
        status: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        status: '404'
    })
})

app.listen(port, () => {
    console.log(`Server is up under port ${port}`);
})