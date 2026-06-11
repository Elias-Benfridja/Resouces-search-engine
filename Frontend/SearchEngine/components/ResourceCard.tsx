import { useState } from 'react';
import type { Resource } from '../types/types';
import StarRating from './StarRating';
import ChatBox from './ChatBox';

interface ResourceCardProps {
    resource: Resource;
}

const TYPE_ICONS: Record<Resource['type'], string> = {
    video:          '🎥',
    article:        '📄',
    course:         '🎓',
    research_paper: '🔬',
    book:           '📚',
    website:        '🌐',
};

const COST_COLORS: Record<Resource['cost'], string> = {
    free:     'bg-green-100 text-green-700',
    paid:     'bg-red-100 text-red-700',
    freemium: 'bg-yellow-100 text-yellow-700',
};

const ResourceCard = ({ resource }: ResourceCardProps) => {
    const [copied, setCopied] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(resource.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="border rounded-xl p-4 flex flex-col gap-2 hover:shadow-md transition-shadow bg-white">
            <div className="flex items-center justify-between">
                <span className="text-lg">{TYPE_ICONS[resource.type]}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${COST_COLORS[resource.cost]}`}>
                    {resource.cost}
                </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-blue-600 hover:underline"
                >
                    {resource.title}
                </a>
                <button
                    onClick={handleCopy}
                    className="text-xs text-gray-400 hover:text-gray-600 transition-colors shrink-0"
                >
                    {copied ? '✅ Copied' : '📋 Copy'}
                </button>
            </div>

            <p className="text-sm text-gray-500">{resource.description}</p>
            <span className="text-xs text-gray-400 capitalize">{resource.type.replace('_', ' ')}</span>

            <StarRating
                resource_url={resource.url}
                resource_title={resource.title}
            />

            <button
                onClick={() => setIsOpen(!isOpen)}
                className="mt-2 text-xs text-blue-500 hover:text-blue-700 transition-colors text-left"
            >
                {isOpen ? '▲ Hide chat' : '▼ Ask about this resource'}
            </button>

            {isOpen && (
                <ChatBox resource={resource} />
            )}
        </div>
    );
};

export default ResourceCard;