interface Response {
  data: [],
}
// interface Options {
//   method: string,
//   redirect: string,
// }

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

export default {
  get,
};

// const getAssetHistory = (url: string, options: any): Promise<any> => {
//   const response: Response = await fetch(url, options)
//     .then((res) => res.json())
//     .then((res) => res.data)
// }
