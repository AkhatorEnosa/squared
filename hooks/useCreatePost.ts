import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../services/apiClient";

// 1. Define the shape of your input variables
type CreatePostVariables = FormData

// 2. Define the shape of your server response (optional but recommended)
interface PostResponse {
    id: string;
    title: string;
    content: string;
    imgUrl?: string | null;
    createdAt: string;
}

export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation<PostResponse, Error, CreatePostVariables>({
        mutationFn: async (formData : FormData) => {
            return await apiClient("/posts/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts'],
            });
        }
    });
};
