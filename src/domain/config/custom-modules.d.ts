declare module Express {
  interface Request {
    idAnunciante?: string,
    locals?: any
  }
}