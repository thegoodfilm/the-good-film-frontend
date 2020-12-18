import React from "react";
import "../../styles/Movie.css";
import { Link } from "react-router-dom";
import { Col, Container, Row, Jumbotron, Card, Spinner } from "react-bootstrap";

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      currentPage: 1,
      totalPages: [],
      callFromNextBtn: false,
    };
  }

  componentDidMount = () => {
    if (this.state.callFromNextBtn === false) {
      fetch(
        `
     ${process.env.REACT_APP_SEARCH}${process.env.REACT_APP_KEY}&language=en-US&query=${this.props.match.params.id}&${this.state.currentPage}`
      )
        .then((data) => {
          return data.json();
        })
        .then((dataJSON) => {
          this.setState({
            totalPages: dataJSON.total_pages,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetch(
      `
     ${process.env.REACT_APP_SEARCH}${process.env.REACT_APP_KEY}&language=en-US&query=${this.props.match.params.id}&page=${this.state.currentPage}`
    )
      .then((data) => {
        return data.json();
      })
      .then((dataJSON) => {
        this.setState({
          searchResults: dataJSON.results,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({
      callFromNextBtn: false,
    });
  };

  rendersearchResults = () => {
    return this.state.searchResults.map((searchResults, index) => {
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${searchResults.poster_path}`;
      if (searchResults.poster_path === null) {
        return (
          <Link
            to={`/details/${searchResults.id}`}
            style={{ textDecoration: "none" }}
            key={index}
            name="top"
          >
            <Col>
              <Card className="bg-dark text-white">
                <Card.ImgOverlay class="img-overlay">
                  <Card.Title className="main-text">
                    {searchResults.title}{" "}
                  </Card.Title>
                  <Card.Text className="main-text">
                    <img
                      className="star"
                      src="../../../kisspng-star-yellow-clip-art-football-star-5b1a130d853403.5302780815284354695456.png"
                      alt={searchResults.title}
                    />{" "}
                    {searchResults.vote_average}
                  </Card.Text>
                </Card.ImgOverlay>
                <Card.Img src="../../../poster_default.png" alt="Card image" />
              </Card>
            </Col>
            <br></br>
          </Link>
        );
      } else {
        return (
          <Link
            to={`/details/${searchResults.id}`}
            style={{ textDecoration: "none" }}
            key={index}
            name="top"
          >
            <Col>
              <Card className="bg-dark text-white">
                <Card.ImgOverlay class="img-overlay">
                  <Card.Title className="main-text">
                    {searchResults.title}{" "}
                  </Card.Title>
                  <Card.Text className="main-text">
                    <img
                      className="star"
                      src="../../../kisspng-star-yellow-clip-art-football-star-5b1a130d853403.5302780815284354695456.png"
                      alt={searchResults.title}
                    />{" "}
                    {searchResults.vote_average}
                  </Card.Text>
                </Card.ImgOverlay>
                <Card.Img src={poster} alt="Card image" />
              </Card>
            </Col>
            <br></br>
          </Link>
        );
      }
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
        {this.state.searchResults.length === 0 ? (
          this.renderSpinner()
        ) : (
          <div className="movie-box">
            <div>
              <Container>
                <Row className="justify-content-md-center">
                  <Col>
                    <Jumbotron fluid>
                      <Container>
                        <h1>theGoodFilm</h1>
                      </Container>
                    </Jumbotron>
                  </Col>
                </Row>
                <Row className="justify-content-md-center">
                  {this.rendersearchResults()}
                </Row>
              </Container>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SearchResult;
