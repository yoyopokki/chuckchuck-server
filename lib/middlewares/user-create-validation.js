import { validationResult } from 'express-validator'
import { generateErrorStatus } from '../utils/rest-status'

const userCreateValidation = (req, res, next) => {
  const errors = validationResult(req)
  if (errors && !errors.isEmpty())
    return res.status(400).json(
      generateErrorStatus(
        errors
          .array()
          .map((error) => error.msg)
          .join(';'),
      ),
    )

  next()
}

export default userCreateValidation
