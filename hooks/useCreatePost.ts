import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../services/apiClient";

// 1. Define the shape of your input variables
interface CreatePostVariables {
    title: string;
    content: string;
}

// 2. Define the shape of your server response (optional but recommended)
interface PostResponse {
    id: string;
    title: string;
    content: string;
    createdAt: string;
}


export const useCreatePost = () => {
    const queryClient = useQueryClient()

    return useMutation<PostResponse, Error, CreatePostVariables>({
        mutationFn: async ({ title, content }) => {
            const response = await apiClient("/posts/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to create post');
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts'],
            })
        }
    })
}