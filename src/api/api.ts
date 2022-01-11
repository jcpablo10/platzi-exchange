interface Response {
  data: [],
}

// interface interfaceOptions {
//   method: string,
//   redirect: string,
// }

const get = async (url: string, options: any): Promise<any> => {
  const response: Response = await fetch(url, options)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((error) => console.error(error));
  return response;
};

export default {
  get,
};

// const getAssetHistory = (url: string, options: any): Promise<any> => {
//   const response: Response = await fetch(url, options)
//     .then((res) => res.json())
//     .then((res) => res.data)
// }
