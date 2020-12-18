import axios from "axios";

class MyAccountServices {
  constructor() {
    let service = axios.create({
      baseURL: "https://thegoodfilm.herokuapp.com",
      // baseURL: "http://localhost:3000",
      withCredentials: true,
    });
    this.service = service;
  }

  favourites = (movieID, userID) => {
    return this.service
      .post("/myaccount/favourites", { movieID, userID })
      .then((response) => response.data)
      .catch((err) => console.error(err));
  };

  watchlist = (movieID, userID) => {
    return this.service
      .post("/myaccount/watchlist", { movieID, userID })
      .then((response) => response.data)
      .catch((err) => console.error(err));
  };

  getUser = (userID) => {
    return this.service
      .get(`/getUser/${userID}`, { userID })
      .then((response) => response.data)
      .catch((err) => console.error(err));
  };
}

export default MyAccountServices;
