/* eslint-disable @typescript-eslint/no-explicit-any */
export class RestApiClient {
    private baseURL: string;
  
    constructor(baseURL: string) {
      this.baseURL = baseURL;
    }
  
    private async request<T>(url: string, config: RequestInit = {}): Promise<T> {
      const response = await fetch(`${this.baseURL}${url}`, {
        ...config,
        headers: {
          ...config.headers,
        },
      });
  
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }
  
      return response.json();
    }
  
    public async get<T>(url: string, config?: RequestInit): Promise<T> {
      return this.request<T>(url, { ...config, method: 'GET' });
    }
  
    public async post<T>(url: string, data: any, config: RequestInit = {}): Promise<T> {
      let body: string | FormData;
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...config.headers,
      };

      if (data instanceof FormData) {
        body = data;
        delete (headers as Record<string, string>)['Content-Type'];
      } else {
        body = JSON.stringify(data);
      }

      return this.request<T>(url, {
        ...config,
        method: 'POST',
        body,
        headers,
      });
    }
  
    public async put<T>(url: string, data?: any, config?: RequestInit): Promise<T> {
      return this.request<T>(url, {
        ...config,
        method: 'PUT',
        body: JSON.stringify(data),
      });
    }
  
    public async delete<T>(url: string, config?: RequestInit): Promise<T> {
      return this.request<T>(url, { ...config, method: 'DELETE' });
    }
  }