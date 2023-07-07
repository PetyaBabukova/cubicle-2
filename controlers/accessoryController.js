const { Router } = require('express');
const accessoryService = require('../services/accessoryService')

const router = Router();

router.get('/create', (req, res)=>{
    res.render('createAccessory')
})

//TODO Validation Middleware or validate incomming data
router.post('/create', (req, res)=>{
    console.log(req.body);
    accessoryService.create(req.body)
    .then(()=>{
        res.redirect('/products')

    })
    .catch(()=> res.status(500).end())
})

module.exports = router;