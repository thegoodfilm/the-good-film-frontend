import React from 'react'
import MyAccountService from '../services/MyAccountService'

class MyAccount extends React.Component{

  state = {
    favourites: [],
    watchlist: [],
    activity: [],
    ratings: [],
    allFavoutires: [],
    allWatchlist: [],
    allActivity: [],
    allRatings: []
  }

  service = new MyAccountService()

  componentDidMount(){
    this.service.getUser(this.props.isLogged._id)
    .then((response)=>{
      this.setState({favourites: [...response.favourites], watchlist: [...response.watchlist], activity: [...response.activity], ratings: [...response.ratings]})
      this.myFavourites()
      this.myWatchlist()
      this.myActivity()
      this.myrATINGS()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  myFavourites = ()=>{
    const favouritesMap = this.state.favourites.map((_id)=>{

      return fetch(`${process.env.REACT_APP_BASEURL}/${id}?api_key=${process.env.REACT_APP_KEY}&append_to_response=videos`)
      .then((data)=>{
        return data.json()
      })
      .then((dataJSON)=>{
        return dataJSON
      })
    })

    Promise.all(favouritesMap)
    .then((result)=>{
      this.setState({allFavoutires : result})
    })
  }

  myWatchlist = ()=>{
    const watchlistMap = this.state.watchlist.map((_id)=>{

      return fetch(`${process.env.REACT_APP_BASEURL}/${id}?api_key=${process.env.REACT_APP_KEY}&append_to_response=videos`)
      .then((data)=>{
        return data.json()
      })
      .then((dataJSON)=>{
        return dataJSON
      })
    })

    Promise.all(watchlistMap)
    .then((result)=>{
      this.setState({allWatchlist : result})
    })
  }

  myActivity = ()=>{
    const activityMap = this.state.activity.map((_id)=>{

      return fetch(`${process.env.REACT_APP_BASEURL}/${id}?api_key=${process.env.REACT_APP_KEY}&append_to_response=videos`)
      .then((data)=>{
        return data.json()
      })
      .then((dataJSON)=>{
        return dataJSON
      })
    })

    Promise.all(activityMap)
    .then((result)=>{
      this.setState({allActivity : result})
    })
  }

  myRatings = ()=>{
    const ratingsMap = this.state.ratings.map((_id)=>{

      return fetch(`${process.env.REACT_APP_BASEURL}/${id}?api_key=${process.env.REACT_APP_KEY}&append_to_response=videos`)
      .then((data)=>{
        return data.json()
      })
      .then((dataJSON)=>{
        return dataJSON
      })
    })

    Promise.all(ratingsMap)
    .then((result)=>{
      this.setState({allRatings : result})
    })
  }


  renderMyFavourites = ()=>{

    return this.state.allFavoutires.map((movie)=>{
      return <h3>{movie.title_japanese}</h3>
    })
  }

  renderMyWatchlist = ()=>{

    return this.state.allWatchlist.map((movie)=>{
      return <h3>{movie.title_japanese}</h3>
    })
  }

  renderMyActivity = ()=>{

    return this.state.allActivity.map((movie)=>{
      return <h3>{movie.title_japanese}</h3>
    })
  }

  renderMyRatings = ()=>{

    return this.state.allRatings.map((movie)=>{
      return <h3>{movie.title_japanese}</h3>
    })
  }


  render(){
    return(
      <div>
        <h2>Welcome, {this.props.isLogged.username}</h2>
        {this.state.allFavoutires.length > 0 && this.allFavoutires()}
        {this.state.allWatchlist.length > 0 && this.allWatchlist()}
        {this.state.allActivity.length > 0 && this.allActivity()}
        {this.state.allRatings.length > 0 && this.allRatings()}
      </div>
    )    
  }
}

export default MyAccount