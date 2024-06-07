// import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import envConfig from "../../config";

// function wrapRequest<T>(request: Promise<AxiosResponse<any, any>>): Promise<T> {
//   return request
//     .then((resp) => resp.data)
//     .catch((err: AxiosError) => {
//       throw err.response?.data || err;
//     });
// }
// export function get<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
//   return wrapRequest(axios.get(url, options));
// }
// export function post<T>(
//   url: string,
//   data?: any,
//   options?: AxiosRequestConfig
// ): Promise<T> {
//   return wrapRequest(axios.post(url, data, options));
// }
// export function put<T>(
//   url: string,
//   data?: any,
//   options?: AxiosRequestConfig
// ): Promise<T> {
//   return wrapRequest(axios.put(url, data, options));
// }
type CustomOptions = RequestInit & {
  baseUrl?: string | undefined
}

class HttpError extends Error {
  status: number;
  payload: any;
  constructor({ status, payload }: { status: number; payload: any }) {
    super('Http Error');
    this.status = status;
    this.payload = payload;
  }
}

const request = async <Response>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions | undefined) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined
  const baseHeader = {
    'Contend-Type': 'application/json',
  }
  const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl
  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`
  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeader,
      ...options?.headers
    },
    body,
    method
  })
  const payload: Response = await res.json()
  const data = {
    status: res.status,
    payload
  }
  // if (!res.ok) {
  //   throw new HttpError(data)
  // }
  return data

}
const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('GET', url, options)
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('POST', url, { ...options, body })
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('PUT', url, { ...options, body })
  },
  delete<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, 'body'> | undefined
  ) {
    return request<Response>('DELETE', url, { ...options, body })
  }
}

export default http

