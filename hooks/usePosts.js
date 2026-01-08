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
            refetchOnWindowFocus: true,
            retry: 3,
        })
    }
    

    const invalidatePosts = () => {
        queryClient.invalidateQueries(["posts"]);
    };

    return { useGetPosts, invalidatePosts };
}