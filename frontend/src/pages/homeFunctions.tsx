import { AnalyzerData, ApiErrorResponse, HistoryEntry } from '@/types/analyzerTypes';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

export const useAnalyzeCode = () => {
    return useMutation({
        mutationFn: sendCode,
        onError: (error: AxiosError<ApiErrorResponse>) => {
            console.log(error);
        }
    });
};

export const useGetHistory = () => {
    return useQuery<HistoryEntry[]>({
        queryKey:['promptHistory'],
        queryFn: getHistory
    });
}


const sendCode = async (code: AnalyzerData) => {
    const response = await axios.post("http://localhost:3000/api/review", code);
    return response.data;
}

const getHistory = async () => {
    const response = await axios.get("http://localhost:3000/api/history");
    return response.data;
}