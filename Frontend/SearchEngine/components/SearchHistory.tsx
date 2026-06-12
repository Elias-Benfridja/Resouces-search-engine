import type { History } from "../types/types";

interface SearchHistoryProps {
  history: History[];
  onHistoryClick: (topic: string, language: string) => void;
  onClear: () => void;
}

const SearchHistoryComponent: React.FC<SearchHistoryProps> = ({
  history,
  onHistoryClick,
  onClear,
}) => {
  if (history.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Recent Searches
        </p>
        <button
          onClick={onClear}
          className="text-xs text-red-400 hover:text-red-600 transition-colors"
        >
          Clear
        </button>
      </div>
      {history.map((item, index) => (
        <button
          key={index}
          onClick={() => onHistoryClick(item.topic, item.language)}
          className="flex items-center gap-2 text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors group"
        >
          <span className="text-gray-400 group-hover:text-blue-500 transition-colors">
            🕐
          </span>
          <div className="flex flex-col">
            <span className="text-sm text-gray-700 font-medium capitalize">
              {item.topic}
            </span>
            <span className="text-xs text-gray-400">{item.language}</span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SearchHistoryComponent;
