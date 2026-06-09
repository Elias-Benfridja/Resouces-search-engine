import { useState } from 'react';
import type { Resource } from '../types/resource';
import SearchForm from '../components/SearchForm';
import ResourceList from '../components/ResourceList';

const App = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
                STEM Resource Finder
            </h1>
            <div className="flex gap-8 max-w-7xl mx-auto">

                {/* Left — Search Form */}
                <div className="w-1/4 flex flex-col gap-4">
                    <SearchForm
                        onResults={setResources}
                        onLoading={setLoading}
                        onError={setError}
                    />
                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}
                    {loading && (
                        <p className="text-gray-400 text-sm animate-pulse">
                            Fetching resources...
                        </p>
                    )}
                </div>

                {/* Right — Results */}
                <div className="w-3/4">
                    {resources.length === 0 && !loading ? (
                        <p className="text-gray-400 text-center mt-20">
                            Search for a topic to get started
                        </p>
                    ) : (
                        <ResourceList resources={resources} />
                    )}
                </div>

            </div>
        </div>
    );
};

export default App;