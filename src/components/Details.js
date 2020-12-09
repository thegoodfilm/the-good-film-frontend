import React from "react";

// require("dotenv").config();


class Details extends React.Component {
  state = {
    details: []
 
  };

  componentDidMount() {
  console.log(process.env.REACT_APP_BASEURL)
      fetch(
        `${process.env.REACT_APP_BASEURL}/${this.props.match.params.id}?api_key=${process.env.REACT_APP_KEY}&append_to_response=videos`)
        .then((data) => {
          return data.json();
        })
        .then((dataJSON) => {
          this.setState({ details: dataJSON });
        })
        .catch((err) => {
          console.log(err);
        });
  }

  render() {

    const poster = `${process.env.REACT_APP_BASEURLPOSTER}${this.state.details.poster_path}`;

    return (
      
      <div>
        <p>Youtube:</p>
       {/* <Link to ={`https://www.youtube.com/watch?`v=${this.state.details.videos.results[0].id}`}/> */}
       {/* <Redirect to ={`https://www.youtube.com/watch?`}>hola</Redirect> */}

        <p>{this.state.details.original_title}</p>
        <p>{this.state.details.overview}</p>

        <img src={poster} alt={this.state.details.original_title} />
      </div>
    );
  }
}

export default Details;
