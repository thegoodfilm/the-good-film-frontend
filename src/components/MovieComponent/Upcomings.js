import React from "react";
import "../../styles/Movie.css";
import { Col, Container, Row, Jumbotron, Card, Spinner} from "react-bootstrap";

import { Link } from "react-router-dom";

class Upcomings extends React.Component {
  state = {
    upcomings: [],
  };

  componentDidMount() {
    fetch(
      `${process.env.REACT_APP_BASEURL}/upcoming?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=1`
    )
      .then((data) => {
        return data.json();
      })
      .then((dataJSON) => {
        this.setState({ upcomings: dataJSON.results });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderUpcomings = () => {
    return this.state.upcomings.map((upcoming, index) => {
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${upcoming.poster_path}`;
      return (
        <Link
          className="text-link"
          to={`/upcomings/${upcoming.id}`}
          style={{ textDecoration: "none" }}
          key={index}
          name="top"
        >
          <Col>
            <Card className="bg-dark text-white">
              <Card.ImgOverlay class="img-overlay">
                <Card.Title className="main-text">{upcoming.title}</Card.Title>
                <Card.Text className="main-text">
                  <img
                    class="star"
                    src="../../../kisspng-star-yellow-clip-art-football-star-5b1a130d853403.5302780815284354695456.png"
                  />{" "}
                  {upcoming.vote_average}
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
        {this.state.upcomings.length === 0 ? (
          this.renderSpinner()
        ) : (
          <div name="top" className="movie-box">
            <div>
              <Container>
                <Row className="justify-content-md-center">
                  <Col>
                    <Jumbotron fluid>
                      <Container>
                        <h1>UPCOMINGS</h1>
                      </Container>
                    </Jumbotron>
                  </Col>
                </Row>
                <Row className="justify-content-md-center">
                  {this.renderUpcomings()}
                </Row>
              </Container>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Upcomings;
