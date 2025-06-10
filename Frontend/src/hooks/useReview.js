import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitReview } from "../lib/api.js";

const useReview = () => {
    const queryClient = useQueryClient();

    const { mutate: reviewMutation, isPending, error } = useMutation({
        mutationFn: submitReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
    });

    return { reviewMutation, isPending, error };
};

export default useReview;
