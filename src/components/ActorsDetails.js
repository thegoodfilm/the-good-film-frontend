import React from "react";

import { Link } from "react-router-dom";

class ActorsDetails extends React.Component {
  state = {
    actorsDetails: [],
    actorsBio: [],
  };

  componentDidMount() {
    fetch(
      `${process.env.REACT_APP_BASEURLPERSON}/${this.props.match.params.id}/movie_credits?api_key=${process.env.REACT_APP_KEY}&language=en-US`
    )
      .then((data) => {
        return data.json();
      })
      .then((dataJSON) => {
        this.setState({
          actorsDetails: dataJSON.cast,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    fetch(
      `${process.env.REACT_APP_BASEURLPERSON}/${this.props.match.params.id}?api_key=${process.env.REACT_APP_KEY}&language=en-US`
    )
      .then((dataBio) => {
        return dataBio.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        this.setState({
          actorsBio: dataJSON,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderActorsDetails = () => {
    return this.state.actorsDetails.map((actorsDetails, index) => {
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${actorsDetails.poster_path}`;
      return (
        <Link
          to={`/details/actors/${actorsDetails.id}/${actorsDetails.title}`}
          key={index}
        >
          <div>
            <div>
              <h3>{actorsDetails.name}</h3>
              <p>Title: {actorsDetails.title}</p>
              <p>Character: {actorsDetails.character}</p>
              <p>Score: {actorsDetails.vote_average}</p>

              <img src={poster} alt={actorsDetails.name} />
            </div>
          </div>
        </Link>
      );
    });
  };

  render() {
    return (
      <div>
        <p>Name: {this.state.actorsBio.name}</p>
        <img
          src={`${process.env.REACT_APP_BASEURLPOSTER}${this.state.actorsBio.profile_path}`}
          alt={this.state.actorsBio.name}
        /> 
        <p>Bithday: {this.state.actorsBio.birthday}</p>
        <p>Place of birth: {this.state.actorsBio.place_of_birth}</p>
        <p>Biography: {this.state.actorsBio.biography}</p>
        {this.renderActorsDetails()}
      </div>
    );
  }
}

export default ActorsDetails;
