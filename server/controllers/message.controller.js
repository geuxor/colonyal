// const Message = require('../models/messages.model')

// const getAll = async (req, res) => {
//   try {
//     const messages = await Message.findAll();
//     messages.row.forEach(m => m.timesteamp = +m.timesteamp)
//     res.status(200).send('messages')
//   } catch (err) {
//     console.log(err);    
//     res.status(500).send(err)
//   }
//   }

// module.exports = { getAll }