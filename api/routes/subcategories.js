var url       = require('url');
var helpers = require('./_helpers.js')
var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
import model from '../models/subcategory'
import category from '../models/category'
import article from '../models/article'

router.get('/',  (req, res, next) => {
  return helpers.find(model, req, res)
})

router.get('/count', (req, res, next) => {
  model.aggregate(
    [
      // Busca los artículos que tiene cada subcategoría

      {
        $lookup: {
          from: article.collection.name,
          localField: '_id',
          foreignField: 'subcategory',
          as: 'articles'
        }
      },

      // Agrega un campo con la cantidad

      {
        $addFields: { "articles": { $size: '$articles' }}
      },

      // Agrupa las subcategorías por categorías

      {
        $group: {
          _id: '$category', 
          subcategories: { $push: "$$ROOT" }, // Agrega todas las subcategorías al nivel root
          subcategoriesCount: { $sum: 1 } // Agrega la cantidad de subcategorías q tiene la categoría
        }
      },

      // Populado de la categoría

      {
        $lookup: {
          from: category.collection.name,
          localField: '_id',
          foreignField: '_id',
          as: 'category'
        }
      },

      // Oculto el _id categoria de la respuesta

      {
        $project: {
          _id: 0
        }
      }

  ]
  ).
    then(function (result) {
      return res.status(200).json(result)
      //   category.populate(result, { path: '_id' }, function (err, resultFinal) {
      //     return res.status(200).json(resultFinal)
      // });
    });
})

router.get('/:id',  (req, res, next) => {
  return helpers.findById(model, req, res)
})

router.post('/', (req, res, next) => {
  return helpers.save(model, req, res)
})

router.put('/:id', (req, res, next) => {
  return helpers.save(model, req, res)
})

router.delete('/:id', (req, res, next) => {
  return helpers.delete(model, req, res)
})

module.exports = router
