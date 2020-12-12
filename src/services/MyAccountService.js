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

  diary = (movieID, userID, titleID) => {
    return this.service
      .post(`/account/mydiary/${movieID}?${titleID}`, { movieID, userID, titleID })
      .then((response) => response.data);
  };

  remove =  (movieID, userID) => {
    return this.service
      .post(`/myaccount/activity/${movieID}/remove`, {movieID, userID})
      .then((response) => response.data);
  };



 



  getUser = (userID) => {
    return this.service.get(`/getUser/${userID}`, {userID})
    .then(response => response.data)
  }
}

export default MyAccountServices;
