export interface PostType {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    featured: boolean;
    imageUrl?: string;
    publishedAt?: Date;
    featuredAt?: Date;
    tags?: string[];
    isPublished: boolean;
    author: {
        id: string;
        name: string;
        profile?: {
            userImageUrl?: string;
        };
    };
    reactions: {
        find(arg0: (reaction: any) => boolean): unknown;
        some(arg0: (reaction: any) => boolean): unknown;
        type: string;
        userId: string;
    };
    _count: {
        reactions: number;
    };
}