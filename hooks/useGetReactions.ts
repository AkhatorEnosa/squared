import { useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../services/apiClient";

export const useGetReactions = () => {
    const queryClient = useQueryClient();

    // Fetch posts
    const usePostReactions = (postId : string) => {
        return useQuery({
            queryKey: ["postReactions", postId],
            queryFn: async () => apiClient(`/posts/reactions/${postId}`),
            initialData: [],
            refetchOnReconnect: true,
            refetchIntervalInBackground: true,
            retry: 1,
        })
    }

    const invalidateReactions = (postId: string) => {
        queryClient.invalidateQueries({ queryKey: ["postReactions", postId] });
    };

    return { usePostReactions, invalidateReactions };
}