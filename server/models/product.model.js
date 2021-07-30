console.log('model:                       🙋‍♂️ entering product.model');

function ProductModel(seq, types) {

  const Product = seq.define('Product', {
    title: {
      type: types.STRING,
      allowNull: false,
    },
    description: {
      type: types.STRING,
      allowNull: false
    },
    location: {
      type: types.STRING,
    },
    price: {
      type: types.INTEGER,
      allowNull: false
    },
    created_by: {
      type: types.STRING,
    },
    image: {
      type: types.STRING,
    },
    from: {
      type: types.DATE
    },
    to: {
      type: types.DATE
    },
    quantity: {
      type: types.INTEGER
    },
    timestamps: types.DATE
  }, {
  });
  return Product
}
ProductModel.associate = function (models) {
  Product.belongsTo(models.User);
  Product.hasMany(models.Category, {
    foreignKey: 'category_id'
  });
};

module.exports = ProductModel
