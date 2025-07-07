import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Reviews.css"; 


const ProductReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async () => {
    if (!userName || !reviewTitle || !reviewText) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/reviews", {
        name: userName,
        rating: selectedRating,
        title: reviewTitle,
        text: reviewText,
      });

      if (response.status === 201) {
        alert("Review submitted successfully!");
        fetchReviews(); // Refresh reviews
        closeModal();
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    }
  };

  const renderStaticStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <div className="review-container">
      {/* Rating Summary */}
      <div className="rating-summary">
        <div>
          <span className="rating-score">
            {reviews.length > 0
              ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
              : "N/A"}
          </span>
          <span className="stars">⭐⭐⭐⭐⭐</span>
          <p className="review-count">Based on {reviews.length} reviews</p>
        </div>
        <button className="write-review-btn" onClick={openModal}>
          Write a Review
        </button>
      </div>

      {/* Dynamic Reviews List */}
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <div className="review-header">
              <img
                src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${review.name}`}
                alt="User"
                className="user-img"
              />
              <div>
                <p className="user-name">{review.name}</p>
                <span className="stars">{renderStaticStars(review.rating)}</span>
                <p className="review-text">
                  <strong>{review.title}</strong> <br />
                  {review.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Write a Review</h2>
            <label>Your Name *</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input-field"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            <label>Rating *</label>
            <div className="stars-container">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= selectedRating ? "star selected" : "star"}
                  onClick={() => setSelectedRating(star)}
                >
                  ★
                </span>
              ))}
              <span className="rating-text">
                {selectedRating === 5
                  ? "Excellent"
                  : selectedRating === 4
                  ? "Very Good"
                  : selectedRating === 3
                  ? "Good"
                  : selectedRating === 2
                  ? "Fair"
                  : "Poor"}
              </span>
            </div>

            <input
              type="text"
              placeholder="Title"
              className="input-field"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
            />
            <textarea
              placeholder="Your review..."
              className="input-field"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <div className="modal-buttons">
              <button className="cancel-btn" onClick={closeModal}>
                Cancel
              </button>
              <button className="submit-btn" onClick={handleSubmit}>
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
