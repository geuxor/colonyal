console.log('entering user.model');

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
    timestamps: types.DATE
    // Sequelize.ENUM('value 1', 'value 2')
  }, {
    // {
    //   validate: {
    //     bothCoordsOrNone: function () {
    //       if ((this.latitude === null) !== (this.longitude === null)) {
    //         throw new Error('Require either both latitude and longitude or neither')
    //       }
    //     }
    //   }
  });
  return User
}

module.exports = UserModel

// try {
//   await User.sync({ alter: true })
// db.seq.sync({ alter: true }).then(() => {
//   console.log('disconnecting...')
// }).catch(e => {
//   console.log(e)
// })
