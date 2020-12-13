import React from "react";

import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import MyAccountService from "../services/MyAccountService";
import {
  Button
 
} from "react-bootstrap";

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
    message: ""
  };

  service = new MyAccountService();

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
    this.service
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
        <div>
          <button onClick={() => this.addToMyFavourites()}>Favourites</button>
          <button onClick={() => this.addToMyActivity()}>Activity</button>
          <button onClick={() => this.addToMyWatchlist()}>Watchlist</button>
          <Button href= {`/myaccount/diary/${this.state.details.id}`}>Add to Diary</Button>
          
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

  componentDidMount() {
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
    return (
      <div>
        <p>Title: {this.state.details.title}</p>
      </div>
    );
  };

  renderDetailsPoster = () => {
    const poster = `${process.env.REACT_APP_BASEURLPOSTER}${this.state.details.poster_path}`;

    return (
      <div>
      <img src={poster} alt={this.state.details.original_title} />
      </div>
    );
  };


  renderDetailsReleaseDate = () => {
    return (
      <div>
        <p>Release date: {this.state.details.release_date}</p>
      </div>
    );
  };

  renderDetailsOverview = () => {
    return (
      <div>
        <p>Overview: {this.state.details.overview}</p>
      </div>
    );
  };
  renderDetailsScore = () => {
    return (
      <div>
        <p>Score: {this.state.details.vote_average}</p>
      </div>
    );
  };

  renderDetailsGenre = () => {
    return (
      <div>
        <p>Genre: {this.state.genre}</p>{" "}
      </div>
    );
  };

  renderDetailsVideoName = () => {
    return (
      <div>
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
          <div>
            <img src={poster} alt={cast.name} />
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

        {this.renderDetailsPoster()}

        {this.renderDetailsReleaseDate()}

        {this.renderDetailsOverview()}

        {this.renderDetailsScore()}

        {this.renderDetailsGenre()}
        <span>{this.state.message}</span>

        {this.renderButtons()}
        {/* {this.renderProvidersLogo()}
        {this.state.providers} */}

        {this.renderDetailsVideoName()}

        {this.renderCastPoster()}

        {this.renderCastName()}

        {this.renderCastCharacter()}
        <div></div>
      </div>
    );
  }
}

export default Details;
