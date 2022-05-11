import React from 'react';
import './styles/ReviewsScreen.css';
import Reviews from '../components/Reviews';
import { RouteComponentProps } from 'react-router-dom';

const ReviewsScreen: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <main className="reviews_screen_container">
      <Reviews match={match} isScreen={true} />
    </main>
  );
};

export default ReviewsScreen;
