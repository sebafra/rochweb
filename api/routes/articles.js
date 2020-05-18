var url       = require('url');
var helpers = require('./_helpers.js')
var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
import model from '../models/article'

router.get('/', (req, res, next) => {
  return helpers.find(model, req, res)
})

router.get('/:id', (req, res, next) => {
  return helpers.findById(model, req, res)
})

router.post('/' ,(req, res, next) => {
  return helpers.save(model, req, res)
})

router.put('/:id' ,(req, res, next) => {
  return helpers.save(model, req, res)
})

router.delete('/:id' ,(req, res, next) => {
  return helpers.delete(model, req, res)
})

module.exports = router
