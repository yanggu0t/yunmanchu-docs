import { client } from '@/lib/client';

export const getAllReviews = async () => {
  const res = await client.reviews.all.$get();
  const reviews = await res.json();
  return reviews;
};
