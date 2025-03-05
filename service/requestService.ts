import axios from "axios";
import { RequestOptions } from "@/types";

axios.defaults.withCredentials = true;

export const getGuardRequest = async (
    requestParameter = RequestParameter,
    id?: string
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${
      requestParameter.controller
  }${requestParameter.action ? `/${requestParameter.action}` : ""}${
      id ? `/${id}` : ""
  }`;
  return await axios.get(url, {
    params: { ...requestParameter.params},
  });
};

export const getRequest = async (requestParameter = RequestParameter) => {

  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${
      requestParameter.controller
  }${requestParameter.action ? `/${requestParameter.action}` : ""}${
      requestParameter.id ? `/${requestParameter.id}` : ""
  }`;
  return await axios.get(url, {
    params: { ...requestParameter.params },
  });
};

export const patchRequest = async (requestParameter = RequestParameter) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${
      requestParameter.controller
  }${requestParameter.action ? `/${requestParameter.action}` : ""}${
      requestParameter.id ? `/${requestParameter.id}` : ""
  }`;
  return await axios.patch(url, null,{
    params: { ...requestParameter.params },
  });
};

export const getGuardParamsRequest = async (
    requestParameter = RequestParameter
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${
      requestParameter.controller
  }${requestParameter.action ? `/${requestParameter.action}` : ""}${
      requestParameter.id ? `/${requestParameter.id}` : ""
  }`;
  return await axios.get(url, {
    params: { ...requestParameter.params },
  });
};

export const putGuardRequest = async (
    requestParameter = RequestParameter,
    body: object
) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
      requestParameter.action ? `/${requestParameter.action}` : ""
  }`;
  return await axios.put(url, body, {
    params: { ...requestParameter.params }
  });
};

export const deleteGuardRequest = async (
    requestParameter = RequestParameter,
) => {
  let url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${requestParameter.controller}${
      requestParameter.action ? `/${requestParameter.action}` : ""
  }`;
  return await axios.delete(url, {
    params: {...requestParameter.params}
  });
};

export const postGuardRequest = async (
    requestParameter = RequestParameter,
    body: object
) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_API}/${
      requestParameter.controller
  }${requestParameter.action ? `/${requestParameter.action}` : ""}${
      requestParameter.id ? `/${requestParameter.id}` : ""
  }`;
  return await axios.post(url, body, {
    params: { ...requestParameter.params },
  });
};

const RequestParameter: RequestOptions = {
  id: "",
  controller: "",
  action: "",
  params: Object,
};