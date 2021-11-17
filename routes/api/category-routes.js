const router = require('express').Router();
const { response } = require('express');
const { Category, Product } = require('../../models');
const { create } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product],
  })
    .then(catPros=>{
      res.json(catPros);
    });
});


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where:{
      id:req.params.id
    },
    include: [Product],
  }).then(catByIds=>{
    res.json(catByIds);
  });

});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(newCategory =>{
      res.json(newCategory);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {

    category_name: req.body.category_name
  },
    {
      where: {
        id: req.params.id
      }
    }
    )
    .then(updateCat => {
      res.json(updateCat);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Product.destroy({
    where: {
      category_id: req.params.id
    }
  }).then(() => {
    Category.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(deletedCat => {
        res.json(deletedCat);
    });
  });
});

module.exports = router;
