import axios from "axios";

class DiaryService {
  constructor() {
    let service = axios.create({
      baseURL: "http://localhost:3000",
      withCredentials: true,
    });
    this.service = service;
  }

  diary = (movieID, date, place, people, notes, userID) => {
    console.log("soy service diary");
    return this.service
      .post(`/myaccount/diary/:id/form`, {
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
