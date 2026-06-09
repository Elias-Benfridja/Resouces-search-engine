import { Resource } from "../types/resource";

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

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
    return (
        <div className="border rounded-xl p-4 flex flex-col gap-2 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <span className="text-lg">{TYPE_ICONS[resource.type]}</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${COST_COLORS[resource.cost]}`}>
                    {resource.cost}
                </span>
            </div>
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 hover:underline"
            <a>
                {resource.title}
            </a>
            <p className="text-sm text-gray-500">{resource.description}</p>
            <span className="text-xs text-gray-400 capitalize">{resource.type.replace('_', ' ')}</span>
        </div>
    );
};

export default ResourceCard;