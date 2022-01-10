// import { Coin } from "@/types/interfaces";

const get = async (url: string, options: any) => {
  const response = await fetch(url, options)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((error) => console.error(error));
  return response;
};

export default {
  get,
};
