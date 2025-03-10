import { Bounce, Id, toast, ToastOptions } from "react-toastify";

export class Notifications {

    static configurations: ToastOptions<unknown> | undefined = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition: Bounce
    }

    static info = (message: string) => toast.info(message, this.configurations)
    static success = (message: string) => toast.success(message, this.configurations)
    static error = (message: string) => toast.error(message, this.configurations)
    static warn = (message: string) => toast.warn(message, this.configurations)
    static clear = (id?: Id) => toast.dismiss(id)


}