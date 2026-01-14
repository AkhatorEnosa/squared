import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "../services/apiClient";

const useDeletePost = () => {
    const queryClient = useQueryClient()
  
    return useMutation({
        mutationFn: async(id: string | number) => {
            return await apiClient(`/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts'],
            })
        },
        onError: (error) => {
            console.log("Failed to delete", error)
        }
    })
}

export default useDeletePost