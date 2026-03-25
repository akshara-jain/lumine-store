import { 
  useGetCart, 
  useAddToCart, 
  useUpdateCartItem, 
  useRemoveCartItem, 
  getGetCartQueryKey 
} from "@workspace/api-client-react";
import { getSessionId } from "@/lib/session";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export function useCart() {
  const sessionId = getSessionId();
  return useGetCart({ sessionId }, { query: { enabled: !!sessionId, retry: 1 } });
}

export function useCartMutations() {
  const queryClient = useQueryClient();
  const sessionId = getSessionId();
  const { toast } = useToast();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: getGetCartQueryKey({ sessionId }) });
  };

  const add = useAddToCart({ 
    mutation: { 
      onSuccess: () => {
        invalidate();
        toast({
          title: "Added to Cart",
          description: "Item successfully added to your bag.",
        });
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to add item to cart. Please try again.",
        });
      }
    } 
  });
  
  const update = useUpdateCartItem({ 
    mutation: { onSuccess: invalidate } 
  });
  
  const remove = useRemoveCartItem({ 
    mutation: { onSuccess: invalidate } 
  });

  return {
    addToCart: (productId: number, quantity: number = 1) => 
      add.mutate({ data: { sessionId, productId, quantity } }),
    updateQuantity: (cartItemId: number, quantity: number) => 
      update.mutate({ cartItemId, data: { sessionId, quantity } }),
    removeItem: (cartItemId: number) => 
      remove.mutate({ cartItemId }),
    isAdding: add.isPending,
    isUpdating: update.isPending,
    isRemoving: remove.isPending
  };
}
