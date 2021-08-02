const db = require('../models/index')

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

  try {
    // const dbuser = await db.User.findOne({ 
    //   where: { id: user.id },
    //   include: ['Product']
    // });

    const product = await db.Product.create(req.body);
    //??? its replacing all other previous values
    const updateUser = await db.User.update(
      { product_id: db.Sequelize.fn('array_append', db.Sequelize.col('product_id'), product.id) },
      //   product_id: [product.id],
      {
        where: { id: user.id },
        plain: true,
        // returning: true
      })
    console.log(updateUser, " updated with ", product.dataValues)
    res.status(201).json(product);
  } catch (err) {
    console.log("saveImage err => ", err);
    res.status(400).json({
      err: err.message,
    });
  }
};

module.exports = { addProduct, addOnlyProduct }
