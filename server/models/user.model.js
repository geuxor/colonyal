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
  return User
}

module.exports = UserModel
