import React from "react";
import "../../styles/MyAccount.css";
import { Link } from "react-router-dom";
import { Col, Container, Row, Jumbotron, Card } from "react-bootstrap";
import MyAccountService from "../../services/MyAccountService";

class Watchlist extends React.Component {
  state = {
    watchlist: [],
    allWatchlist: [],
  };

  service = new MyAccountService();

  componentDidMount() {
    this.service
      .getUser(this.props.isLogged._id)
      .then((response) => {
        this.setState({
          watchlist: [...response.watchlist],
        });
        this.myWatchlist();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  myWatchlist = () => {
    const watchlistMap = this.state.watchlist.map((_id) => {
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
    Promise.all(watchlistMap).then((result) => {
      this.setState({ allWatchlist: result });
    });
  };

  renderMyWatchlist = () => {
    return this.state.allWatchlist.map((allWatchlist, index) => {
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${allWatchlist.poster_path}`;
      return (
        <Link
          name="top"
          to={`/myaccount/watchlist/${allWatchlist.id}`}
          className="text-link-myaccount"
          style={{ textDecoration: "none" }}
          key={index}
        >
          <Col>
            <Card className="bg-dark text-white">
              <Card.ImgOverlay class="img-overlay-myaccount">
                <Card.Title className="main-text-myaccount">
                  {allWatchlist.title}
                </Card.Title>
                <Card.Text className="main-text-myaccount">
                  <img
                    className="star-myaccount"
                    src="../../../kisspng-star-yellow-clip-art-football-star-5b1a130d853403.5302780815284354695456.png"
                    alt={allWatchlist.title}
                  />{" "}
                  {allWatchlist.vote_average}
                </Card.Text>
              </Card.ImgOverlay>
              <Card.Img src={poster} alt={allWatchlist.original_title} />
            </Card>
          </Col>
          <br></br>
        </Link>
      );
    });
  };

  messageIfAnyWatchlistFind = () => {
    return (
      <div>
        <div className="welcome-myaccount">
          <h1>Welcome to your watchlist {this.props.isLogged.username}</h1>
          <br></br>
          <p>You don't have any movies in your watchlist.</p>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div name="top" className="myaccount-box">
        {this.state.watchlist.length !== 0 ? (
          <div>
            <Container>
              <Row className="justify-content-md-center">
                <Col>
                  <Jumbotron fluid>
                    <Container>
                      <h1>MY WATCHLIST</h1>
                    </Container>
                  </Jumbotron>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                {" "}
                {this.renderMyWatchlist()}{" "}
              </Row>{" "}
            </Container>
          </div>
        ) : (
          <div>
            <Container>
              <Row className="justify-content-md-center">
                <Col>
                  <Jumbotron fluid>
                    <Container>
                      <h1>MY WATCHLIST</h1>
                    </Container>
                  </Jumbotron>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                {" "}
                {this.messageIfAnyWatchlistFind()}{" "}
              </Row>{" "}
            </Container>
          </div>
        )}
      </div>
    );
  }
}

export default Watchlist;
