import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiClient {
  private _instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
    },
  });

  public async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this._instance(config);
      return response.data;
    } catch (error: any) {
      console.error('Ошибка API:', error?.response?.data || error);
      throw error;
    }
  }
}

export default new ApiClient();
