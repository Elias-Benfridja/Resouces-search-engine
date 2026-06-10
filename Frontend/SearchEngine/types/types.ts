export type Resource = {
    title:       string;
    url:         string;
    type:        'video' | 'article' | 'course' | 'research_paper' | 'book' | 'website';
    cost:        'free' | 'paid' | 'freemium';
    description: string;
}

export type Rating = {
    resource_url: string;
    resource_title: string;
    stars: number
}

export type RatingStats = {
    average: number;
    count:   number;
}

export type History = {
    topic:    string;
    language: string;
}

