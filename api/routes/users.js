const helpers = require('./_helpers.js')
const express = require('express')
const router = express.Router()
const required = require('../middlewares/token')
import model from '../models/user'
import Debug from 'debug'
const debug = new Debug(`api/user`)
var url = require('url');

router.get('/', (req, res, next) => {
  return helpers.find(model, req, res);
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
    model.deleteMany()
      .then(data => {
      model.deleteMany().exec();
        return res.status(200).json(data);
      })
      .catch((error) => {
        return res.status(400).json({
          message: error.message || 'no se pudo eliminar los objetos',
          error
        });
      });
})

router.delete('/:id', (req, res, next) => {
  const _id = req.params.id || '';
  debug('helper delete id', _id)
  model.findOneAndDelete({_id})
    .then((data) => {
      if (!data) {
        return Promise.reject('no se encontro ningun documento con ese id')
      } else { 
      model.find({user: data._id}).then(response => {
          if (response){
            console.log("RESPONSE", response)
            for (let i in response){
              const element = response[i];
              console.log("element", element)
              let id = element.id
            model.findOneAndDelete({id}).then(r => {
                console.log("eliminada unamodel")
              })
            }
          }
        })
      }
      debug('helper delete ', data)
      res.status(202).json({
        message: 'Objeto eliminado con exito',
        status: 'ok',
        data
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message || 'No se pudo eliminar el item',
        err
      })
    })
}) 

router.post('/login', function (req, res, next) {
    return helpers.login(model, req, res)
})

module.exports = router
