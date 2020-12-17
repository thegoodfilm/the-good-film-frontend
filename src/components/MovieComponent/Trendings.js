import React from "react";
import "../../styles/Movie.css";
import { Col, Container, Row, Jumbotron, Card, Spinner } from "react-bootstrap";

import { Link } from "react-router-dom";

class Trendings extends React.Component {
  state = {
    trendings: [],
  };

  componentDidMount() {
    fetch(
      `${process.env.REACT_APP_BASEURL}/popular?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=1`
    )
      .then((data) => {
        return data.json();
      })
      .then((dataJSON) => {
        this.setState({ trendings: dataJSON.results });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderTrendings = () => {
    return this.state.trendings.map((trendings, index) => {
      console.log(this.state.trendings[0].original_title);
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${trendings.poster_path}`;
      return (
        <Link
          className="text-link"
          style={{ textDecoration: "none" }}
          to={`/details/${trendings.id}`}
          key={index}
          name="top"
        >
          <Col>
            <Card className="bg-dark text-white">
              <Card.ImgOverlay class="img-overlay">
                <Card.Title className="main-text">{trendings.title}</Card.Title>
                <Card.Text className="main-text">
                  <img
                    class="star"
                    src="../../../kisspng-star-yellow-clip-art-football-star-5b1a130d853403.5302780815284354695456.png"
                  />{" "}
                  {trendings.vote_average}
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
      <div name="top">
        {this.state.trendings.length === 0 ? (
          this.renderSpinner()
        ) : (
          <div  className="movie-box">
            <div>
              <Container>
                <Row className="justify-content-md-center">
                  <Col>
                    <Jumbotron fluid>
                      <Container>
                        <h1>WEEK TRENDINGS</h1>
                      </Container>
                    </Jumbotron>
                  </Col>
                </Row>
                <Row className="justify-content-md-center">
                  {this.renderTrendings()}
                </Row>
              </Container>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Trendings;
