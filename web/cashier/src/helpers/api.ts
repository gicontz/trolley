import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const { MCGIFS_SERVER_BASE_URL } = process.env;
export const { API_TIMEOUT } = process.env;

const NOCACHE = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache, must-revalidate',
  Expires: 0,
};

const config: AxiosRequestConfig = {
  baseURL: MCGIFS_SERVER_BASE_URL,
  timeout: parseInt(API_TIMEOUT) || 25000,
  headers: NOCACHE,
};

export const api = (options: AxiosRequestConfig = {}): Promise<AxiosResponse> =>
  axios.request({ ...config, ...options });
