const axios = require('axios')

const run = () => {
    return axios({
        method: 'PUT',
        url: 'http://localhost:3000/bid/create',
        data: {
            name: 'Test bid1', 
            createdAt: "null", 
            openingPrice:  1000
        }
    })
}

run()
.then(console.log)
.catch(err => {
    console.log(err.response)
})