import { multerAdapter } from './multer.adapter';
import multer from 'multer'

import { getMockReq, getMockRes } from '@jest-mock/express'
import exp from 'constants';
import { NextFunction, RequestHandler, Response, Request } from 'express';
import { ErroServidor } from '../../presentation/errors';


jest.mock('multer')


describe('multerAdapter', () => {

  let uploadSpy: jest.Mock
  let arraySpy: jest.Mock
  let multerSpy: jest.Mock
  let fakeMulter: jest.Mocked<typeof multer>
  let req: Request
  let res: Response
  let next: NextFunction
  let target: RequestHandler

  beforeAll(() => {
    uploadSpy = jest.fn().mockImplementation((req, res, next) => {
      req.files = { buffer: Buffer.from('any_buffer') }
    })
    arraySpy = jest.fn().mockImplementation(() => uploadSpy)
    multerSpy = jest.fn().mockImplementation(() => ({ array: arraySpy }))
    fakeMulter = multer as jest.Mocked<typeof multer>

    jest.mocked(fakeMulter).mockImplementation(multerSpy)

    res = getMockRes().res
    next = getMockRes().next




  })

  beforeEach(() => {
    req = getMockReq({ locals: { anyLocals: 'any_locals' } })
    target = multerAdapter

  })

  test('Deve chamar array upload com os parâmetros corretos', () => {

    target(req, res, next)

    expect(multerSpy).toHaveBeenCalledWith()
    expect(multerSpy).toHaveBeenCalledTimes(1)
    expect(arraySpy).toHaveBeenCalledWith('fotos')
    expect(arraySpy).toHaveBeenCalledTimes(1)
    expect(uploadSpy).toHaveBeenCalledWith(req, res, expect.any(Function))
    expect(uploadSpy).toHaveBeenCalledTimes(1)
  })


  test('teste 2', () => {

    target(req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: new ErroServidor(new Error()) })
    expect(res.json).toHaveBeenCalledTimes(1)

  })

  test('teste 3', () => {
    const error = new Error('multer error')
    uploadSpy.mockImplementation((req, res, next) => { next(error) })
    target(req, res, next)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.status).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith({ error: new ErroServidor(new Error()) })
    expect(res.json).toHaveBeenCalledTimes(1)

  })


  test('Não deve adicionar o arquivo no req.locals se files está vazio', () => {
    uploadSpy.mockImplementationOnce((req, res, next) => {
      next()
    })

    target(req, res, next)

    expect(req.locals).toEqual({ anyLocals: 'any_locals' })


  })


  test('Deve adicionar o arquivo no req.locals se files está com dados', () => {

    target(req, res, next)

    expect(next).toHaveBeenCalledWith()
    expect(multerSpy).toHaveBeenCalledTimes(1)


  })
})