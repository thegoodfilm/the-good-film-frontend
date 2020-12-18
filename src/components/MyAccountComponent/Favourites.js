import React from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row, Jumbotron, Card } from "react-bootstrap";
import MyAccountService from "../../services/MyAccountService";

class Favourites extends React.Component {
  state = {
    favourites: [],
    allFavourites: [],
  };

  service = new MyAccountService();

  componentDidMount() {
    this.service
      .getUser(this.props.isLogged._id)
      .then((response) => {
        this.setState({
          favourites: [...response.favourites],
        });
        this.myFavourites();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  myFavourites = () => {
    const favouritesMap = this.state.favourites.map((_id) => {
      return fetch(
        `${process.env.REACT_APP_BASEURL}/${_id}?api_key=${process.env.REACT_APP_KEY}&language=en-US`
      )
        .then((data) => {
          return data.json();
        })
        .then((dataJSON) => {
          return dataJSON;
        });
    });

    Promise.all(favouritesMap).then((result) => {
      this.setState({ allFavourites: result });
    });
  };

  renderMyFavourites = () => {
    return this.state.allFavourites.map((allFavourites, index) => {
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${allFavourites.poster_path}`;
      return (
        <Link
          className="text-link-myaccount"
          style={{ textDecoration: "none" }}
          name="top"
          to={`/details/${allFavourites.id}`}
          key={index}
        >
          <Col>
            <Card className="bg-dark text-white">
              <Card.ImgOverlay class="img-overlay-myaccount">
                <Card.Title className="main-text-myaccount">
                  {allFavourites.title}
                </Card.Title>
                <Card.Text className="main-text-myaccount">
                  <img
                    className="star-myaccount"
                    src="../../../kisspng-star-yellow-clip-art-football-star-5b1a130d853403.5302780815284354695456.png"
                    alt ={allFavourites.title}/>{" "}
                  {allFavourites.vote_average}
                </Card.Text>
              </Card.ImgOverlay>
              <Card.Img src={poster} alt={allFavourites.original_title} />
            </Card>
          </Col>
          <br></br>
        </Link>
      );
    });
  };

  messageIfAnyFavouritesFind = () => {
    return (
      <div>
        <div className="welcome-myaccount">
          <h1>Welcome to your favourites {this.props.isLogged.username}</h1>
          <br></br>
          <p>You don't have any favourites movies.</p>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div name="top" className="myaccount-box">
      {this.state.favourites.length !== 0
        ? <div>
          <Container>
          <Row className="justify-content-md-center">
                <Col>
                  <Jumbotron fluid>
                    <Container>
                      <h1>MY FAVOURITES</h1>
                    </Container>
                  </Jumbotron>
                </Col>
              </Row>
            <Row className="justify-content-md-center"> {this.renderMyFavourites()} </Row>{" "}
          </Container>
          </div>
        : <div>
          <Container>
          <Row className="justify-content-md-center">
                <Col>
                  <Jumbotron fluid>
                    <Container>
                      <h1>MY FAVOURITES</h1>
                    </Container>
                  </Jumbotron>
                </Col>
              </Row>
            <Row className="justify-content-md-center"> {this.messageIfAnyFavouritesFind()} </Row>{" "}
          </Container>
          </div>}
    </div>
    );
  }
}

export default Favourites;

