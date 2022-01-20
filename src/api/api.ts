interface Response {
  data: [],
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
    console.log('🚀 ~ file: api.ts ~ line 19 ~ get ~ error', error);
    return 'error';
  }
};

const getHistory = async (coin: string, start: number, end: number): Promise<any> => {
  const request = `${baseURL}${coin}/history?interval=h1&start=${start}&end=${end}`;
  const response = await fetch(request, {
    method: 'GET',
    redirect: 'follow',
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.log(err));
  console.log('🚀 ~ file: api.ts ~ line 31 ~ getHistory ~ response', response);
  return response;
};

const getMarkets = async (coin: string): Promise<any> => {
  const request = `${baseURL}${coin}/markets?limit=5`;
  const response = await fetch(request, {
    method: 'GET',
    redirect: 'follow',
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return response;
};

export default {
  get,
  getMarkets,
  getHistory,
};

// const getAssetHistory = (url: string, options: any): Promise<any> => {
//   const response: Response = await fetch(url, options)
//     .then((res) => res.json())
//     .then((res) => res.data)
// }
