const Product = require("../../model/product");

const productController = {
  createProduct: (req, res) => {
    const { name, price, description, count, imgUrl } = req.body;

    const newProduct = new Product({ name, price, description, count, imgUrl  });
    newProduct
      .save()
      .then((result) => res.json(result))
      .catch((err) => res.status(400).send(err));
  },

  getAllProduct: (req, res) => {
    Product.find()
      .then((result) => res.json(result))
      .catch((err) => res.status(400).send(err));
  },

  getProductById: (req, res) => {
    const { id } = req.params;
    Product.findById(id)
      .then((result) => res.json(result))
      .catch((err) => res.status(400).send(err));
  },
  getProductByCategory : (req, res) => {
    const { category } = req.params;
    Product.find({category})
      .then((result) => res.json(result))
      .catch((err) => res.status(400).send(err));
  }
};

module.exports = productController;
