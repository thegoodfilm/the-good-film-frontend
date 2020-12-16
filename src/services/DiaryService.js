import axios from "axios";

class DiaryService {
  constructor() {
    let service = axios.create({
      baseURL: "https://thegoodfilm.herokuapp.com",
      withCredentials: true,
    });
    this.service = service;
  }


  diary = (movieID, date, place, people, notes, userID) => {
    console.log("soy service diary");
    return this.service
      .post(`/myaccount/diary/${movieID} `, {
        movieID,
        date,
        place,
        people,
        notes,
        userID,
      })
      .then((response) => response.data)
      .catch((err) => console.error(err));
  };

  getDiary = () => {
    return this.service
      .get(`/myaccount/diary/`, {})
      .then((response) => response.data)
      .catch((err) => console.error(err));
  };


}

export default DiaryService;
