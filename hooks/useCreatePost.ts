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
    const queryClient = useQueryClient();

    return useMutation<PostResponse, Error, CreatePostVariables>({
        mutationFn: async ({ title, content }) => {
            return await apiClient("/posts/create", {
                method: 'POST',
                body: JSON.stringify({ title, content }),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts'],
            });
        }
    });
};
