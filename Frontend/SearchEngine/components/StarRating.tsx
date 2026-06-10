import { useState, useEffect } from 'react';
import { fetchRating, submitRating } from '../services/api';

interface StarRatingProps {
    resource_url:   string;
    resource_title: string;
}

const StarRating: React.FC<StarRatingProps> = ({ resource_url, resource_title }) => {
    const [average,    setAverage]    = useState(0);
    const [count,      setCount]      = useState(0);
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [isLocked,   setIsLocked]   = useState(false);
    const [isLoading,  setIsLoading]  = useState(true);

    useEffect(() => {
        // Check if already rated this session
        const ratedUrls = JSON.parse(localStorage.getItem('rated_urls') || '[]');
        if (ratedUrls.includes(resource_url)) {
            setIsLocked(true);
        }

        // Fetch existing average
        const loadRating = async () => {
            try {
                const data = await fetchRating(resource_url);
                setAverage(data.average);
                setCount(data.count);
            } catch {
                // No ratings yet, keep defaults
            } finally {
                setIsLoading(false);
            }
        };

        loadRating();
    }, [resource_url]);

    const handleClick = async (star: number) => {
        if (isLocked) return;

        setUserRating(star);
        setIsLocked(true);

        // Save to localStorage
        const ratedUrls = JSON.parse(localStorage.getItem('rated_urls') || '[]');
        localStorage.setItem('rated_urls', JSON.stringify([...ratedUrls, resource_url]));

        try {
            await submitRating(resource_url, resource_title, star);
            // Refresh average after submitting
            const data = await fetchRating(resource_url);
            setAverage(data.average);
            setCount(data.count);
        } catch {
            // Silently fail — user already sees their selected stars
        }
    };

    const displayRating = hoverRating || userRating || average;

    if (isLoading) return <p className="text-xs text-gray-400">Loading ratings...</p>;

    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                    <button
                        key={star}
                        onClick={() => handleClick(star)}
                        onMouseEnter={() => !isLocked && setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className={`text-xl transition-colors ${
                            star <= displayRating
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                        } ${!isLocked ? 'hover:scale-110' : 'cursor-default'}`}
                    >
                        ★
                    </button>
                ))}
                <span className="text-xs text-gray-400 ml-1">
                    {count > 0 ? `${average.toFixed(1)} (${count})` : 'No ratings yet'}
                </span>
            </div>
            {isLocked && userRating > 0 && (
                <p className="text-xs text-green-500">Thanks for rating!</p>
            )}
        </div>
    );
};

export default StarRating;