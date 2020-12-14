import axios from "axios";

class ReviewService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:3000",
      withCredentials: true,
    });
    this.service = service;
  }

  review = (movieID, reviewText, userID) => {
    console.log("soy service review");
    return this.service
      .post(`/review/:id/form`, {
        movieID,

        reviewText,
        userID,
      })
      .then((response) => response.data)
      .catch((err) => console.error(err));
  };

  getReview = (movieID) => {
    console.log('soy getreview holiii')
    console.log(movieID)

    return this.service
      .get(`/review/:id`, {movieID})
      .then((response) => response.data)
      .catch((err) => console.error(err));
  };
}

export default ReviewService;
