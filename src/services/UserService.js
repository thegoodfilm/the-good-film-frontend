import axios from "axios";
import { createBrowserHistory } from 'history';

export const browserHistory = createBrowserHistory();
class UserService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:3000",
      withCredentials: true,
    });
    this.service = service;
  }

  signup = (name, lastName, username, email, password) => {
    return this.service
      .post("/signup", { name, lastName, username, email, password })
      .then((response) => response.data);
  };

  login = (email, password) => {
    return this.service
      .post("/login", { email, password })
      .then((response) => response.data)
  
      
  };

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
}

export default UserService;
