import React from "react";
import "../../styles/Movie.css";
import { Col, Container, Row, Jumbotron } from "react-bootstrap";

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
        <Link to={`/trendings/${trendings.id}`} key={index} name="top">
          <Col>
            {/* <h3>{trendings.original_title}</h3>
              <p>{trendings.release_date}</p> */}
            <img
              class="posters-style"
              src={poster}
              alt={trendings.original_title}
            />
          </Col>
          <br></br>
        </Link>
      );
    });
  };

  render() {
    return (
      <div name="top" className="movie-box">
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

      /* <div>
          <div class="jumbotron-style">
            <Jumbotron fluid>
              <Container>
                <h1>UPCOMINGS</h1>
                {/* <p>
              This is a modified jumbotron that occupies the entire horizontal
              space of its parent.
            </p> */
      //         </Container>
      //       </Jumbotron>
      //     </div>

      //     <Container>
      //       <Row> {this.renderTrendings()}</Row>
      //     </Container>
      //   </div>
      // </div> */}
    );
  }
}

export default Trendings;
