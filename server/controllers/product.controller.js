const db = require('../models/index')
const fs = require('fs')

const addProduct = async (req, res) => {
  // console.log("req.fields", req.fields);
  console.log("req.files", req.files.image.name, req.files.image.path);
  try {
    let fields = req.fields;
    let imageFile = req.files.image;
    // let newProduct = new db.ProductModel(fields);
    console.log('-----------------------', newProduct);

    // handle image
    if (imageFile) {
      console.log(JSON.stringify(imageFile))
      // newProduct.image.data = fs.readFileSync(imageFile.path);
      // newProduct.image.contentType = imageFile.type;
    }
    // const product = await db.ProductModel.create(newUser);
    res.json('product');

  } catch (err) {
    console.log("saving product err => ", err);
    res.status(400).json({
      err: err.message,
    });
    // res.status(400).send("Error saving");
  }
};

module.exports = { addProduct }
