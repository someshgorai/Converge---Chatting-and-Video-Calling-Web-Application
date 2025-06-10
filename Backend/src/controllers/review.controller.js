import Review from "../models/Review.js";

export const submitReview = async (req, res) => {
  const userId = req.user._id;
  const { rating, feedback } = req.body;

  if (!rating) {
    return res.status(400).json({ message: "Rating is required." });
  }

  if (!feedback) {
    return res.status(400).json({ message: "Feedback is required." });
  }

  try {
    let review = await Review.findOne({ user: userId });

    if (review) {
      // If user has already submitted a review, update it
      review.rating = rating;
      review.feedback = feedback;
      await review.save();
      return res.status(200).json({ message: "Review updated", review });
    }

    // Create new review
    review = await Review.create({
      user: userId,
      rating,
      feedback,
    });

    res.status(201).json({ message: "Review submitted", review });
  } catch (err) {
    console.error("Error submitting review:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
