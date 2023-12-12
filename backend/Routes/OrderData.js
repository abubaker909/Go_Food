const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    //console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    
    console.log(eId)
    if (eId===null) {
        try {
            //console.log(data)
            //console.log("1231242343242354",req.body.email)
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});

module.exports = router;


/*const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')

router.post('/orderData', async (req, res) => {
    try {
        let data = req.body.order_data;
        let orderDate = req.body.order_date;

        if (!Array.isArray(data)) {
            return res.status(400).json({ success: false, error: 'order_data must be an array' });
        }

        if (!orderDate) {
            return res.status(400).json({ success: false, error: 'order_date is required' });
        }

        data.unshift({ Order_date: orderDate });

        let eId = await Order.findOne({ 'email': req.body.email });
        console.log(eId);

        if (eId === null) {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            });
        } else {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } });
        }

        res.json({ success: true });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
})

module.exports = router;
*/