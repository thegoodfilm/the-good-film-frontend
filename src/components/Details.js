import React from "react";

import ReactPlayer from "react-player";

class Details extends React.Component {
  state = {
    details: [],
    key: "",
    genre: "",
    videoName: "",
  };

  componentDidMount() {
    console.log(process.env.REACT_APP_BASEURL);
    fetch(
      `${process.env.REACT_APP_BASEURL}/${this.props.match.params.id}?api_key=${process.env.REACT_APP_KEY}&append_to_response=videos`
    )
      .then((data) => {
        return data.json();
      })
      .then((dataJSON) => {
        this.setState({
          details: dataJSON,
          key: dataJSON.videos.results[0].key,
          genre: dataJSON.genres[0].name,
          videoName: dataJSON.videos.results[0].name,
        });
        console.log(this.state.details);
        // console.log(this.state.details.videos.results[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const poster = `${process.env.REACT_APP_BASEURLPOSTER}${this.state.details.poster_path}`;

    return (
      <div>
        <p>Title: {this.state.details.title}</p>

        <p>Release date: {this.state.details.release_date}</p>
        <p>Overview: {this.state.details.overview}</p>

        <p>Score: {this.state.details.vote_average}</p>
        <p>Homepage: {this.state.details.homepage}</p>
        <p>Genre: {this.state.genre}</p>

        <img src={poster} alt={this.state.details.production_companies} />
        {/* <ReactPlayer url = `${process.env.REACT_APP_BASEURLVIDEO}6JnN1DmbqoU`/>
        <ReactPlayer url = ``/> */}
        <p>{this.state.videoName}</p>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${this.state.key}`}
        />
      </div>
    );
  }
}

export default Details;
