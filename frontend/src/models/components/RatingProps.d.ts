interface RatingProps {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  text: string;
  color: string;
  editMode: boolean;
}
export default RatingProps;
