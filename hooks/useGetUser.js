import { useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../services/apiClient";

export const useGetUser = () => {
    const queryClient = useQueryClient();

    // Fetch user profile
    const useUser = () => {
        return useQuery({
            queryKey: ["userProfile"],
            queryFn: async () => apiClient("/profile"),
            initialData: null,
            refetchOnReconnect: true,
            // refetchIntervalInBackground: true,
            // retry: 3,
        })
    }

    const invalidatePosts = () => {
        queryClient.invalidateQueries(["posts"]);
    };

    return { useUser, invalidatePosts };
}