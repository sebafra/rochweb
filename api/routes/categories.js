var url       = require('url');
var helpers = require('./_helpers.js')
var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
import model from '../models/category'

// router.get('/',(req, res, next) => {

//   var urlParts = url.parse(req.url, true);
//   var queryParams = urlParts.query;

//   console.log("queryParams:" + JSON.stringify(queryParams));

//   var sort = {};
//   if(queryParams.sort)
//     sort = JSON.parse(queryParams.sort);
//   console.log("sort:" + sort);

//   model.find()
//   .populate("actions")
//   .sort(sort)
//   .then(function(find) {
//     for(var i=0; i < find.length;i++){
//       find[i].id = find[i]._id;
//       for(var ii=0; ii < find[i].actions.length;ii++){
//         find[i].actions[ii].id = find[i].actions[ii]._id;
//       }
//     }
//     res.json(find);
//   });
// })

router.get('/', (req, res, next) => {
  return helpers.find(model, req, res)
})

router.get('/:id', (req, res, next) => {
  return helpers.findById(model, req, res)
})

router.post('/',(req, res, next) => {
  return helpers.save(model, req, res)
})

router.put('/:id',(req, res, next) => {
  return helpers.save(model, req, res)
})

router.delete('/:id',(req, res, next) => {
  return helpers.delete(model, req, res)
})

module.exports = router
