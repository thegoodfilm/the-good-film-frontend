import React from "react";
import "../../styles/Movie.css";
import { Col, Container, Row, Jumbotron, Card, Spinner } from "react-bootstrap";

import { Link } from "react-router-dom";

class NowOnCinemas extends React.Component {
  state = {
    nowOnCinemas: [],
  };

  componentDidMount() {
    fetch(
      `${process.env.REACT_APP_BASEURL}/now_playing?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=1`
    )
      .then((data) => {
        return data.json();
      })
      .then((dataJSON) => {
        this.setState({ nowOnCinemas: dataJSON.results });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderNowOnCinemas = () => {
    return this.state.nowOnCinemas.map((nowOnCinemas, index) => {
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${nowOnCinemas.poster_path}`;
      return (
        <Link
          className="text-link"
          style={{ textDecoration: "none" }}
          to={`/details/${nowOnCinemas.id}`}
          key={index}
          name="top"
        >
          <Col>
            <Card className="bg-dark text-white">
              <Card.ImgOverlay class="img-overlay">
                <Card.Title className="main-text">
                  {nowOnCinemas.title}
                </Card.Title>
                <Card.Text className="main-text">
                  <img
                    className="star"
                    src="../../../kisspng-star-yellow-clip-art-football-star-5b1a130d853403.5302780815284354695456.png"
                  />{" "}
                  {nowOnCinemas.vote_average}
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
        {this.state.nowOnCinemas.length === 0 ? (
          this.renderSpinner()
        ) : (
          <div name="top" className="movie-box">
            <div>
              <Container>
                <Row className="justify-content-md-center">
                  <Col>
                    <Jumbotron fluid>
                      <Container>
                        <h1>NOW ON CINEMAS</h1>
                      </Container>
                    </Jumbotron>
                  </Col>
                </Row>
                <Row className="justify-content-md-center">
                  {this.renderNowOnCinemas()}
                </Row>
              </Container>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default NowOnCinemas;
