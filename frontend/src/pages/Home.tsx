import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronRight, Code, Laptop, Loader2, History, CalendarDays } from "lucide-react";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnalyzerData, AnalyzerResponse, ApiErrorResponse } from "@/types/analyzerTypes";
import { useAnalyzeCode, useGetHistory } from "./homeFunctions";
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';

const Home = () => {
    const [response, setResponse] = useState<AnalyzerResponse | null>(null);
    const [activeTab, setActiveTab] = useState<string>("code");
    const [selectedHistoryItem, setSelectedHistoryItem] = useState<string | null>(null);

    const { data: historyData, isLoading: historyLoading, refetch: refetchHistory } = useGetHistory();

    const analyzerForm = useForm<AnalyzerData>({
        defaultValues: {
            code: "",
        },
    });

    const analyzerMutation = useAnalyzeCode();

    const onSubmit: SubmitHandler<AnalyzerData> = async (data) => {
        if (!data.code.trim()) {
            toast.error("Error", {
                description: "Please enter some code to analyze",
            });
            return;
        }

        analyzerMutation.mutate(data, {
            onSuccess: (data: AnalyzerResponse) => {
                toast.success("Success", {
                    description: "Successfully generated feedback",
                });
                setResponse({
                    message: data.message,
                    timestamp: data.timestamp
                });
                setActiveTab("analysis");
                refetchHistory();
                analyzerForm.reset();
            },
            onError: (error: AxiosError<ApiErrorResponse>) => {
                toast.error("Error", {
                    description: error.response?.data?.error || "Something went wrong",
                });
            },
        });
    };

    const loadHistoryItem = (prompt: string, response: string, timestamp: string) => {
        analyzerForm.setValue("code", prompt);
        setResponse({
            message: response,
            timestamp: timestamp,
        });
        setSelectedHistoryItem(prompt);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 to-slate-900 p-4 sm:p-6">
            <Toaster
                theme="dark"
                position="top-right"
                toastOptions={{
                    style: {
                        background: 'hsl(218, 23%, 15%)',
                        border: '1px solid hsl(218, 23%, 23%)',
                        color: 'hsl(218, 23%, 90%)'
                    },
                    className: "rounded-md shadow-lg",
                }}
            />
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-6xl"
            >
                <Card className="border-slate-800 bg-slate-950/50 backdrop-blur-sm shadow-lg">
                    <CardHeader className="border-b border-slate-800 pb-4">
                        <div className="flex items-center space-x-2">
                            <Code className="h-6 w-6 text-indigo-400" />
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                AI Code Analyzer
                            </CardTitle>
                        </div>
                        <CardDescription className="text-slate-400">
                            Submit your TypeScript or JavaScript code for AI-powered analysis and feedback
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <Tabs defaultValue="code" value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="flex flex-wrap h-full">
                                <TabsTrigger value="code" className="data-[state=active]:bg-indigo-500/20 w-36">
                                    <Laptop className="h-4 w-4 mr-2" /> Code Input
                                </TabsTrigger>
                                <TabsTrigger value="analysis" className="data-[state=active]:bg-indigo-500/20 w-36">
                                    <ChevronRight className="h-4 w-4 mr-2" /> Analysis Result
                                </TabsTrigger>
                                <TabsTrigger value="history" className="data-[state=active]:bg-indigo-500/20 w-36">
                                    <History className="h-4 w-4 mr-2" /> History
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="code" className="space-y-4">
                                <form onSubmit={analyzerForm.handleSubmit(onSubmit)}>
                                    <Textarea
                                        {...analyzerForm.register("code")}
                                        placeholder="Paste your TypeScript or JavaScript code here..."
                                        className="min-h-[300px] font-mono text-sm bg-slate-900 border-slate-700 text-slate-200 focus-visible:ring-indigo-500"
                                        spellCheck="false"
                                    />
                                    <div className="flex justify-end mt-4">
                                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            <Button
                                                type="submit"
                                                disabled={analyzerMutation.isPending}
                                                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                                            >
                                                {analyzerMutation.isPending ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                                                    </>
                                                ) : (
                                                    "Analyze Code"
                                                )}
                                            </Button>
                                        </motion.div>
                                    </div>
                                </form>
                            </TabsContent>
                            <TabsContent value="analysis">
                                <AnimatePresence mode="wait">
                                    {response ? (
                                        <motion.div
                                            key="response"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Card className="border border-slate-800 bg-slate-950/50 shadow-lg">
                                                <CardHeader className="pb-2 border-b border-slate-800">
                                                    <div className="flex items-center justify-between">
                                                        <CardTitle className="text-lg text-indigo-300 flex items-center">
                                                            <ChevronRight className="h-5 w-5 mr-2 text-indigo-400" />
                                                            Analysis Results
                                                        </CardTitle>
                                                        <div className="flex space-x-2">
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => {
                                                                    navigator.clipboard.writeText(response.message);
                                                                    toast.success("Copied to clipboard");
                                                                }}
                                                                className="text-xs h-8 px-2 text-slate-400 hover:text-indigo-300 hover:bg-slate-800/60"
                                                            >
                                                                Copy All
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="ghost"
                                                                onClick={() => setActiveTab("code")}
                                                                className="text-xs h-8 px-2 text-slate-400 hover:text-indigo-300 hover:bg-slate-800/60"
                                                            >
                                                                Back to Code
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="p-0">
                                                    <div className="rounded-md bg-slate-900/60 backdrop-blur-sm overflow-hidden">
                                                        <div className="p-4 md:p-6 overflow-auto max-w-none text-sm leading-relaxed text-slate-300 font-mono" style={{ fontFamily: 'Consolas, monospace' }}>
                                                            <ReactMarkdown
                                                                remarkPlugins={[remarkGfm]}
                                                            >
                                                                {response.message}
                                                            </ReactMarkdown>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                                <CardFooter className="flex justify-between border-t border-slate-800 pt-3 pb-2">
                                                    <div className="text-xs text-slate-500">
                                                        {new Date(response.timestamp || Date.now()).toLocaleString()}
                                                    </div>
                                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                        <Button
                                                            size="sm"
                                                            onClick={() => setActiveTab("code")}
                                                            className="text-sm bg-gradient-to-r from-indigo-500/80 to-purple-600/80 hover:from-indigo-500 hover:to-purple-600"
                                                        >
                                                            Edit Code & Reanalyze
                                                        </Button>
                                                    </motion.div>
                                                </CardFooter>
                                            </Card>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="empty"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex flex-col items-center justify-center p-10 text-center bg-slate-900/20 rounded-lg border border-dashed border-slate-800 min-h-[300px]"
                                        >
                                            <Code className="h-12 w-12 text-slate-600 mb-3" />
                                            <p className="text-slate-500 max-w-md">
                                                No analysis yet. Submit your code to see AI-powered feedback and suggestions here.
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </TabsContent>
                            <TabsContent value="history">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card className="border border-slate-800 bg-slate-950/50 shadow-lg">
                                            <CardHeader className="pb-2 border-b border-slate-800">
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="text-lg text-indigo-300 flex items-center">
                                                        <History className="h-5 w-5 mr-2 text-indigo-400" />
                                                        Analysis History
                                                    </CardTitle>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-0">
                                                <div className="rounded-md bg-slate-900/60 backdrop-blur-sm overflow-hidden">
                                                    {historyLoading ? (
                                                        <div className="flex items-center justify-center p-8">
                                                            <Loader2 className="h-8 w-8 text-indigo-400 animate-spin" />
                                                        </div>
                                                    ) : historyData && historyData.length > 0 ? (
                                                        <div className="divide-y divide-slate-800">
                                                            {historyData.map((item, index) => (
                                                                <div
                                                                    key={item.id || index}
                                                                    className={`p-4 transition-colors cursor-pointer ${selectedHistoryItem === item.prompt ? 'bg-slate-800/40' : ''}`}
                                                                    onClick={() => loadHistoryItem(item.prompt, item.response, item.timestamp)}
                                                                >
                                                                    <div className="flex justify-between items-start mb-2">
                                                                        <div className="flex items-center">
                                                                            <Code className="h-4 w-4 text-indigo-400 mr-2" />
                                                                            <span className="font-medium text-slate-300">Analysis #{historyData.length - index}</span>
                                                                        </div>
                                                                        <div className="flex items-center text-xs text-slate-500">
                                                                            <CalendarDays className="h-3 w-3 mr-1" />
                                                                            {new Date(item.timestamp || Date.now()).toLocaleString()}
                                                                        </div>
                                                                    </div>
                                                                    <div className="line-clamp-2 text-xs text-slate-400 font-mono bg-slate-800/30 p-2 rounded border">
                                                                        {item.prompt}
                                                                    </div>
                                                                    <div className="flex justify-end mt-2">
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="sm"
                                                                            className="h-7 text-xs text-indigo-300 hover:bg-slate-800/60"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                loadHistoryItem(item.prompt, item.response, item.timestamp);
                                                                                setActiveTab("analysis");
                                                                            }}
                                                                        >
                                                                            <ArrowUpRight className="h-3 w-3 mr-1" />
                                                                            View Analysis
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center p-10 text-center">
                                                            <History className="h-12 w-12 text-slate-600 mb-3" />
                                                            <p className="text-slate-500 max-w-md">
                                                                No analysis history yet. Submit some code to build your history.
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </AnimatePresence>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default Home;