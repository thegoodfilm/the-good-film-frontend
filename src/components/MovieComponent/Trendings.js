import React from 'react'

import { Link } from 'react-router-dom';

class Trendings extends React.Component {

  state = {
    trendings: []
  }

  componentDidMount(){
    fetch(`${process.env.REACT_APP_BASEURL}/popular?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=1`)
    .then((data)=>{
      return data.json()
    })
    .then((dataJSON)=>{
      this.setState({trendings: dataJSON.results})
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  renderTrendings = ()=>{
    return this.state.trendings.map((trendings, index)=>{
      console.log(this.state.trendings[0].original_title)
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${trendings.poster_path}`
      return(
        <Link to={`/trendings/${trendings.id}`} key={index} name="top">
          <div>
          
            <div>
              <h3>{trendings.original_title}</h3>
              <p>{trendings.release_date}</p>
                <img src={poster}alt={trendings.original_title}/>
            </div>
          </div>
        </Link>
      )
    })
  }

 

  render(){
    return(
      <div name="top">
        <h2>Trendings</h2>
        <div>
          {this.renderTrendings()}          
        </div>
      </div>
    )    
  }
}

export default Trendings