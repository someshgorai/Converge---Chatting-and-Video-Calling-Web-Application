import { useState } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import useAuthUser from "../hooks/useAuthUser";

const ReviewSection = () => {
    const { authUser } = useAuthUser();

    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [formState, setFormState] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            toast.error("Please select a star rating!");
            return;
        }

        setIsSubmitting(true);
        // TODO: Link with backend

    };

    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">Leave a Review</h3>
            <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
                {/* Star Rating */}
                <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={24}
                            className={`cursor-pointer transition ${
                                (hoverRating || rating) >= star ? "text-yellow-400" : "text-gray-500"
                            }`}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                            fill={(hoverRating || rating) >= star ? "#facc15" : "none"}
                        />
                    ))}
                </div>

                {/* Feedback Textarea */}
                <div className="form-control">
                    <textarea
                        name="feedback"
                        value={formState.feedback}
                        onChange={(e) =>
                            setFormState({ ...formState, feedback: e.target.value })
                        }
                        className="textarea textarea-bordered h-24 text-black"
                        placeholder="Tell others about your experience"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={`bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default ReviewSection;
