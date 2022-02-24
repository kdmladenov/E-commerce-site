import React from 'react';
import './styles/ReviewsScreen.css';
import Reviews from '../components/Reviews';

const ReviewsScreen = ({ match }) => {
  return (
    <main className="reviews_screen_container">
      <Reviews match={match} isScreen={true}/>
    </main>
  );
};

export default ReviewsScreen;
