import React from 'react'

import { Link } from 'react-router-dom';

class Upcomings extends React.Component {

  state = {
    upcomings: []
  }

  componentDidMount(){
    fetch(`${process.env.REACT_APP_BASEURL}/upcoming?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=1`)
    .then((data)=>{
      return data.json()
    })
    .then((dataJSON)=>{
      this.setState({upcomings: dataJSON.results})
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  renderUpcomings = ()=>{
    return this.state.upcomings.map((upcoming, index)=>{
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${upcoming.poster_path}`
      return(
        <Link to={`/upcomings/${upcoming.id}`} key={index}>
          <div>
          
            <div>
              <h3>{upcoming.original_title}</h3>
              <p>{upcoming.release_date}</p>
                <img src={poster}alt={upcoming.original_title}/>
            </div>
          </div>
        </Link>
      )
    })
  }

  

  render(){
    return(
      <div>
        <h2>Upcomings</h2>
        <div>
          {this.renderUpcomings()}          
        </div>
      </div>
    )    
  }
}

export default Upcomings