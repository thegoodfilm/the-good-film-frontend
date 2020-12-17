import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../../styles/Movie.css";
import { Col, Container, Row, Jumbotron, Card, Spinner} from "react-bootstrap";
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
    console.log(this.state);
    if (this.state.callFromNextBtn === false) {
      fetch(
        `
     ${process.env.REACT_APP_SEARCH}${process.env.REACT_APP_KEY}&language=en-US&query=${this.props.match.params.id}&${this.state.currentPage}`
      )
        .then((data) => {
          console.log("if fetch");
          return data.json();
        })
        .then((dataJSON) => {
          console.log(dataJSON.total_pages);
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
        console.log("hola");

        return data.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON.results);
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
      return (
        <Link to={`/details/${searchResults.id}`}
        style={{ textDecoration: "none" }} key={index} name="top">
         
         <Col>
            <Card className="bg-dark text-white">
              <Card.ImgOverlay class="img-overlay">
                <Card.Title className="main-text">{searchResults.title} </Card.Title>
                <Card.Text className="main-text">
                  <img
                    class="star"
                    src="../../../kisspng-star-yellow-clip-art-football-star-5b1a130d853403.5302780815284354695456.png"
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
    });
  };

  //   previousPage = () => {
  //     if(this.state.currentPage >2){
  //       this.setState({
  //         currentPage: this.state.currentPage - 1,
  //     })
  //     console.log(this.state.currentPage)

  //   }
  // };
  // nextPage = () => {
  //   if (this.state.currentPage <= this.state.totalPages) {
  //     this.setState({
  //       currentPage: this.state.currentPage + 1,
  //       callFromNextBtn: true,
  //     });
  //     console.log(this.state);

  //     return (window.location.href = `/search/${this.state.searchedWord}/results/${this.state.currentPage}`);
  //   }
  // };
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
        <div  className="movie-box">
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
