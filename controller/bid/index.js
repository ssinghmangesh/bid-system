
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
        if(!name || !createdAt || !openingPrice) {
            return res.status(400).send({ message: 'Required fields not found.'})
        }

        let allBid = require('../../bid.json');
        
        let newBid = {
            name, 
            createdAt, 
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
        return res.sendStatus(500)
    }

}) 

router.post('/make-bid',  async (req, res) => {
    try {
        const { name, price } = req.body
        if(!name || !price) {
            return res.status(400).send({ message: 'Required fields not found.'})
        }

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