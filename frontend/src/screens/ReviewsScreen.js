import React from 'react';
import Reviews from '../components/Reviews';
import './styles/ReviewsScreen.css';

const ReviewsScreen = ({ match }) => {
  return (
    <main className="reviews_screen_container">
      <Reviews match={match} isScreen={true}/>
    </main>
  );
};

export default ReviewsScreen;
