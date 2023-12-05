import { RequestHandler, Request } from "express";
import multer from 'multer'
import { ErroServidor } from "../../presentation/errors";
export const multerAdapter: RequestHandler = (req, res, next) => {
  const upload = multer().array('fotos')

  upload(req, res, error => {
    if (error !== undefined) {
      return res.status(500).json({ error: new ErroServidor(new Error()) })
    }

    if (req.files !== undefined) {
      req.locals = { ...req.locals, buffer: req?.files }
    }

    next()
  })

}