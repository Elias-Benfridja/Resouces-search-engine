import { useState } from "react";
import { fetchResources } from "../services/api";
import type { Resource } from "../types/resource";

const LANGUAGES = ['English', 'French', 'Arabic', 'Amazigh', 'Turkish'];

interface SearchFormProps {
    onResults: (resources: Resource[]) => void;
    onLoading: (loading: boolean) => void;
    onError: (error: string | null) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onResults, onLoading, onError }) => {
    const [topic, setTopic] = useState('')
    const [language, setLanguage] = useState('ENGLISH')

    const handleSubmit = async () => {
        if(!topic.trim()){
            onError('Please enter a topic');
            return;
        }
        onLoading(true);
        onError(null);

        try {
            const resources = await fetchResources(topic, language.toLowerCase());
            onResults(resources);
        } catch (error) {
            onError(error instanceof Error ? error.message : 'Something went wrong');
        } finally {
            onLoading(false);
        }
    };
    return (
        <div className="flex flex-col gap-4">
            <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a STEM topic..."
                className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {LANGUAGES.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                ))}
            </select>
            <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
            >
                Find Resources
            </button>
        </div>
    );

}

export default SearchForm