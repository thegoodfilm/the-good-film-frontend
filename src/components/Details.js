import React from "react";

import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

class Details extends React.Component {
  state = {
    details: [],
    key: "",
    genre: "",
    videoName: "",
    cast: [],
    providers: []
  };

  componentDidMount() {
    fetch(
      `${process.env.REACT_APP_BASEURL}/${this.props.match.params.id}?api_key=${process.env.REACT_APP_KEY}&append_to_response=videos`
    )
      .then((data) => {
        return data.json();
      })
      .then((dataJSON) => {
        if (dataJSON.genres.length === 0) {
          this.setState({
            details: dataJSON,
            key: dataJSON.videos.results[0].key,
            genre: "other",
            videoName: dataJSON.videos.results[0].name,
          });
        } else {
          this.setState({
            details: dataJSON,
            key: dataJSON.videos.results[0].key,
            genre: dataJSON.genres[0].name,
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
        this.setState({ cast: dataJSON.cast });
      })
      .catch((err) => {
        console.log(err);
      });

      fetch(
        `${process.env.REACT_APP_BASEURL}/${this.props.match.params.id}/providers?api_key=${process.env.REACT_APP_KEY}`
      )
        .then((dataProvider) => {
          //console.log(dataCast.json())
          return dataProvider.json();
        })
        .then((dataJSON) => {
          this.setState({ providers: dataJSON.ES.flatrate});
        })
        .catch((err) => {
          console.log(err);
        });

  }

  renderCast = () => {
    return this.state.cast.map((cast, index) => {
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${cast.profile_path}`;
      return (
        <Link to={`/details/actors/${cast.id}`} key={index}>
          <div>
            <div>
              <h3>{cast.name}</h3>
              <p>{cast.character}</p>
              <img src={poster} alt={cast.name} />
            </div>
          </div>
        </Link>
      );
    });
  };

  renderProviders = () => {
    return this.state.providers.map((providers) => {
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${providers.logo_path}`;
      return (
        // <Link to={`/details/actors/${cast.id}`} key={index}>
          <div>
            <div>
              <h3>{providers.provider_name}</h3>
             
              <img src={poster} alt={providers.name} />
            </div>
          </div>
        // </Link>
      );
    });
  };

  render() {
    const poster = `${process.env.REACT_APP_BASEURLPOSTER}${this.state.details.poster_path}`;

    return (
      <div>
        <p>Title: {this.state.details.title}</p>

        <p>Release date: {this.state.details.release_date}</p>
        <p>Overview: {this.state.details.overview}</p>

        <p>Score: {this.state.details.vote_average}</p>
        <p>Homepage: {this.state.details.homepage}</p>
        <p>Genre: {this.state.genre}</p>
        {this.renderProviders()}
        <img src={poster} alt={this.state.details.production_companies} />

        <p>{this.state.videoName}</p>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${this.state.key}`}
        />
        {this.renderCast()}
      </div>
    );
  }
}

export default Details;
