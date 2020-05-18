const helpers = require('./_helpers.js')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
import model from '../models/banner'

router.get('/',(req, res, next) => helpers.find(model, req, res))

router.get('/:id',(req, res, next) => helpers.findById(model, req, res))


router.post('/', (req, res, next) => {
    model.count({}, (err, count) => {
        req.body.order = count+1
        return helpers.save(model, req, res)
    })
})

router.post('/fileupload',(req, res, next) => helpers.upload(req, res, next))

router.put('/:id', (req, res, next) => helpers.save(model, req, res))

router.delete('/deleteFiles',(req, res, next) => helpers.deleteFiles(req, res))

router.delete('/:id', (req, res, next) => helpers.delete(model, req, res))

module.exports = router
