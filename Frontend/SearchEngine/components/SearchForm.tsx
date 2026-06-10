import { useState } from "react";

const LANGUAGES = ['English', 'French', 'Arabic', 'Amazigh', 'Turkish'];

interface SearchFormProps {
    onSubmit: (topic: string, language: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit }) => {
    const [topic, setTopic] = useState('');
    const [language, setLanguage] = useState('English');

    const handleSubmit = () => {
        if (!topic.trim()) return;
        onSubmit(topic, language);
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
};

export default SearchForm;