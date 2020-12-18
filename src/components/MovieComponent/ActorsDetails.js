import React from "react";
import "../../styles/ActorsDetails.css";
import { Media } from "react-bootstrap";
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

      if (actorsDetails.poster_path === null) {
        return (
          <Link
            className="link-actor"
            style={{ textDecoration: "none" }}
            to={`/details/${actorsDetails.id}`}
            key={index}
            name="top"
          >
            <div className="details-box-actors">
              <Media as="li">
                <img
                  width={114}
                  height={140}
                  className="mr-3"
                  src="../../../poster_default.png"
                  alt={actorsDetails.name}
                />
                <Media.Body>
                  <h5>{actorsDetails.name}</h5>
                  <p>{actorsDetails.title}</p>
                  <p>Character: {actorsDetails.character}</p>
                  <p>
                    <img
                      className="star"
                      src="../../../kisspng-star-yellow-clip-art-football-star-5b1a130d853403.5302780815284354695456.png"
                      alt={actorsDetails.name}
                    />
                    {actorsDetails.vote_average}
                  </p>
                </Media.Body>
              </Media>
            </div>
          </Link>
        );
      } else {
        return (
          <Link
            className="link-actor"
            name="top"
            to={`/details/${actorsDetails.id}`}
            key={index}
            style={{ textDecoration: "none" }}
          >
            <div className="details-box-actors">
              <Media as="li">
                <img
                  width={114}
                  height={140}
                  className="mr-3"
                  src={poster}
                  alt={actorsDetails.name}
                />
                <Media.Body>
                  <h5>{actorsDetails.name}</h5>
                  <p>{actorsDetails.title}</p>
                  <p className="character-style">{actorsDetails.character}</p>
                  <p>
                    <img
                      className="star"
                      src="../../../kisspng-star-yellow-clip-art-football-star-5b1a130d853403.5302780815284354695456.png"
                      alt={actorsDetails.name}
                    />
                    {actorsDetails.vote_average}
                  </p>
                </Media.Body>
              </Media>
            </div>
          </Link>
        );
      }
    });
  };

  render() {
    return (
      <div>
        <div name="top" className="actor-details-style">
          <Media>
            <img
              width={187}
              height={286}
              className="mr-3"
              src={`${process.env.REACT_APP_BASEURLPOSTER}${this.state.actorsBio.profile_path}`}
              alt={this.state.actorsBio.name}
            />
            <Media.Body>
              <h5 className="text-gainsboro-actors">
                {this.state.actorsBio.name}
              </h5>
              <p className="text-gainsboro">
                Birthday: <span>{this.state.actorsBio.birthday}</span>
              </p>
              <p className="text-gainsboro">
                Place of birth: {this.state.actorsBio.place_of_birth}
              </p>
              <p className="text-gainsboro">
                Biography: {this.state.actorsBio.biography}
              </p>
            </Media.Body>
          </Media>
          <ul className="list-unstyled">{this.renderActorsDetails()}</ul>
        </div>
      </div>
    );
  }
}

export default ActorsDetails;
