import { useState } from 'react';
import type { Resource } from '../types/resource';
import ResourceCard from './ResourceCard';
import FilterBar from './FilterBar';

interface ResourceListProps {
    resources: Resource[];
}

const ResourceList: React.FC<ResourceListProps> = ({ resources }) => {
    const [selectedTypes, setSelectedTypes] = useState<Resource['type'][]>([]);
    const [selectedCosts, setSelectedCosts] = useState<Resource['cost'][]>([]);

    const handleTypeToggle = (type: Resource['type']) => {
        setSelectedTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const handleCostToggle = (cost: Resource['cost']) => {
        setSelectedCosts(prev =>
            prev.includes(cost)
                ? prev.filter(c => c !== cost)
                : [...prev, cost]
        );
    };

    const filteredResources = resources.filter(resource => {
        const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(resource.type);
        const costMatch = selectedCosts.length === 0 || selectedCosts.includes(resource.cost);
        return typeMatch && costMatch;
    });

    return (
        <div className="flex flex-col gap-6">
            <FilterBar
                selectedTypes={selectedTypes}
                selectedCosts={selectedCosts}
                onTypeToggle={handleTypeToggle}
                onCostToggle={handleCostToggle}
            />
            <div className="grid grid-cols-2 gap-4">
                {filteredResources.map((resource, index) => (
                    <ResourceCard key={index} resource={resource} />
                ))}
            </div>
        </div>
    );
};

export default ResourceList;