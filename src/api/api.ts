import { Coin, HistoryItem, Market } from '../types/interfaces';

interface Response {
  data: [],
  timestamp: number,
}

const baseURL = 'https://api.coincap.io/v2/assets/';

const get = async (url: string, options: any | {methdd: 'GET', redirect: 'follow'}): Promise<any> => {
  try {
    const response: Response = await fetch(url, options)
      .then((res) => res.json())
      .then((res) => res.data)
      .catch((error) => console.error(error));
    return response;
  } catch (error) {
    return 'error';
  }
};

const getAsset = async (coin: string): Promise<Coin> => {
  const request = `${baseURL}${coin}`;
  const response = await fetch(request)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.log('Something went wrong in getAsset!'));
  return response;
};

const getAsset2 = async (coin: string): Promise<Coin | boolean> => {
  try {
    const request = `${baseURL}${coin}`;
    const response = await fetch(request, {
      method: 'GET',
      redirect: 'follow',
    });
    if (!response.ok) {
      throw new Error(`El status es: ${response.status}`);
    }
    console.log('🚀 ~ file: api.ts ~ line 38 ~ getAsset2 ~ response', response);
    const responseJson = await response.json();
    return responseJson;
  } catch (ex) {
    console.log('🚀 ~ file: api.ts ~ line 43 ~ getAsset2 ~ error', ex);
    return false;
  }
};

const getHistory = async (coin: string, start: number, end: number): Promise<HistoryItem[]> => {
  const request = `${baseURL}${coin}/history?interval=h1&start=${start}&end=${end}`;
  const response = await fetch(request, {
    method: 'GET',
    redirect: 'follow',
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.log('Something went wrong! in getHistory'));
  return response;
};

const getMarkets = async (coin: string): Promise<Market[]> => {
  const request = `${baseURL}${coin}/markets?limit=5`;
  const response = await fetch(request, {
    method: 'GET',
    redirect: 'follow',
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.log('Something went wrong! in getMarkets'));
  return response;
};

export default {
  get,
  getAsset,
  getMarkets,
  getHistory,
  getAsset2,
};

// const getAssetHistory = (url: string, options: any): Promise<any> => {
//   const response: Response = await fetch(url, options)
//     .then((res) => res.json())
//     .then((res) => res.data)
// }
