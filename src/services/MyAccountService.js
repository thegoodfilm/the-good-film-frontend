import axios from "axios";


class MyAccountServices {

  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:3000",
      withCredentials: true
    });


    this.service = service;
  }

  favourites = (movieID, userID) => {
    return this.service.post("/favourites", {movieID, userID})
    .then(response => response.data)
  }

  watchlist = (movieID, userID) => {
    return this.service.post("/watchlist", {movieID, userID})
    .then(response => response.data)
  }

  activity = (movieID, userID) => {
    return this.service.post("/activity", {movieID, userID})
    .then(response => response.data)
  }

  ratings = (movieID, userID) => {
    return this.service.post("/ratings", {movieID, userID})
    .then(response => response.data)
  }
  
  myProfile = (userID) => {
    return this.service.get(`/myprofile/${userID}`, {userID})
    .then(response => response.data)
  }

//   login = (username, password) => {
//     return this.service.post("/login", {username, password})
//     .then(response => response.data)
//   }

//   loggedin = () =>{
//     return this.service.get("/loggedin")
//     .then(response => response.data)
//   }

//   logout = () =>{
//     return this.service.post("/logout", {})
//     .then(response => response.data)
//   }
}

export default MyAccountServices;