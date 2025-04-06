export interface HistoryEntry {
    id?: string;
    prompt: string;
    response?: string;
    timestamp?: string;
}

export const history: HistoryEntry[] = [];