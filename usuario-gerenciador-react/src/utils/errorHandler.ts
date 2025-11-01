import axios from "axios";

export const getErrorMessage = (
     error: unknown,
     defaultMessage: string
): string => {
     if (axios.isAxiosError(error)) {
          const responseData = error.response?.data;

          if (typeof responseData === "string") {
               return responseData;
          }

          if (responseData?.message) {
               return responseData.message;
          }

          if (responseData?.error && typeof responseData.error === "string") {
               return responseData.error;
          }
     }

     return defaultMessage;
};
