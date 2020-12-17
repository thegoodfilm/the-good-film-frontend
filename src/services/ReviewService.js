import axios from "axios";

class ReviewService {
  constructor() {
    let service = axios.create({
      baseURL: "https://thegoodfilm.herokuapp.com",
      // baseURL: "http://localhost:3000",
      withCredentials: true,
    });
    this.service = service;
  }



  
  review = (movieID, reviewText, username, userID) => {
    console.log("soy service review");

    return this.service
      .post(`/details/${movieID}`, {
        movieID,

        reviewText,
        username,
        userID,
      })
      .then((response) => { 
        console.log(response.data)
        return response.data })
      
      .catch((err) => console.error(err));
  };

  getReviewNoOnCinemas = (movieID) => {
    console.log('soy getreview holiii')
    console.log(movieID)
 

    return this.service

      .get(`/details/${movieID}`, {movieID})
      .then((response) => response.data )
      
      .catch((err) => console.error(err));
  };
}

export default ReviewService;
