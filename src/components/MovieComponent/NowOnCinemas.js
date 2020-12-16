import React from "react";
import "../../styles/Movie.css";

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
        <Link to={`/nowoncinemas/${nowOnCinemas.id}`} key={index} name="top">
          <div>
            <h3>{nowOnCinemas.original_title}</h3>
            <p>{nowOnCinemas.release_date}</p>
            <img src={poster} alt={nowOnCinemas.original_title} />
          </div>
        </Link>
      );
    });
  };

  render() {
    return (
      <div name="top">
        <h2>Now on cinemas</h2>
        <div>{this.renderNowOnCinemas()}</div>
      </div>
    );
  }
}

export default NowOnCinemas;
