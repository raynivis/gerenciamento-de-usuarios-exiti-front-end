import { toast } from "react-toastify";
import type { ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
     position: "top-center",
     autoClose: 3000,
     hideProgressBar: false,
     closeOnClick: true,
     pauseOnHover: true,
     icon: false,
};

export const showToast = {
     success: (message: string, options?: ToastOptions) => {
          toast.success(message, {
               ...defaultOptions,
               ...options,
               style: {
                    background: "#368467",
                    color: "#ffffff",
               },
          });
     },

     error: (message: string, options?: ToastOptions) => {
          toast.error(message, {
               ...defaultOptions,
               ...options,
               style: {
                    background: "#dc2626",
                    color: "#ffffff",
               },
          });
     },
};
