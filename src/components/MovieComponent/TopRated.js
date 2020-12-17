import React from "react";
import "../../styles/Movie.css";
import { Col, Container, Row, Jumbotron, Card, Spinner } from "react-bootstrap";

import { Link } from "react-router-dom";

class TopRated extends React.Component {
  state = {
    topRated: [],
  };

  componentDidMount() {
    fetch(
      `${process.env.REACT_APP_BASEURL}/top_rated?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=1`
    )
      .then((data) => {
        return data.json();
      })
      .then((dataJSON) => {
        this.setState({ topRated: dataJSON.results });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderTopRated = () => {
    return this.state.topRated.map((topRated, index) => {
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${topRated.poster_path}`;
      return (
        <Link
          className="text-link"
          to={`/details/${topRated.id}`}
          style={{ textDecoration: "none" }}
          key={index}
          name="top"
        >
          <Col>
            <Card className="bg-dark text-white">
              <Card.ImgOverlay class="img-overlay">
                <Card.Title className="main-text">{topRated.title}</Card.Title>
                <Card.Text className="main-text">
                  <img
                    class="star"
                    src="../../../kisspng-star-yellow-clip-art-football-star-5b1a130d853403.5302780815284354695456.png"
                  />{" "}
                  {topRated.vote_average}
                </Card.Text>
              </Card.ImgOverlay>
              <Card.Img src={poster} alt="Card image" />
            </Card>
          </Col>
          <br></br>
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
      <div>
        {this.state.topRated.length === 0 ? (
          this.renderSpinner()
        ) : (
          <div name="top" className="movie-box">
            <div>
              <Container>
                <Row className="justify-content-md-center">
                  <Col>
                    <Jumbotron fluid>
                      <Container>
                        <h1>TOP RATED</h1>
                      </Container>
                    </Jumbotron>
                  </Col>
                </Row>
                <Row className="justify-content-md-center">
                  {this.renderTopRated()}
                </Row>
              </Container>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TopRated;
