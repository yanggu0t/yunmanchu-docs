export type GoogleReview = {
  reviewId: string;
  reviewer: {
    profilePhotoUrl: string;
    displayName: string;
  };
  starRating: number;
  comment: string;
  createTime: string;
  updateTime: string;
  reviewReply?: {
    comment: string;
    updateTime: string;
  };
  name: string;
};

export type ReviewsResponse = {
  success: boolean;
  reviews: GoogleReview[];
  averageRating: number;
  totalReviewCount: number;
};
