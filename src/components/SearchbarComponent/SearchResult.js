import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
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
        <Link to={`/search/${searchResults.id}/details`} key={index} name="top">
          <div>
            <div key={index}>
              <h3>
                {searchResults.title} ({searchResults.original_title})
              </h3>

              <img src={poster} alt={searchResults.title} />
            </div>
          </div>
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
  nextPage = () => {
    if (this.state.currentPage <= this.state.totalPages) {
      this.setState({
        currentPage: this.state.currentPage + 1,
        callFromNextBtn: true,
      });
      console.log(this.state);

      return (window.location.href = `/search/${this.state.searchedWord}/results/${this.state.currentPage}`);
    }
  };

  render() {
    return (
      <div name="top">
        <p>Hola soy busqueda</p>
        <div>{this.rendersearchResults()}</div>

        <Button onClick={() => this.previousPage()} variant="light">
          Previus
        </Button>
        <Button onClick={() => this.nextPage()} variant="light">
          Next
        </Button>
      </div>
    );
  }
}

export default SearchResult;
