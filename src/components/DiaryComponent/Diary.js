import React from "react";

import DiaryService from "../../services/DiaryService";
import { Button } from "react-bootstrap";

class Diary extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      diary: [],
      allDiary: [],
      allMovies: [],
      fullDiary: [],
  }

  };

  service = new DiaryService();

  componentDidMount() {
    this.service
      .getDiary(this.props.isLogged._id)
      .then((response) => {
        this.setState({
          diary: [...response],
        });
        const movieIDOnly = response.map(function (diary) {
          return diary.movieID;
        });
        this.setState({ allDiary: movieIDOnly });

        this.myDiaryMovies();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  myDiaryMovies = () => {
    const myDiaryMoviesMap = this.state.allDiary.map((_id) => {
      return fetch(
        `${process.env.REACT_APP_BASEURL}/${_id}?api_key=${process.env.REACT_APP_KEY}&language=en-US`
      )
        .then((data) => {
          return data.json();
        })
        .then((dataJSON) => {
          console.log(dataJSON);

          return dataJSON;
        });
    });

    Promise.all(myDiaryMoviesMap).then((result) => {
      console.log(result);
      this.setState({ allMovies: result });
      this.getFullDiaryMovies();
    });
  };

  renderMyDiaryMovies = () => {
    return this.state.allMovies.map((allMovies, index) => {
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${allMovies.poster_path}`;
      return (
        <div>
          <div key={index}>
            <h3>{allMovies.original_title}</h3>

            <img src={poster} alt={allMovies.original_title} />
          </div>
        </div>
      );
    });
  };

  getFullDiaryMovies = () => {
    let diaryArr = this.state.diary;
    let movieArr = this.state.allMovies;
    let fullDiaryMovies = [];
    diaryArr = diaryArr.sort((a, b) => a._id - b._id);
    movieArr = movieArr.sort((a, b) => a._id - b._id);
    console.log(diaryArr);
    console.log(movieArr);
    console.log(diaryArr.length);
    for (let i = 0; i < diaryArr.length; i++) {
      fullDiaryMovies[i] = {
        date: diaryArr[i].date,
        movieID: diaryArr[i].movieID,
        notes: diaryArr[i].notes,
        place: diaryArr[i].place,
        people: diaryArr[i].people,
        title: movieArr[i].title,
        original_title: movieArr[i].original_title,
        poster_path: movieArr[i].poster_path,
      };
      console.log(diaryArr[i]);
    }
    console.log(fullDiaryMovies);
    console.log(this.state.allDiary.id)
    this.setState({ fullDiary: fullDiaryMovies });
  };


  renderMyDiary = (props) => {
    return this.state.fullDiary.map((fullDiary, index) => {
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${fullDiary.poster_path}`;

      return (
        <div key={index}>
          <div key={index}>
            <img src={poster} alt={fullDiary.original_title} />

            <p>{fullDiary.title}</p>
            <p>{fullDiary.movieID}</p>
            <p>{fullDiary.date}</p>
            <p>{fullDiary.place}</p>
            <p>{fullDiary.people}</p>
            <p>{fullDiary.notes}</p>
            <Button
            href={`/myaccount/diary/:id/remove`}
            variant="outline-success"
          >
         Remove
          </Button>{" "}
            <div>
          
        </div>

          </div>
        </div>
      );
    });
  };


  render() {
    return (
      <div>
        <h2>Welcome, {this.props.isLogged.username}</h2>
        {/* {this.renderMyDiaryMovies()} */}
        {this.renderMyDiary()}
        {/* {this.renderDetails()} */}
        {/* {this.state.allFavourites.length > 0 && this.renderMyFavourites()}
        {/* {this.state.allWatchlist.length > 0 && this.renderMyWatchlist()}
        {this.state.allActivity.length > 0 && this.renderMyActivity()} */}
      </div>
    );
  }
}

export default Diary;
