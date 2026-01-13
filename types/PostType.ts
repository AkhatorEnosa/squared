export interface PostType {
    id: string;
    title: string;
    content: string;
    authorId: string;
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
}