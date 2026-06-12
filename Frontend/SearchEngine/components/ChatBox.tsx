import { useState } from "react";
import type { Resource } from "../types/types";
import { askQuestion } from "../services/api";

interface ChatBoxProps {
    resource: Resource;
}

const ChatBox: React.FC<ChatBoxProps> = ({ resource }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAsk = async () => {
        if (!question.trim()) return;

        setLoading(true);
        setError(null);
        setAnswer(null);

        try {
            const result = await askQuestion(question, resource);
            setAnswer(result);
            setQuestion('')
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 border-t pt-6 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-gray-700">Ask about these resources</h3>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="e.g. Which resource is best for beginners?"
                    className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAsk();
                    }}
                />
                <button
                    onClick={handleAsk}
                    disabled={loading}
                    className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Asking...' : 'Ask'}
                </button>
            </div>

            {error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}

            {answer && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{answer}</p>
                </div>
            )}
        </div>
    );
};

export default ChatBox;