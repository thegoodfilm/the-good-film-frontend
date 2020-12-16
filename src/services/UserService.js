import axios from "axios";
import { createBrowserHistory } from 'history';

export const browserHistory = createBrowserHistory();
class UserService {
  constructor() {
    let service = axios.create({
      baseURL: "https://thegoodfilm.herokuapp.com",
      withCredentials: true,
    });
    this.service = service;
  }

  signup = (name, lastName, username, email, password) => {
    return this.service
      .post("/signup", { name, lastName, username, email, password })
      .then((response) => response.data)
      .catch(err => console.error(err))

  };

  login = (email, password) => {
    return this.service
      .post("/login", { email, password })
      .then((response) => response.data)
      .catch(err => console.error(err))

      
  };

  // diary = (movieID, date, place, people, notes, userID) => {
  //   console.log('soy service diary')
  //   return this.service


  
  //     .post(`/myaccount/diary/:id/form`, { movieID, date, place, people, notes, userID })
  //     .then((response) => response.data)
  //     .catch(err => console.error(err))

  // };

  logOut = () => {
    this.service
      .logout()
      .then((result) => {
        console.log(result);
        this.checkIfLoggedIn();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  loggedin = () => {
    return this.service.get("/loggedin").then((response) => response.data);
  };

  logout = () => {
    return this.service.post("/logout", {}).then((response) => response.data);
  };


  getUser = (userID) => {
    return this.service.get(`/getUser/${userID}`, {userID})
    .then(response => response.data)
    .catch(err => console.error(err))

}


}


export default UserService;
