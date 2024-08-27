import { SavedSuccessfully, DeletedSuccessfully } from "../constants/messages";
import { Change, Reset, MessageTypes } from "./selectors";
import axiosController from "../services/abortController";
import { config } from "../config/configurations";
import { Validator } from "../services/validate";
import * as errors from "../constants/errors";
import { Proxy } from "../services/proxy";

export const onSubmit =
  ({ file, url, action }) =>
  async (dispatch) => {
    const error = Validator.reset()
      .isNull(file, "messageBody", errors.requiredFile)
      .result();
    if (Object.keys(error).length) {
      return dispatch({
        type: Change.Shared,
        payload: { ...error, messageType: MessageTypes.Error },
      });
    }
    dispatch({
      type: Change.Image,
      payload: { busy: true },
    });
    const response = await Proxy.PutMultiPartData(url, file, action);
    dispatch({ type: Change.Image, payload: { busy: false } });
    if (!response) return;
    if (response?.errMessage) {
      return dispatch({
        type: Change.Shared,
        payload: {
          messageBody: response.errMessage,
          messageType: MessageTypes.Error,
        },
      });
    }
    dispatch({
      type: Change.Shared,
      payload: {
        messageBody: SavedSuccessfully,
        messageType: MessageTypes.Success,
      },
    });
  };

export const onDelete =
  ({ url }) =>
  async (dispatch) => {
    const error = Validator.reset()
      .required(url, "messageBody", errors.requiredUrl)
      .result();
    if (Object.keys(error).length) {
      return dispatch({
        type: Change.Shared,
        payload: { ...error, messageType: MessageTypes.Error },
      });
    }
    dispatch({
      type: Change.Image,
      payload: { busy: true },
    });
    const response = await Proxy.DeleteData(url);
    dispatch({ type: Change.Image, payload: { busy: false } });
    if (!response) return;
    if (response?.errMessage) {
      return dispatch({
        type: Change.Shared,
        payload: {
          messageBody: response.errMessage,
          messageType: MessageTypes.Error,
        },
      });
    }
    dispatch({
      type: Change.Shared,
      payload: {
        messageBody: DeletedSuccessfully,
        messageType: MessageTypes.Success,
      },
    });
    dispatch({
      type: Change.Image,
      payload: {
        imgUrl: "images/no_image.jpg",
        imgFile: undefined,
      },
    });
  };

export const updateProgress = (value) => (dispatch) => {
  dispatch({
    type: Change.Image,
    payload: { progressValue: value },
  });
};

export const onUnmount = () => (dispatch) => {
  axiosController.abort();
  dispatch({
    type: Reset.Image,
    payload: {},
  });
};

export const setImage =
  ({ files, imgUrl }) =>
  (dispatch) => {
    URL.revokeObjectURL(imgUrl);
    files = files?.filter(
      (file) =>
        config.ALLOWED_FILES.IMAGES.includes(file.type) &&
        file.size < config.MAX_SIZE.IMAGES
    );
    if (!files.length) return;
    dispatch({
      type: Change.Image,
      payload: {
        imgFile: files[0],
        imgUrl: URL.createObjectURL(files[0]),
      },
    });
  };
