console.log('model:                       🙋‍♂️ entering user.model');

function UserModel(seq, types) {

  const User = seq.define('User', {
    email: {
      type: types.STRING,
      allowNull: false,
      unique: true, //unique: email
      isEmail: {
        msg: "Must be an email"
      },
    },
    password: {
      type: types.STRING,
      allowNull: false
    },
    firstname: {
      type: types.STRING,
      allowNull: false
    },
    lastname: {
      type: types.STRING,
      allowNull: false
    },
    email_active: {
      type: types.BOOLEAN,
    },
    phone_number: {
      type: types.INTEGER,
      // trim: true
    },
    country: {
      type: types.STRING
    },
    business_name: {
      type: types.STRING
    },
    avatar: {
      type: types.STRING
    },
    // stripe_account_id: {
    //   type: types.STRING,
    //   unique: true
    // },
    // product_id: {
    //   type: types.ARRAY(types.INTEGER)
    // },
    // stripe_seller: {
    //   type: types.STRING
    // },
    // stripe_charges_enabled: {
    //   type: types.STRING
    // },
    stripe_session_id: {
      type: types.STRING
    },
    stripe_registration_complete: {
      type: types.BOOLEAN
    },
    timestamps: types.DATE
    // Sequelize.ENUM('value 1', 'value 2')
  }, {
    // {
    //   validate: {
    //     emailcheck: function () {
    //       if ((this.email === null)) {
    //         throw new Error('Required')
    //       }
    //     }
    //   }
  });

  User.associate = function (models) {
    User.belongsTo(models.StripeData, {
      foreignKey: 'stripe_account_id'
    })
    User.hasMany(models.Product);
  };
  return User
}

// {
//   foreignKey: 'stripe_account_id'
// // }

module.exports = UserModel

// associate: (models) => {
//   User.hasOne(models.Stripe, {
//     foreignKey: 'stripe_acct_id',
//   })
// // },
//   , {
//   foreignKey: 'created_by'
// }