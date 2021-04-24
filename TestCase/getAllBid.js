const axios = require('axios')

const run = () => {
    return axios({
        methods: 'GET',
        url: 'http://localhost:3000/bid/get-all-bid'
    })
}

run()
.then(console.log)
.catch(console.log)