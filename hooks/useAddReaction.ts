import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../services/apiClient";

// Define the type to match your Prisma Enum
export type ReactionType = 'LIKE' | 'LOVE' | 'WOW' | 'SAD' | 'ANGRY';

interface ReactionPayload {
  postId: string;
  type: ReactionType;
}

const useAddReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ postId, type }: ReactionPayload) => {
      return await apiClient(`/posts/react/${postId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }), 
      });
    },
    
    // OPTIONAL: Optimistic Update logic
    onMutate: async (newReaction) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // Snapshot the previous value
      const previousPosts = queryClient.getQueryData(['posts']);

      // Optimistically update to the new value
      // (Note: This logic depends on your exact data structure from the findMany query)
      return { previousPosts };
    },

    onSuccess: () => {
      // Refresh the posts list to ensure counts are synced with the DB
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
    
    onError: (error, variables, context) => {
      console.error("Failed to react:", error);
      // Rollback to the previous state if mutation fails
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
    }
  });
};

export default useAddReaction;