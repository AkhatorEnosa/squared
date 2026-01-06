export interface PostType {
    id: string;
    title: string;
    content: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    imageUrl?: string;
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