export interface PostType {
    id: string;
    title: string;
    content: string;
    author: {
        id: string;
        name: string;
    };
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    imageUrl?: string;
    tags?: string[];
    isPublished: boolean;
}