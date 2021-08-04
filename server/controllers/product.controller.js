const db = require('../models/index')

const allProducts = async (req, res) => {
  console.log("allProducts - null req");
  try {
    const products = await db.Product.findAll(
      {
        include: {
          model: db.User,
          attributes: ['firstname']
        } //include: [db.User]
     });
    console.log('allProducts: found a total of', products.length);
    
    res.status(201).json(products);
  } catch (err) {
    console.log("find all products err => ", err);
    res.status(400).json({
      err: err.message,
    });
  }
}

const mineProducts = async (req, res) => {
  console.log("MINE Products =>: ", req.body);
  const user = req.user
  try {
    const products = await db.Product.findAll({ where: { user_id: user.id } });
    res.status(201).json(products);
  } catch (err) {
    console.log("find all MINE products err => ", err);
    res.status(400).json({
      err: err.message,
    });
  }
}

const addOnlyProduct = async (req, res) => {
  console.log("addProduct: ", req.body);
  try {
    const product = await db.Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.log("saving product err => ", err);
    res.status(400).json({
      err: err.message,
    });
  }
};

const addProduct = async (req, res) => {
  const user = req.user
  console.log("saveImage: ", req.body.title, "for", user.dataValues.email);
  req.body.UserId = user.id
  console.log('## ===>', req.body.UserId)
  try {
    const product = await db.Product.create(req.body);
    //??? replace all previous values
    // const updateUser = await db.User.update(
    //   { product_id: db.Sequelize.fn('array_append', db.Sequelize.col('product_id'), product.id) },
    //   //   product_id: [product.id],
    //   {
    //     where: { id: user.id },
    //     plain: true,
    //     // returning: true
    //   })
    console.log('updateUser', " updated with ", product.dataValues)
    res.status(201).json(product);
  } catch (err) {
    console.log("saveImage err => ", err);
    res.status(400).json({
      err: err.message,
    });
  }
};

module.exports = { addProduct, addOnlyProduct, allProducts, mineProducts }
