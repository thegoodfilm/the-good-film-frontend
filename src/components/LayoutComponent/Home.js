import React from "react";
import "../../styles/Home.css";
import { Container, Jumbotron, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

class Home extends React.Component {
  state = {
    home: [],
  };

  componentDidMount() {
    fetch(
      `${process.env.REACT_APP_BASEURL}/popular?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=1`
    )
      .then((data) => {
        return data.json();
      })
      .then((dataJSON) => {
        this.setState({ home: dataJSON.results });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderHome = () => {
    return this.state.home.map((home, index) => {
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${home.poster_path}`;
      return (
        <Link
          className="link-home"
          to={`/details/${home.id}`}
          style={{ textDecoration: "none" }}
          key={index}
          name="top"
        >
          <div className="captions-home">
            <div> {home.title}</div>
            <div>
              {" "}
              <img
                className="star-myaccount"
                src="../../../kisspng-star-yellow-clip-art-football-star-5b1a130d853403.5302780815284354695456.png"
                alt={home.title}
              />{" "}
              {home.vote_average}
            </div>
            <img className="imagen" src={poster} alt={home.title} />
          </div>
        </Link>
      );
    });
  };

  renderSpinner = () => {
    return (
      <div className="loader loader-container">
        <Spinner animation="grow" />{" "}
      </div>
    );
  };

  render() {
    return (
      <div name="top">
        {this.state.home.length === 0 ? (
          this.renderSpinner()
        ) : (
          <div className="intro-home">
            <Jumbotron className="movie-box">
              <Container>
                <h1>MOVIES OF THE DAY</h1>
              </Container>
            </Jumbotron>
            <div className="tester movie-box-home">{this.renderHome()}</div>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
