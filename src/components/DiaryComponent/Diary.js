import React from "react";
import "../../styles/Diary.css";
import { Col, Container, Row, Jumbotron, Card, Spinner } from "react-bootstrap";
import "../../styles/MyAccount.css";

import DiaryService from "../../services/DiaryService";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom";

class Diary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diary: [],
      allDiary: [],
      allMovies: [],
      fullDiary: [],
    };
  }

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
    console.log(this.state.allDiary.id);
    this.setState({ fullDiary: fullDiaryMovies });
  };

  renderMyDiary = (props) => {
    return this.state.fullDiary.map((fullDiary, index) => {
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${fullDiary.poster_path}`;
      if (
        fullDiary.poster_path === null ||
        fullDiary.poster_path === undefined
      ) {
        return (
          <div className="diary-details-style details-box-diary ">
            <Link
              className="link-diary"
              style={{ textDecoration: "none" }}
              to={`/details/${fullDiary.movieID}`}
              key={index}
              name="top"
            >
              <Media>
                <img
                  width={264}
                  height={364}
                  className="mr-3"
                  src="../../../poster_default.png"
                  alt={fullDiary.original_title}
                />
                <Media.Body>
                  <h5>{fullDiary.title}</h5>
                  <p>Date: {fullDiary.date} </p>
                  <p>Place: {fullDiary.place}</p>
                  <p>Watched with: {fullDiary.people}</p>
                  <p>Notes: {fullDiary.notes}</p>
                </Media.Body>
              </Media>
            </Link>
          </div>
        );
      } else {
        return (
          <div className="diary-details-style details-box-diary ">
            <Link
              className="link-diary"
              style={{ textDecoration: "none" }}
              to={`/details/${fullDiary.movieID}`}
              key={index}
              name="top"
            >
              <Media>
                <img
                  width={264}
                  height={364}
                  className="mr-3"
                  src={poster}
                  alt={fullDiary.original_title}
                />
                <Media.Body>
                  <h5>{fullDiary.title}</h5>
                  <p>Date: {fullDiary.date} </p>
                  <p>Place: {fullDiary.place}</p>
                  <p>Watched with: {fullDiary.people}</p>
                  <p>Notes: {fullDiary.notes}</p>
                </Media.Body>
              </Media>
            </Link>
          </div>
        );
      }
    });
  };

  messageIfAnyDiaryFind = () => {
    return (
      <div className="diary-details-style details-box-diary ">
        <div className="welcome">
          <h1>Welcome to your diary {this.props.isLogged.username}</h1>
          <br></br>
          <p>You don't have any diary log.</p>
        </div>
      </div>
    );
  };

  
  render() {
    return (
      <div name="top" className="myaccount-box">
        {this.state.diary.length !== 0
          ? <div>
            <Container>
            <Row className="justify-content-md-center">
                  <Col>
                    <Jumbotron fluid>
                      <Container>
                        <h1>MY DIARY</h1>
                      </Container>
                    </Jumbotron>
                  </Col>
                </Row>
              {this.renderMyDiary()}{" "}
            </Container>
            </div>
          : <div>
            <Container>
            <Row className="justify-content-md-center">
                  <Col>
                    <Jumbotron fluid>
                      <Container>
                        <h1>MY DIARY</h1>
                      </Container>
                    </Jumbotron>
                  </Col>
                </Row>
             {this.messageIfAnyDiaryFind()}{" "}
            </Container>
            </div>}
      </div>
    );
  }
}

export default Diary;

