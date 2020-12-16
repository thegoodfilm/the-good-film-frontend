import React from "react";

import { Link } from "react-router-dom";
import "../../styles/Upcomings.css";
import { Col, Container, Row, Jumbotron } from "react-bootstrap";
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
        <Link to={`/upcomings/${upcoming.id}`} key={index} name="top">
          {/* <h3>{upcoming.original_title}</h3>
              <p>{upcoming.release_date}</p> */}
          <Col xs={6} md={4} class="details-box ">
            <img src={poster} alt={upcoming.original_title} />
          </Col>
          <br></br>
        </Link>
      );
    });
  };

  render() {
    return (
      <div name="top" >
      <div class="details-box">
      <Jumbotron fluid >
          <Container>
            <h1>Upcomings</h1>
            <p>
              This is a modified jumbotron that occupies the entire horizontal
              space of its parent.
            </p>
          </Container>
        </Jumbotron>
      </div>
     <div class="details-box-img">

     <Container>
          <Row>{this.renderUpcomings()}</Row>
        </Container>
     </div>
     
      </div>
    );
  }
}

export default Upcomings;
