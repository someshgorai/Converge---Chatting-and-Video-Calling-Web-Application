import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import useReview from "../hooks/useReview";

const ReviewSection = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const { reviewMutation, isPending, error } = useReview();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a star rating");
      return;
    }

    reviewMutation(
      { rating, feedback },
      {
        onSuccess: () => {
          toast.success("Review submitted successfully!");
          setRating(0);
          setHoverRating(0);
          setFeedback("");
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || "Submission failed");
        },
      }
    );
  };

  useEffect(() => {
    if (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }, [error]);

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
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="textarea textarea-bordered h-24 text-black"
            placeholder="Tell others about your experience"
            required
          />
        </div>

        <button
          type="submit"
          className={`bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white ${
            isPending ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ReviewSection;
