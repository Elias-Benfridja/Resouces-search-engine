import { useState } from "react";
import type { Resource, History } from "../types/types";
import SearchForm from "../components/SearchForm";
import ResourceList from "../components/ResourceList";
import SearchHistoryComponent from "../components/SearchHistory";
import SkeletonCard from "../components/SkeletonCard";
import { fetchResources } from "../services/api";

const App = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [searchedTopic, setSearchedTopic] = useState("");
  const [searchedLanguage, setSearchedLanguage] = useState("");
  const [history, setHistory] = useState<History[]>(() => {
    return JSON.parse(localStorage.getItem("search_history") || "[]");
  });

  const handleSearch = async (topic: string, language: string) => {
    setSearched(true);
    setLoading(true);
    setError(null);
    setSearchedTopic(topic);
    setSearchedLanguage(language);

    const updated = [
      { topic, language },
      ...history.filter(
        (item) => !(item.topic === topic && item.language === language),
      ),
    ].slice(0, 5);
    setHistory(updated);
    localStorage.setItem("search_history", JSON.stringify(updated));

    try {
      const results = await fetchResources(topic, language.toLowerCase());
      setResources(results);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <nav className="bg-gray-900 text-white px-6 py-4">
        <h1 className="text-lg font-semibold tracking-wide">
          STEM Resource Finder
        </h1>
      </nav>

      <div className="flex flex-col md:flex-row flex-1">
        <aside className="w-full md:w-64 bg-white border-r border-gray-200 p-6 flex flex-col gap-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Resource Filter</h2>
            <p className="text-sm text-gray-400 mt-1">
              Find your next STEM resource
            </p>
          </div>

          <SearchForm onSubmit={handleSearch} />

          <SearchHistoryComponent
            history={history}
            onHistoryClick={handleSearch}
            onClear={() => {
              setHistory([]);
              localStorage.removeItem("search_history");
            }}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {loading && (
            <p className="text-blue-400 text-sm animate-pulse">
              Fetching resources...
            </p>
          )}
        </aside>

        <main className="flex-1 p-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : !searched ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="bg-blue-50 p-6 rounded-2xl">
                <span className="text-5xl">🔬</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-700">
                Ready to discover?
              </h2>
              <p className="text-gray-400 max-w-sm">
                Search for a topic to get started. Resources are sourced via AI
                across videos, courses, papers and more.
              </p>
            </div>
          ) : searched && resources.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <span className="text-5xl">🔍</span>
              <h2 className="text-2xl font-bold text-gray-700">
                No resources found
              </h2>
              <p className="text-gray-400 max-w-sm">
                No resources found for this topic in this language. Try another
                language.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2 mb-4 text-sm text-yellow-700">
                <span>⚠️</span>
                <p>Resources are AI-generated — verify links before use.</p>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Found{" "}
                <span className="font-semibold text-gray-700">
                  {resources.length} resources
                </span>{" "}
                for{" "}
                <span className="font-semibold text-gray-700">
                  {searchedTopic}
                </span>{" "}
                in{" "}
                <span className="font-semibold text-gray-700">
                  {searchedLanguage}
                </span>
              </p>
              <div className="flex flex-wrap gap-3 mb-4">
                {Object.entries(
                  resources.reduce(
                    (acc, r) => {
                      acc[r.type] = (acc[r.type] || 0) + 1;
                      return acc;
                    },
                    {} as Record<string, number>,
                  ),
                ).map(([type, count]) => (
                  <span
                    key={type}
                    className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                  >
                    {count} {type.replace("_", " ")}
                  </span>
                ))}
              </div>
              <ResourceList resources={resources} />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
