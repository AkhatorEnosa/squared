import { useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../services/apiClient";

export const useGetUser = () => {
    const queryClient = useQueryClient();

    // Fetch user profile
    const useUser = () => {
        return useQuery({
            queryKey: ["user"],
            queryFn: async () => apiClient("/profile"),
            initialData: null,
            refetchOnReconnect: true,
            // refetchIntervalInBackground: true,
            // retry: 3,
        })
    }

    const invalidateUser = () => {
        queryClient.invalidateQueries(["user"]);
    };

    return { useUser, invalidateUser };
}