import axios from "axios";


export function handleAxiosError(error: unknown): string{
    if(axios.isAxiosError(error)){
        return error.response?.data?.message || "Something went Wrong"
    }

    return "Unexpected Error Occurred"
}