const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const pLoc = document.querySelector('#location')
const pForecast = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    pLoc.textContent = 'Loading...'
    pForecast.textContent = ''

    const location = search.value

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                pLoc.textContent = data.error
            } else {
                pLoc.textContent = data.location
                pForecast.textContent = data.forecast
            }
        })
    })
})