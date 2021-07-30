const db = require('../models/index')

console.log('                                 🚽 entering productMiddelWare')
console.log('with userid:', req.user.id);
console.log('with headers:', req.rawHeaders);

const productOwner = async (req, res, next) => {
  try {
    let product = await Product.findById({ where: {productId: req.params.productId}});
    let owner = product.posted_by.id.toString() === req.user.id.toString();
    if (!owner) {
      return res.status(403).send("Unauthorized");
    }
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

module.exports = { productOwner }
