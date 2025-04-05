import { AnalyzerData, ApiErrorResponse } from '@/types/aiTypes';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

export const useAnalyzeCode = () => {
    return useMutation({
        mutationFn: sendCode,
        onError: (error: AxiosError<ApiErrorResponse>) => {
            console.log(error);
        }
    })
}

export const sendCode = async (code: AnalyzerData) => {
    console.log(code)
    const response = await axios.post("http://localhost:3000/api/review", code);
    return response.data;
}

