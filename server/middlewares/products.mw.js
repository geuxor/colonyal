// const multer = require('multer');
// const fs = require('fs');
// const upload = multer({ dest: './tmp/' });

console.log('                                 🚽 entering productMiddelWare')

const productCreatedby = async (req, res, next) => {
  console.log('with userid:', req.user.id);
  console.log('with headers:', req.rawHeaders);
  try {
    const file = global.appRoot + '/uploads/' + req.file.filename;
    console.log(file);
    fs.rename(req.file.path, file, function (err) {
      if (err) {
        console.log(err);
        res.send(500);
      }
      else {
        db.ProductModel.create({
          title: req.body.title,
          description: req.body.description,
          image: req.file.filename
        })
          .then(r => {
            res.send(r.get({ plain: true }));
          });
      }
    });
    
    // let product = await Product.findById({ where: {productId: req.params.productId}});
    // let owner = product.posted_by.id.toString() === req.user.id.toString();
    // if (!owner) {
    //   return res.status(403).send("Unauthorized");
    // }
    // next();

    const { product_id } = req.body;
    console.log('product_id', uid);
    if (!product_id) throw new Error();
    const product = await db.Product.findOne({ where: { id: product_id } });
    if (!product) throw new Error();
    product.created_by = user.id
    req.product = product;
    next();

  } catch (error) {
    return res.sendStatus(401);
  }
};

module.exports = productCreatedby
