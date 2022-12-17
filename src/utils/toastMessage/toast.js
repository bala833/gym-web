import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export function ToastMessage(messageType, message, position = "top-right") {
  const controlToast = {
    position: position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  switch (messageType) {
    case "success":
      return toast.success(message, controlToast);
    case "error":
      return toast.error(message, controlToast);
    case "warn":
      return toast.warn(message, controlToast);
  }
}
