const helpers = require('./_helpers.js')
const express = require('express')
const router = express.Router()
const required = require('../middlewares/token')
import model from '../models/administrator'
import Debug from 'debug'
const debug = new Debug(`api/administrator`)

router.get('/', (req, res, next) => {
  return helpers.find(model, req, res)
})

router.get('/:id', (req, res, next) => {
  return helpers.findById(model, req, res)
})

router.post('/', (req, res, next) => {
  return helpers.save(model, req, res)
})

router.put('/:id', (req, res, next) => {
  return helpers.findByIdAndUpdate(model, req, res);
})

router.delete('/all', (req, res, next) => {
  return helpers.deleteAll(model, req, res)
})

router.delete('/:id', (req, res, next) => {
  return helpers.delete(model, req, res)
})

router.post('/login', function (req, res, next) {
    return helpers.login(model, req, res)
})

module.exports = router
