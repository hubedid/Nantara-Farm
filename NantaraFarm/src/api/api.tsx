import axios, { AxiosResponse } from "axios";

const url = "https://nantara-api.hoaks.my.id/api/";

export const get = async (
  apiParams: string
): Promise<AxiosResponse<any, any>> => {
  return await axios.get(url + apiParams);
};

export const getWithAuth = async (
  token: string,
  apiParams: string
): Promise<AxiosResponse<any, any>> => {
  return await axios.get(url + apiParams, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token, //Add this line
    },
  });
};