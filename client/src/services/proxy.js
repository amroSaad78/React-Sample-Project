import axiosController from "../services/abortController";
import { noConnection } from "../constants/errors";
import { config } from "../config/configurations";
const axios = require("axios");

export class Proxy {
  static async PostJsonData(url, payload) {
    let postUrl = `${config.API_URL}/${url}`;
    try {
      const result = await axios.post(postUrl, JSON.stringify(payload), {
        signal: axiosController.signal(),
        headers: this.#GetHeader("application/json"),
      });
      return result.data;
    } catch (error) {
      if (error.code === "ERR_CANCELED") return undefined;
      return error.response.data ?? { errMessage: noConnection };
    }
  }

  static async PutJsonData(url, payload) {
    let putUrl = `${config.API_URL}/${url}`;
    try {
      const result = await axios.put(putUrl, JSON.stringify(payload), {
        signal: axiosController.signal(),
        headers: this.#GetHeader("application/json"),
      });
      return result.data;
    } catch (error) {
      if (error.code === "ERR_CANCELED") return undefined;
      return error.response.data ?? { errMessage: noConnection };
    }
  }

  static async PutMultiPartData(url, file, callBack) {
    let putUrl = `${config.API_URL}/${url}`;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const result = await axios.put(putUrl, formData, {
        signal: axiosController.signal(),
        onUploadProgress: (progressEvent) =>
          callBack(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          ),
        headers: this.#GetHeader("multipart/form-data"),
      });
      return result.data;
    } catch (error) {
      if (error.code === "ERR_CANCELED") return undefined;
      return error.response.data ?? { errMessage: noConnection };
    }
  }

  static async GetData(url) {
    let getUrl = `${config.API_URL}/${url}`;
    try {
      const result = await axios.get(getUrl, {
        headers: this.#GetHeader("application/json"),
      });
      return result.data;
    } catch (error) {
      return error.response.data ?? { errMessage: noConnection };
    }
  }

  static async DeleteData(url) {
    let delUrl = `${config.API_URL}/${url}`;
    try {
      const result = await axios.delete(delUrl, {
        signal: axiosController.signal(),
        headers: this.#GetHeader("application/json"),
      });
      return result.data;
    } catch (error) {
      if (error.code === "ERR_CANCELED") return undefined;
      return error.response.data ?? { errMessage: noConnection };
    }
  }

  static #GetHeader(contentType) {
    const auth = "Bearer " + (localStorage.getItem(config.TOKEN_NAME) ?? "");
    return { "Content-type": contentType, Authorization: auth };
  }
}
