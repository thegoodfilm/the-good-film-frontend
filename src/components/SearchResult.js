import React from "react";
import App from "../App";

// import { Link } from "react-router-dom";

class SearchResult extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pages: [],
      searchResults: [],
  
  }
  };


 

  componentDidMount =()=>{

    fetch(
      `${process.env.REACT_APP_MULTISEARCH}${process.env.REACT_APP_KEY}&language=en-US&query=${this.props.match.params.id}&page=1:2`)
      .then((data) => {
        return data.json();
      
      })
      .then((dataJSON) => {
        console.log(dataJSON)
        this.setState({
          pages: dataJSON
          
        });
      })
      .catch((err) => {
        console.log(err);
      });

for(let i = 0; i=this.state.pages; i++){
  fetch(
    `${process.env.REACT_APP_MULTISEARCH}${process.env.REACT_APP_KEY}&language=en-US&query=${this.props.match.params.id}&page=${i}`)
    .then((data) => {
      return data.json();
    
    })
    .then((dataJSON) => {
      console.log(dataJSON)
      this.setState({
        searchResults: dataJSON.results
        
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
  }
  rendersearchResults = () => {
    return this.state.searchResults.map((searchResults, index) => {
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${searchResults.profile_path}`;
      return (
   
          <div>
            <div key={index}>
              <h3>{searchResults.id}</h3>
            
              <img src={poster} alt={searchResults.id} />
            </div>
          </div>

      );
    });
  };

  render() {
    
    return (


      <div name="top">
   
      <p>Hola soy busqueda</p>
      <div>{this.rendersearchResults()}</div>
       
       
      </div>
    );
  }
}

export default SearchResult;
