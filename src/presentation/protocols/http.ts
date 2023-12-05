export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest {
  locals?: any,
  headers?: any,
  params?: any,
  query?: any,
  body?: any,
  idAnunciante?: string
}
