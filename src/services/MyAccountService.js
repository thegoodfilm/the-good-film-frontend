import axios from "axios";

class MyAccountServices {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:3000",
      withCredentials: true,
    });

    this.service = service;
  }

  favourites = (movieID, userID) => {
    return this.service
      .post("/myaccount/favourites", { movieID, userID })
      .then((response) => response.data);
  };

  watchlist = (movieID, userID) => {
    return this.service
      .post("/myaccount/watchlist", { movieID, userID })
      .then((response) => response.data);
  };

  activity = (movieID, userID) => {
    return this.service
      .post("/myaccount/activity", { movieID, userID })
      .then((response) => response.data);
  };

  myList = (movieID, userID) => {
    return this.service
      .post("/myaccount/mylists", { movieID, userID })
      .then((response) => response.data);
  };

  myProfile = (userID) => {
    return this.service
      .get(`/myaccount/myprofile/`, { userID })
      .then((response) => response.data);
  };
}

export default MyAccountServices;
