import React from 'react'

import { Link } from 'react-router-dom';


class SearchResult extends React.Component {
    constructor(props){
        super(props)

        this.state = {
          searchResult: [],
          word: props.searchedWord,
          URL: props.searchURL
          
        }

    }

    componentDidMount(){

      fetch(this.state.URL)
      .then((data)=>{

              return data.json()
            })
            .then((dataJSON)=>{
              this.setState({searchResult: dataJSON.results})
            })
            .catch((err)=>{
              console.log(err)
      })
    }

    // componentDidUpdate(prevProps, prevState) {
    //   if (this.state.URL !== prevProps.URL) {
    //      fetch(this.state.URL)
    //   .then((data)=>{

    //           return data.json()
    //         })
    //         .then((dataJSON)=>{
    //           this.setState({searchResult: dataJSON.results})
    //         })
    //         .catch((err)=>{
    //           console.log(err)
    //   })
    //   }
    // }



  renderSearchResult = ()=>{
    return this.state.searchResult.map((searchResult, index)=>{
      const poster = `https://image.tmdb.org/t/p/w500${searchResult.poster_path}`
      return(
        <Link to={`/searchresult/:movie`} key={index}>
          <div>
          
            <div>
              <h3>{searchResult.original_title}</h3>
              <p>{searchResult.release_date}</p>
                <img src={poster}alt={searchResult.original_title}/>
            </div>
          </div>
        </Link>
      )
    })
  }



  render(){
    return(
      
      <div>
        <h2>Search Results</h2>
        <h3>{this.state.URL}</h3>


        <p>Hola soy {this.state.word}</p>

        <div>
          {this.renderSearchResult()}          
        </div>
      </div>
    )    
  }
}

export default SearchResult

