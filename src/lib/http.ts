import envConfig from "../../config";

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

const request = async <Response>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, options?: CustomOptions | undefined): Promise<Response> => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  const baseHeader = {
    'Content-Type': 'application/json',
  };

  const baseUrl = options?.baseUrl === undefined ? envConfig.NEXT_PUBLIC_API_ENDPOINT : options.baseUrl;
  const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeader,
      ...options?.headers
    },
    body,
    method
  });

  const payload: Response = await res.json();
  if (!res.ok) {
    throw new HttpError({ status: res.status, payload });
  }
  return payload;
}

const http = {
  get<Response>(url: string, options?: Omit<CustomOptions, 'body'> | undefined): Promise<Response> {
    return request<Response>('GET', url, options);
  },
  post<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined): Promise<Response> {
    return request<Response>('POST', url, { ...options, body });
  },
  put<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined): Promise<Response> {
    return request<Response>('PUT', url, { ...options, body });
  },
  delete<Response>(url: string, body: any, options?: Omit<CustomOptions, 'body'> | undefined): Promise<Response> {
    return request<Response>('DELETE', url, { ...options, body });
  }
}

export default http;
