import env from "react-dotenv";

export const config = {
  API_URL: `${env.SERVER_URL}/${env.API_VER}`,
  TOKEN_NAME: env.TOKEN_NAME,
  GOOGLE_CLIENT_ID: env.GOOGLE_CLIENT_ID,
  ALLOWED_FILES: {
    IMAGES: env.IMAGES_EXTENSIONS?.split(" ") || ["image/png", "image/jpeg"],
  },
  MAX_SIZE: {
    IMAGES: env.IMAGES_MAX_SIZE_IN_MB * 1048576 || 1048576,
  },
};
