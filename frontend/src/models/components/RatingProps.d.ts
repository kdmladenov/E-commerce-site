interface RatingProps {
  rating: number | undefined;
  setRating?: Dispatch<SetStateAction<number>>;
  text?: string;
  color?: string;
  editMode?: boolean;
}
export default RatingProps;
