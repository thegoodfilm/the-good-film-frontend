import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Details.css";
import { Card, Nav, Col, Row, Container, Media } from "react-bootstrap";
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
          <button onClick={() => this.addToMyFavourites()}>Favourites</button>
          <button onClick={() => this.addToMyWatchlist()}>Watchlist</button>
          <Button href={`/myaccount/diary/${this.state.details.id}/form`}>
            Add to Diary
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Log In</button>{" "}
          </Link>
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
        <div>
          <span>You have to be logged to add a review</span>
          <br />
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Log In</button>{" "}
          </Link>
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
    <p>Release date: <span>{this.state.details.release_date}</span></p>
            <p>Overview: {this.state.details.overview}</p>
            <p>Score: {this.state.details.vote_average}</p>
            <p>Genre: {this.state.genre}</p>
 
  </Media.Body>
</Media>
 </div>
       
      </div>
    );
  };

  // renderDetailsPoster = () => {
  //   const poster = `${process.env.REACT_APP_BASEURLPOSTER}${this.state.details.poster_path}`;

  //   return (
  //     <div>
  //       <img src={poster} alt={this.state.details.original_title} />
  //     </div>
  //   );
  // };

  // renderDetailsReleaseDate = () => {
  //   return (
  //     <div>
  //       <p>Release date: {this.state.details.release_date}</p>
  //     </div>
  //   );
  // };

  // renderDetailsOverview = () => {
  //   return (
  //     <div>
  //       <p>Overview: {this.state.details.overview}</p>
  //     </div>
  //   );
  // };
  // renderDetailsScore = () => {
  //   return (
  //     <div>
  //       <p>Score: {this.state.details.vote_average}</p>
  //     </div>
  //   );
  // };

  // renderDetailsGenre = () => {
  //   return (
  //     <div>
  //       <p>Genre: {this.state.genre}</p>{" "}
  //     </div>
  //   );
  // };

  renderDetailsVideoName = () => {
    console.log(this.state.key);
    return (
      <div class="details-box video-container">
        <p>{this.state.videoName}</p>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${this.state.key}`}
        />
      </div>
    );
  };

  renderCastPoster = () => {
    return this.state.cast.map((cast, index) => {
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${cast.profile_path}`;
      return (
        <Link to={`/details/actors/${cast.id}`} key={index}>
          <div class="details-box">

          <Media>
  <img
    width={64}
    height={84}
    className="mr-3"
    src={poster}
    alt="Generic placeholder"
  />
  <Media.Body>
    <h5>{cast.name}</h5>
    <p>
    {cast.character}
    </p>
  </Media.Body>
</Media>
            {/* <img src={poster} alt={cast.name} /> */}
          </div>
        </Link>
      );
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
        <span>{this.state.message}</span>

        {this.renderButtons()}
        {/* {this.renderProvidersLogo()}
        {this.state.providers} */}

        {this.renderDetailsVideoName()}
<div class="details-box">
<h2>Reviews:</h2>

{this.addReviewBtn()}

</div>
      

        {this.renderCastPoster()}

        {/* {this.renderCastName()}

        {this.renderCastCharacter()} */}
        <div></div>
      </div>
    );
  }
}

export default Details;
