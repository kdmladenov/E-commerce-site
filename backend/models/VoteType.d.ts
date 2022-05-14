interface VoteType {
  userId: number;
  fullName: string;
  questionId?: number;
  reviewId?: number;
  reactionId: number;
  reactionName: string;
}

export default VoteType