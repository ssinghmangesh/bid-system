
const express = require('express')
const router = express.Router()
router.get('/get-all-bid', async (req, res) => {
    let allBid = require('../../bid.json');
    return res.status(200).send({ status: true, message: 'successful', bids: allBid })
}) 
const fs = require('fs')

router.put('/create', async (req, res) => {
    try {
        const { name, createdAt, openingPrice } = req.body
        //step 1: validation
        if(!name || !createdAt || !openingPrice) {
            return res.status(400).send({ message: 'Required fields not found.'})
        }
        if(isNaN(openingPrice)) {
            return res.status(400).send({ message: 'Opening price should be number.'})
        }
        //step 2: check if already exists
        let allBid = require('../../bid.json');
        let selectedBid = allBid.find(bid => bid.name === name)
        if(selectedBid) {
            return res.status(400).send({ message: 'Bid with this name already exists'})
        }

        //step 3: create new bid
        let newBid = {
            name, 
            createdAt: isValidDate(new Date(createdAt)) ? new Date(createdAt) : new Date(), 
            openingPrice
        }

        let newData = []
        if(Array.isArray(allBid)) {
            newData = [ ...allBid, newBid  ]
        } else {
            newData = [ newBid ]
        }
        fs.writeFileSync('./bid.json', JSON.stringify(newData, null, 4))

        return res.status(200).send({ bid: newBid, status: true })
    } catch(e) {
        console.log(e)
        return res.sendStatus(500)
    }

}) 

router.post('/make-bid',  async (req, res) => {
    try {
        const { name, price } = req.body
        //step 1: validation
        if(!name || !price) {
            return res.status(400).send({ message: 'Required fields not found.'})
        }
        if(isNaN(price)) {
            return res.status(400).send({ message: 'Price should be number.'})
        }

        //step 2: search for the bid anf calculate the response
        let allBid = require('../../bid.json');
        let selectedBid = allBid.find(bid => bid.name === name)
        if(selectedBid) {
            const { openingPrice } = selectedBid
            if(openingPrice < price) {
                return res.status(200).send({ message: 'Your price is higher than opening price.' })
            } else {
                return res.status(201).send({ message: 'Your price is not higher than opening price.' })
            }
        } else {
            return res.status(400).send({ message: 'No just bid name in system.' })
        }
    } catch (e) {
        return res.sendStatus(500)
    }
}) 



module.exports = router




const isValidDate = (date) => {
    return date.getTime() === date.getTime();
};