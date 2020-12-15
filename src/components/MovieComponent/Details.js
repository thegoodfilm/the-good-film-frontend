import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Details.css";
import {
  Card,
  Nav,
  Col,
  Row,
  Container,
  Media,
  Accordion,
} from "react-bootstrap";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import MyAccountService from "../../services/MyAccountService";
import DiaryService from "../../services/DiaryService";
import ReviewService from "../../services/ReviewService";

import { Button } from "react-bootstrap";

class Details extends React.Component {
  state = {
    details: [],
    key: "",
    genre: "",
    videoName: "",
    cast: [],
    providers: [],
    providerDefaultURL: "",
    defaultMessage: "No information available",
    message: "",
    allReviews: [],
  };

  service = new MyAccountService();
  serviceDiary = new DiaryService();
  serviceReview = new ReviewService();

  addToMyFavourites = () => {
    this.service
      .favourites(this.props.match.params.id, this.props.isLogged._id)
      .then((result) => {
        this.setState({ message: result.message });

        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addToMyActivity = () => {
    this.service
      .activity(this.props.match.params.id, this.props.isLogged._id)
      .then((result) => {
        this.setState({ message: result.message });

        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addToMyWatchlist = () => {
    this.service
      .watchlist(this.props.match.params.id, this.props.isLogged._id)
      .then((result) => {
        this.setState({ message: result.message });

        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addToMyDiary = () => {
    this.serviceDiary
      .diary(this.props.match.params.id, this.props.isLogged._id)
      .then((result) => {
        this.setState({ message: result.message });

        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderButtons = () => {
    if (this.props.isLogged._id) {
      return (
        <div class="details-box">
          <Button
            onClick={() => this.addToMyFavourites()}
            variant="outline-success"
          >
            Favourites
          </Button>{" "}
          <Button
            onClick={() => this.addToMyWatchlist()}
            variant="outline-success"
          >
            Watchlist
          </Button>{" "}
          <Button
            href={`/myaccount/diary/${this.state.details.id}/form`}
            variant="outline-success"
          >
            Add to Diary
          </Button>{" "}
        </div>
      );
    } else {
      return (
        <div class="details-box">
          <Button href="/signup" variant="secondary">
            Sign up
          </Button>{" "}
          <Button href="/login" variant="secondary">
            Log in
          </Button>{" "}
        </div>
      );
    }
  };

  addReviewBtn = () => {
    if (this.props.isLogged._id) {
      return (
        <div>
          <Button href={`/review/${this.state.details.id}/form`}>
            Add review
          </Button>
        </div>
      );
    } else {
      return (
        <div class="info-message">
          <span>You have to be logged to add a review</span>

          <div>
            <Button href="/signup" variant="secondary">
              Sign up
            </Button>{" "}
            <Button href="/login" variant="secondary">
              Log in
            </Button>{" "}
          </div>
        </div>
      );
    }
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
    console.log(this.state.details);

    this.serviceReview
      .getReview(this.props.match.params.id)
      .then((response) => {
        console.log(this.props.match.params.id);
        console.log(response);
        this.setState({
          allReviews: [...response],
        });
        // const movieIDOnly = response.map(function (diary) {
        //   return diary.movieID;
        // });
        // this.setState({ allDiary: movieIDOnly });

        // this.myDiaryMovies();
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(
      `${process.env.REACT_APP_BASEURL}/${this.props.match.params.id}?api_key=${process.env.REACT_APP_KEY}&append_to_response=videos`
    )
      .then((data) => {
        console.log(this.props.match.params.id);

        return data.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);

        this.setState({
          details: dataJSON,
        });
      })

      .catch((err) => {
        console.log(err);
      });
    fetch(
      `${process.env.REACT_APP_BASEURL}/${this.props.match.params.id}?api_key=${process.env.REACT_APP_KEY}&append_to_response=videos`
    )
      .then((data) => {
        return data.json();
      })
      .then((dataJSON) => {
        if (dataJSON.videos.length === 0) {
          this.setState({
            key: this.state.defaultMessage,
          });
        } else {
          this.setState({
            key: dataJSON.videos.results[0].key,
          });
        }
      })

      .catch((err) => {
        console.log(err);
      });
    fetch(
      `${process.env.REACT_APP_BASEURL}/${this.props.match.params.id}?api_key=${process.env.REACT_APP_KEY}&append_to_response=videos`
    )
      .then((data) => {
        return data.json();
      })
      .then((dataJSON) => {
        if (dataJSON.genres.length === 0) {
          this.setState({
            genre: this.state.defaultMessage,
          });
        } else {
          this.setState({
            genre: dataJSON.genres[0].name,
          });
        }
      })

      .catch((err) => {
        console.log(err);
      });

    fetch(
      `${process.env.REACT_APP_BASEURL}/${this.props.match.params.id}?api_key=${process.env.REACT_APP_KEY}&append_to_response=videos`
    )
      .then((data) => {
        return data.json();
      })
      .then((dataJSON) => {
        if (dataJSON.video.length === 0) {
          this.setState({
            videoName: this.state.defaultMessage,
          });
        } else {
          this.setState({
            videoName: dataJSON.videos.results[0].name,
          });
        }
      })

      .catch((err) => {
        console.log(err);
      });

    fetch(
      `${process.env.REACT_APP_BASEURL}/${this.props.match.params.id}/credits?api_key=${process.env.REACT_APP_KEY}&language=en-US`
    )
      .then((dataCast) => {
        //console.log(dataCast.json())
        return dataCast.json();
      })
      .then((dataJSON) => {
        this.setState({
          cast: dataJSON.cast,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(
      `${process.env.REACT_APP_BASEURL}/${this.props.match.params.id}/watch/providers?api_key=${process.env.REACT_APP_KEY}`
    )
      .then((dataProvider) => {
        return dataProvider.json();
      })
      .then((dataJSON) => {
        if (dataJSON.results.length === 0) {
          this.setState({
            providers: this.state.defaultMessage,
          });
        } else {
          this.setState({
            providers: dataJSON.results.ES.flatrate,
          });
        }
      })

      .catch((err) => {
        console.log(err);
      });

    fetch(
      `${process.env.REACT_APP_BASEURL}/${this.props.match.params.id}/watch/providers?api_key=${process.env.REACT_APP_KEY}`
    )
      .then((dataProviderDefault) => {
        //console.log(dataCast.json())
        return dataProviderDefault.json();
      })
      .then((dataJSON) => {
        if (dataJSON.results.length === 0) {
          this.setState({
            providerDefaultURL: this.state.defaultMessage,
          });
        } else {
          this.setState({
            providerDefaultURL: dataJSON.results.ES.link,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderDetailsTitle = () => {
    const poster = `${process.env.REACT_APP_BASEURLPOSTER}${this.state.details.poster_path}`;

    return (
      <div class="details-box">
        <div>
          <Media>
            <img
              width={187}
              height={286}
              className="mr-3"
              src={poster}
              alt="Generic placeholder"
            />
            <Media.Body>
              <h5>{this.state.details.title}</h5>
              <p>
                Release date: <span>{this.state.details.release_date}</span>
              </p>
              <p>Overview: {this.state.details.overview}</p>
              <p>Score: {this.state.details.vote_average}</p>
              <p>Genre: {this.state.genre}</p>
            </Media.Body>
          </Media>
        </div>
      </div>
    );
  };

 

 

  renderDetailsVideoName = () => {
    console.log(this.state.key);
    return (
      <div>
        <div>
          <div class="details-box">
            <h2>{this.state.videoName}</h2>
          </div>
        </div>
        <div class="details-box video-container">
          <p>{this.state.videoName}</p>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${this.state.key}`}
          />
        </div>
      </div>
    );
  };

  renderCastPoster = () => {
    return this.state.cast.map((cast, index) => {
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${cast.profile_path}`;
      if(cast.profile_path === null){
        return (
          <Link to={`/details/actors/${cast.id}`} key={index} >
          <div class="details-box">
            <Media>
              <img
                width={74}
                height={84}
                className="mr-3"
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw4QDxAPEBAQFQ8ODQ0PDxAPDQ8QDhAQFRIXFhUSExMYHiggGBolGxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAgEH/8QAMRABAQABAQUGBAYDAQEAAAAAAAECAwQRITFBBVFhcYGREqGx0SIyQlJiwZLh8RUU/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APsgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOM9THHnZPOg7FXPb9Od98p90d7Sn7b7wF4UZ2lj1xvvKlw27TvWzzgLI5xyl4yyzw4ugAAAAAAAAAAAAAAAAAAAAEerq44zflfvXG07RMJ328oydTUuV328QWdfbsrwx4T5qlu/m8AAAAAdYZ2XfLZfCruh2heWf+U5+sUAG9jlLN8u+XrHTF2faMsLw5dZ0rX0dXHOb5/uXuB2AAAAAAAAAAAAAAAAj19WYY3K9OU773JGTt+t8WW6cseHr1BBqalytt51wAAAAAAAAAPUuza9wy39OsQgN/Gy8Zys3yih2brc8L54/3GgAAAAAAAAAAAAAACLaNT4cMr3Th5sRp9qZ/hxnfd/t/wBZgAAAAAAAAAAAAO9LP4cpl3WVuS7+PewGzsWW/Tx8Ju9gTgAAAAAAAAAAAAAze1bxx8r9VFf7VnHHyv1UAAAAAAAAAAAAAGp2ZfweWd+kZbU7Mn4L45X6QFwAAAAAAAAAAAAAFLtTHfjL3Xd7/wDGY29o0/iwyx75w9OMYgAAAAAAAAAAAADZ2LHdp4+M3+/Fk6WHxZTHvu5uTlPIHoAAAAAAAAAAAAADJ2/R+HLf0y4+vWNZHr6UzxuN9L3UGGOtTC42y845AAAAAAAAABNs2hc8t3SfmvdAWuzNH9d8p/daDzHGSSTlOT0AAAAAAAAAAAAAAB49AQbVs0zn8pyv9Vk6mFxu6zdW441tLHObsp955Awxb19hyx448Z8/ZVsB4AAAAOsMbbuktvgu7PsF55+0vH1oKuhoZZ3dOXW9I19HSmE3T18fF1hjJN0nB0AAAAAAAAAAAAAAAAAAAPKhz2vTn6t/lxBO41NLHLnJfTj7qefaU6Y31u5Fl2jn0mM9wWcuz8Ly3zy/24vZs/ff8Va7bqd/yjn/AOvU/dfkC3OzZ1yvpJEmnsOnOct879lCbXqfuvtHU27U757QGrhhJwk3Tu3OmZj2jl1mN8t8TYdo49ZZ8wXRDp7ThlyynleF+aYAAAAAAAAAAAAAAAc55zGb7d0Z+vt9vDDhO/r6dwLurrY4/mvp19lLW7Rt4Yzd43jfZSt38/m8B3nqZZc7a4AAAAAAAAABLpa+ePK+nOeyIBo6PaE/VN3jj9l3DUmU3yysF1hnZd8tl8AbwobPt85Z8P5Tl6r2N38ZyB6AAAAAAAAg2naccPHLpPuj2za/g4T83082XlbbvvOg71tXLO77fLunkjAAAAAAAAAAAAAAAAABPs205YcuM6y8kADb0dbHOb56zrErC0tS43fLxa+zbRM5v6znATAAAAK22bT8E3T815eHil19WYY3K+k76xdTO5W286Dy3fxeAAAAAAAAAAAAAAAAAAAAAA70tS42ZTnHADb0NaZzfPWd1SsXZta4Zb+nWd8bOOUslnKzgD0AGTt2v8WW6flx4TxvWqoAAAAAAAAAAAAAAAAAAAAAAAAAL/Zuv+i+eP2UHWOVllnOXfAbr1n/APo/x+YDPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k="
                alt="Generic placeholder"
              />
              <Media.Body>
                <h5 >{cast.name}</h5>
                <p>{cast.character}</p>
              </Media.Body>
            </Media>
            {/* <img src={poster} alt={cast.name} /> */}
          </div>
        </Link>
        )
      } else {
        return (
          <Link to={`/details/actors/${cast.id}`} key={index}>
            <div class="details-box">
              <Media>
                <img
                  width={74}
                  height={84}
                  className="mr-3"
                  src={poster}
                  alt="Generic placeholder"
                />
                <Media.Body>
                  <h5>{cast.name}</h5>
                  <p>{cast.character}</p>
                </Media.Body>
              </Media>
              {/* <img src={poster} alt={cast.name} /> */}
            </div>
          </Link>
        );
      }
      
    });
  };

  renderCastName = () => {
    return this.state.cast.map((cast, index) => {
      return (
        <Link to={`/details/actors/${cast.id}`} key={index}>
          <div>
            <h3>{cast.name}</h3>
          </div>
        </Link>
      );
    });
  };

  renderCastCharacter = () => {
    return this.state.cast.map((cast, index) => {
      return (
        <Link to={`/details/actors/${cast.id}`} key={index}>
          <div>
            <p>{cast.character}</p>
          </div>
        </Link>
      );
    });
  };

  renderProvidersLogo = () => {
    return this.state.providers.map((providers, index) => {
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${providers.logo_path}`;
      return (
        <div>
          <Link
            to={{ pathname: `${this.state.providerDefaultURL}` }}
            target="_blank"
          >
            <img src={poster} alt="logo-img" />
          </Link>
        </div>
      );
    });
  };

  render() {
    return (
      <div name="top">
        {this.renderDetailsTitle()}

        {/* {this.renderDetailsPoster()}

        {this.renderDetailsReleaseDate()}

        {this.renderDetailsOverview()}

        {this.renderDetailsScore()}

        {this.renderDetailsGenre()} */}

        <div class="info-message">
          <p>{this.state.message}</p>
        </div>

        {this.renderButtons()}
        {/* {this.renderProvidersLogo()}
        {this.state.providers} */}

        {this.renderDetailsVideoName()}
        {/* <div class="details-box">
          <h2>Reviews:</h2>

          {this.addReviewBtn()}
        </div> */}

        <div class="review-box">
          <Accordion defaultActiveKey="0">
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey="0">
                Reviews
              </Accordion.Toggle>
              <Accordion.Collapse class="accordion-reviews" eventKey="0">
                <Card.Body>
                  <div class="info-message">
                    <p>{this.state.message}</p>
                    <p>
                      Lorem Ipsum is simply dummy text of the simply dummy text
                      of the printing simply dummy text of the printing simply
                      dummy text of the printing simply dummy text of the
                      printing simply dummy text of the printing simply dummy
                      text of the printing simply dummy text of the printing
                      simply dummy text of the printing simply dummy text of the
                      printing printing and typesetting industry. Lorem Ipsum
                      has been the industry's standard dummy text ever since the
                      1500s, when an unknown printer took a galley of type and
                      scrambled it to make a type specimen book. It has survived
                      not only five centuries, but also the leap into electronic
                      typesetting, remaining essentially unchanged. It was
                      popularised in the 1960s with the release of Letraset
                      sheets containing Lorem Ipsum passages, and more recently
                      with desktop publishing software like Aldus PageMaker
                      including versions of Lorem Ipsum.
                    </p>
                  </div>

                  {this.addReviewBtn()}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>

        {this.renderCastPoster()}

        {/* {this.renderCastName()}

        {this.renderCastCharacter()} */}
     
      </div>
    );
  }
}

export default Details;
