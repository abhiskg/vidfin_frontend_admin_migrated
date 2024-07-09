/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IUser } from "@/types/auth.type";
import axios, { type AxiosResponse } from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const request = async ({ ...options }) => {
  client.defaults.withCredentials = true;
  const user = JSON.parse(localStorage.getItem("vidfin-admin") as string).state
    ?.user as IUser | null;

  client.defaults.headers.common.Authorization = user
    ? `Bearer ${user.access_token}`
    : null;

  const onSuccess = (response: AxiosResponse) => {
    // if (response.status === 200 && response.data.code === 200) {
    //   return response.data.result;
    // }
    return response.data;
  };
  const onError = (error: any) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("vidfin-admin");
      window.location.href = "/auth/login";
    }
    throw new Error(error.response?.data?.msg);
  };
  return client(options).then(onSuccess).catch(onError);
};
