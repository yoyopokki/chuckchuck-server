import DialogModel from '../models/dialog.model'
import UserModel from '../models/user.model'
import { generateErrorStatus } from '../utils/rest-status'
import mongoose from 'mongoose'

const contactCreateValidation = async (req, res, next) => {
  const id = req.params.id
  const contactId = req.body.contactId

  const result = await Promise.all([
    UserModel.exists({ _id: mongoose.Types.ObjectId(contactId) }),
    UserModel.exists({
      _id: mongoose.Types.ObjectId(id),
      contacts: mongoose.Types.ObjectId(contactId),
    }),
    DialogModel.exists({
      users: {
        $all: [id, contactId],
      },
    }),
  ])
    .then((result) => {
      return result
    })
    .catch(() => {
      return false
    })
  if (result) {
    const [existingUser, existingContact, existingDialog] = result
    if (!existingUser || existingContact || existingDialog) {
      return res.status(200).json(generateErrorStatus('CONTACT_EXISTS'))
    }
  } else {
    return res.status(500).json(generateErrorStatus('DB_ERROR'))
  }

  next()
}

export default contactCreateValidation
