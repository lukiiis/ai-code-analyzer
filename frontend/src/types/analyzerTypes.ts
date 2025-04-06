export interface AnalyzerData {
    code: string,
}

export interface AnalyzerResponse {
    message: string,
    timestamp: string,
}

export interface ApiErrorResponse {
    error: string,
}

export interface HistoryEntry {
    id: string;
    prompt: string;
    response: string;
    timestamp: string;
}