export type Resource = {
    title:       string;
    url:         string;
    type:        'video' | 'article' | 'course' | 'research_paper' | 'book' | 'website';
    cost:        'free' | 'paid' | 'freemium';
    description: string;
}