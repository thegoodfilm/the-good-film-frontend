import React from "react";
import "../../styles/Details.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Media, Form } from "react-bootstrap";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import MyAccountService from "../../services/MyAccountService";
import DiaryService from "../../services/DiaryService";
import ReviewService from "../../services/ReviewService";

import { Button } from "react-bootstrap";

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      showForm: false,
      showReviews: false,
      reviews: [],
      closeReviewButton: false,
    };
  }

  service = new MyAccountService();
  serviceDiary = new DiaryService();
  serviceReview = new ReviewService();

  getUpdatedReviews = (_eventTarget) => {
    this.setState({
      reviews: {
        ...this.state.reviews,
        [_eventTarget.name]: _eventTarget.value,
      },
    });
  };

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
            href={`/myaccount/diary/${this.props.match.params.id}`}
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
          {!this.state.showReviews && (
            <Button
              variant="outline-secondary"
              onClick={() => {
                this.handleReviews();
                this.setState({ showReviews: true, closeReviewButton: true });
              }}
            >
              Show reviews
            </Button>
          )}{" "}
          {this.state.showReviews && (
            <Button
              variant="outline-secondary"
              onClick={() => this.setState({ showReviews: false })}
            >
              Close
            </Button>
          )}{" "}
          <Button
            variant="outline-secondary"
            onClick={() => this.setState({ showForm: true })}
          >
            Add review
          </Button>{" "}
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

  // showReviewsBtn = () => {
  // return(
  //       <div>
  //         <Button onClick={() => this.setState({ showReviews: true })}>
  //           Show
  //         </Button>
  //       </div>
  // )
  // };

  componentDidMount() {
    this.serviceReview
      .getReviewNoOnCinemas(this.props.match.params.id)
      .then((response) => {
        this.setState({
          allReviews: [...response],
        });
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

  renderNowOnCinemasReviews = () => {
    return this.state.allReviews.map((allReviews, index) => {
      const formatDate = allReviews.date.slice(0, 10);
      return (
        <div>
          <div key={index}>
            <ul className="list-unstyled">
              <Media as="li">
                <Media.Body>
                  <h5>@{allReviews.username}</h5>
                  <p className="date">{formatDate}</p>
                  <p>{allReviews.reviewText}</p>
                </Media.Body>
              </Media>
            </ul>
          </div>
        </div>
      );
    });
  };

  handleReviews = () => {
    // this.setState({ showForm: false });
    console.log("soy before handle");
    this.serviceReview
      .getReviewNoOnCinemas(this.props.match.params.id)
      .then((response) => {
        console.log("soy handleReviews");
        this.setState({
          allReviews: [...response],
        });
        this.setState({ showForm: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  formReview = () => {
    return (
      <div>
        <div>
          <span className="info-message-review">{this.props.message}</span>
          <Form onSubmit={this.props.submitReviewForm}>
            <Form.Group controlId="formGridAddress2">
              <p>
                Please, type this code{" "}
                <span className="movieID-code">
                  {this.props.match.params.id}
                </span>{" "}
                in MovieID to confirm your review
              </p>

              <Form.Label>Movie ID:</Form.Label>
              <Form.Control
                type="text"
                value={this.props.newReview.movieID}
                name="movieID"
                onChange={(event) =>
                  this.props.changeHandlerReview(event.target)
                }
                placeholder="Type code"
              />
            </Form.Group>
            <Form.Group controlId="formGridAddress2">
              <Form.Label>Review:</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                name="reviewText"
                onChange={(event) =>
                  this.props.changeHandlerReview(event.target)
                }
                placeholder="Write comment"
              />
            </Form.Group>
            <Button
              variant="outline-secondary"
              onClick={() => {
                this.handleReviews();
              }}
              type="submit"
            >
              Submit
            </Button>{" "}
            <Button
              variant="outline-secondary"
              onClick={() => this.setState({ showForm: false })}
            >
              Cancel
            </Button>
          </Form>
        </div>
      </div>
    );
  };

  closeReviewsBtn = () => {
    return (
      <div>
        <Button onClick={() => this.setState({ showReviews: false })}>
          Close
        </Button>
      </div>
    );
  };
  renderDetailsTitle = () => {
    const poster = `${process.env.REACT_APP_BASEURLPOSTER}${this.state.details.poster_path}`;

    return (
      <div class="details-box intro">
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
              <h5 className="text-gainsboro">{this.state.details.title} </h5>
              <p>
                {" "}
                <img
                  className="star"
                  src="../../../kisspng-star-yellow-clip-art-football-star-5b1a130d853403.5302780815284354695456.png"
                />{" "}
                {this.state.details.vote_average}
              </p>
              <p className="text-gainsboro">
                Release date: <span>{this.state.details.release_date}</span>
              </p>
              <p className="text-gainsboro">Overview: {this.state.details.overview}</p>

              <p className="text-gainsboro">Genre: {this.state.genre}</p>
            </Media.Body>
          </Media>
        </div>
      </div>
    );
  };

  renderDetailsVideoName = () => {
    console.log(this.state.key);
    return (
      <div className="main-details-style-video">
        <div class="details-box">
          <h2 className="text-gainsboro">{this.state.videoName}</h2>
        </div>

        <div className="video-container">
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
      if (cast.profile_path === null) {
        return (
          <Link className="link" style={{ textDecoration: "none"}}  to={`/details/actors/${cast.id}`} key={index}>
            <div class="details-box">
              <Media>
                <img
                  width={74}
                  height={100}
                  className="mr-3"
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw4QDxAPEBAQFQ8ODQ0PDxAPDQ8QDhAQFRIXFhUSExMYHiggGBolGxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAgEH/8QAMRABAQABAQUGBAYDAQEAAAAAAAECAwQRITFBBVFhcYGREqGx0SIyQlJiwZLh8RUU/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APsgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOM9THHnZPOg7FXPb9Od98p90d7Sn7b7wF4UZ2lj1xvvKlw27TvWzzgLI5xyl4yyzw4ugAAAAAAAAAAAAAAAAAAAAEerq44zflfvXG07RMJ328oydTUuV328QWdfbsrwx4T5qlu/m8AAAAAdYZ2XfLZfCruh2heWf+U5+sUAG9jlLN8u+XrHTF2faMsLw5dZ0rX0dXHOb5/uXuB2AAAAAAAAAAAAAAAAj19WYY3K9OU773JGTt+t8WW6cseHr1BBqalytt51wAAAAAAAAAPUuza9wy39OsQgN/Gy8Zys3yih2brc8L54/3GgAAAAAAAAAAAAAACLaNT4cMr3Th5sRp9qZ/hxnfd/t/wBZgAAAAAAAAAAAAO9LP4cpl3WVuS7+PewGzsWW/Tx8Ju9gTgAAAAAAAAAAAAAze1bxx8r9VFf7VnHHyv1UAAAAAAAAAAAAAGp2ZfweWd+kZbU7Mn4L45X6QFwAAAAAAAAAAAAAFLtTHfjL3Xd7/wDGY29o0/iwyx75w9OMYgAAAAAAAAAAAADZ2LHdp4+M3+/Fk6WHxZTHvu5uTlPIHoAAAAAAAAAAAAADJ2/R+HLf0y4+vWNZHr6UzxuN9L3UGGOtTC42y845AAAAAAAAABNs2hc8t3SfmvdAWuzNH9d8p/daDzHGSSTlOT0AAAAAAAAAAAAAAB49AQbVs0zn8pyv9Vk6mFxu6zdW441tLHObsp955Awxb19hyx448Z8/ZVsB4AAAAOsMbbuktvgu7PsF55+0vH1oKuhoZZ3dOXW9I19HSmE3T18fF1hjJN0nB0AAAAAAAAAAAAAAAAAAAPKhz2vTn6t/lxBO41NLHLnJfTj7qefaU6Y31u5Fl2jn0mM9wWcuz8Ly3zy/24vZs/ff8Va7bqd/yjn/AOvU/dfkC3OzZ1yvpJEmnsOnOct879lCbXqfuvtHU27U757QGrhhJwk3Tu3OmZj2jl1mN8t8TYdo49ZZ8wXRDp7ThlyynleF+aYAAAAAAAAAAAAAAAc55zGb7d0Z+vt9vDDhO/r6dwLurrY4/mvp19lLW7Rt4Yzd43jfZSt38/m8B3nqZZc7a4AAAAAAAAABLpa+ePK+nOeyIBo6PaE/VN3jj9l3DUmU3yysF1hnZd8tl8AbwobPt85Z8P5Tl6r2N38ZyB6AAAAAAAAg2naccPHLpPuj2za/g4T83082XlbbvvOg71tXLO77fLunkjAAAAAAAAAAAAAAAAABPs205YcuM6y8kADb0dbHOb56zrErC0tS43fLxa+zbRM5v6znATAAAAK22bT8E3T815eHil19WYY3K+k76xdTO5W286Dy3fxeAAAAAAAAAAAAAAAAAAAAAA70tS42ZTnHADb0NaZzfPWd1SsXZta4Zb+nWd8bOOUslnKzgD0AGTt2v8WW6flx4TxvWqoAAAAAAAAAAAAAAAAAAAAAAAAAL/Zuv+i+eP2UHWOVllnOXfAbr1n/APo/x+YDPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k="
                  alt="Generic placeholder"
                />
                <Media.Body>
                  <h5>{cast.name}</h5>
                  <p>{cast.character}</p>
                  <br></br>
                  <br></br>
                </Media.Body>
              </Media>
              {/* <img src={poster} alt={cast.name} /> */}
            </div>
          </Link>
        );
      } else {
        return (
          <Link className="link" style={{ textDecoration: "none" }} to={`/details/actors/${cast.id}`} key={index}>
            <div class="details-box">
              <Media>
                <img
                  width={74}
                  height={100}
                  className="mr-3"
                  src={poster}
                  alt="Generic placeholder"
                />
                <Media.Body>
                  <h5>{cast.name}</h5>
                  <p>{cast.character}</p>
                  <br></br>
                  <br></br>
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
        <Link style={{ textDecoration: "none", color: "white" }} to={`/details/actors/${cast.id}`} key={index}>
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
        <Link style={{ textDecoration: "none" }} to={`/details/actors/${cast.id}`} key={index}>
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
            style={{ textDecoration: "none" }}
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
      <div name="top" className="main-details-style">
        {this.renderDetailsTitle()}

        <div className="buttons-section">
          <div class="info-message">
            <p>{this.state.message}</p>
          </div>
          <div className="render-btns">{this.renderButtons()}</div>
        </div>
        {this.renderDetailsVideoName()}

        <div class="main-details-style-reviews">
          {/* {this.state.showReviews && this.closeReviewsBtn()} */}
          {this.state.showForm && this.formReview()}
          {!this.state.showForm && this.addReviewBtn()}
        </div>
        {this.state.showReviews && this.renderNowOnCinemasReviews()}
<div>
{this.renderCastPoster()}
</div>
       
      </div>
    );
  }
}

export default Details;
