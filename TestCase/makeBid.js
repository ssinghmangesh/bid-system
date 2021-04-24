const axios = require('axios')

const run = () => {
    return axios({
        method: 'POST',
        url: 'http://localhost:3000/bid/make-bid',
        data: {
            name: 'Test bid', 
            price:  100222
        }
    })
}

run()
.then(console.log)
.catch(err => {
    console.log(err.response)
})