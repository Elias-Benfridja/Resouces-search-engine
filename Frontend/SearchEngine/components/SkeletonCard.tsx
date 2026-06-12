const SkeletonCard = () => {
    return (
        <div className="border rounded-xl p-4 flex flex-col gap-3 bg-white animate-pulse">
            <div className="flex items-center justify-between">
                <div className="h-4 w-4 bg-gray-200 rounded" />
                <div className="h-4 w-12 bg-gray-200 rounded-full" />
            </div>
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
            <div className="h-3 w-full bg-gray-200 rounded" />
            <div className="h-3 w-1/2 bg-gray-200 rounded" />
        </div>
    );
};

export default SkeletonCard;