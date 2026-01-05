import { useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../services/apiClient";

export const usePosts = () => {
    const queryClient = useQueryClient();

    // Fetch posts
    const useGetPosts = () => {
        return useQuery({
            queryKey: ["posts"],
            queryFn: async () => apiClient("/posts"),
            initialData: [],
            refetchOnReconnect: true,
            refetchIntervalInBackground: true,
            retry: 1,
        })
    }

    const invalidatePosts = () => {
        queryClient.invalidateQueries(["posts"]);
    };

    return { useGetPosts, invalidatePosts };
}