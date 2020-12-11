import React from "react";

import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
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
  
  }

  

  componentDidMount() {
    fetch(
      `${process.env.REACT_APP_BASEURL}/${this.props.match.params.id}?api_key=${process.env.REACT_APP_KEY}&append_to_response=videos`
    )
      .then((data) => {
        console.log(this.props.match.params.id);

        return data.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON)

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
        {/* {this.renderDetailsTitle() === 0 ||
        this.renderDetailsTitle() === undefined
          ? this.state.defaultMessage
          : this.renderDetailsTitle()}

        {this.renderDetailsReleaseDate() === 0 ||
        this.renderDetailsReleaseDate() === undefined
          ? this.state.defaultMessage
          : this.renderDetailsReleaseDate()}

        {this.renderDetailsOverview() === 0 ||
        this.renderDetailsOverview() === undefined
          ? this.state.defaultMessage
          : this.renderDetailsOverview()}

        {this.renderDetailsScore() === 0 ||
        this.renderDetailsScore() === undefined
          ? this.state.defaultMessage
          : this.renderDetailsScore()}

        {this.renderDetailsGenre() === 0 ||
        this.renderDetailsGenre() === undefined
          ? this.state.defaultMessage
          : this.renderDetailsGenre()}

        {this.renderDetailsVideoName() === 0 ||
        this.renderDetailsVideoName() === undefined
          ? this.state.defaultMessage
          : this.renderDetailsVideoName()}

        {this.renderCastPoster() === 0 || this.renderCastPoster() === undefined
          ? this.state.defaultMessage
          : this.renderCastPoster()}

        {this.renderCastName() === 0 || this.renderCastName() === undefined
          ? this.state.defaultMessage
          : this.renderCastName()}

        {this.renderCastCharacter() === 0 ||
        this.renderCastCharacter() === undefined
          ? this.state.defaultMessage
          : this.renderCastCharacter()}

        {this.renderProvidersLogo() === 0 ||
        this.renderProvidersLogo() === undefined
          ? this.state.defaultMessage
          : this.renderProvidersLogo()} */}

        {this.renderDetailsTitle()}

        {this.renderDetailsReleaseDate()}

        {this.renderDetailsOverview()}

        {this.renderDetailsScore()}

        {this.renderDetailsGenre()}

        {this.renderProvidersLogo()}

        {this.renderDetailsVideoName()}

        {this.renderCastPoster()}

        {this.renderCastName()}

        {this.renderCastCharacter()}
        <div>
    
        </div>
      </div>
    );
  }
}

export default Details;
