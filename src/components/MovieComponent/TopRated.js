import React from "react";

import { Link } from "react-router-dom";

class TopRated extends React.Component {
  state = {
    topRated: [],
  };

  componentDidMount() {
    fetch(
      `${process.env.REACT_APP_BASEURL}/top_rated?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=1`
    )
      .then((data) => {
        return data.json();
      })
      .then((dataJSON) => {
        this.setState({ topRated: dataJSON.results });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderTopRated = () => {
    return this.state.topRated.map((topRated, index) => {
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${topRated.poster_path}`;
      return (
        <Link to={`/toprated/${topRated.id}`} key={index} name="top">
          <div>
            <div>
              <h3>{topRated.original_title}</h3>
              <p>{topRated.release_date}</p>
              <img src={poster} alt={topRated.original_title} />
            </div>
          </div>
        </Link>
      );
    });
  };

  render() {
    return (
      <div name="top">
        <h2>Top rated</h2>
        <div>{this.renderTopRated()}</div>
      </div>
    );
  }
}

export default TopRated;
