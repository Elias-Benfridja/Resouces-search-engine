import type { Resource } from '../types/types';

const TYPES: Resource['type'][] = ['video', 'article', 'course', 'research_paper', 'book', 'website'];
const COSTS: Resource['cost'][] = ['free', 'paid', 'freemium'];

interface FilterBarProps {
    selectedTypes: Resource['type'][];
    selectedCosts: Resource['cost'][];
    onTypeToggle: (type: Resource['type']) => void;
    onCostToggle: (cost: Resource['cost']) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ selectedTypes, selectedCosts, onTypeToggle, onCostToggle }) => {
    return (
        <div className="flex flex-col gap-4">
            <div>
                <p className="text-sm font-semibold text-gray-600 mb-2">Type</p>
                <div className="flex flex-wrap gap-2">
                    {TYPES.map(type => (
                        <button
                            key={type}
                            onClick={() => onTypeToggle(type)}
                            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                                selectedTypes.includes(type)
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                            }`}
                        >
                            {type.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <p className="text-sm font-semibold text-gray-600 mb-2">Cost</p>
                <div className="flex flex-wrap gap-2">
                    {COSTS.map(cost => (
                        <button
                            key={cost}
                            onClick={() => onCostToggle(cost)}
                            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                                selectedCosts.includes(cost)
                                    ? 'bg-blue-600 text-white border-blue-600'
                                    : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'
                            }`}
                        >
                            {cost}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterBar;