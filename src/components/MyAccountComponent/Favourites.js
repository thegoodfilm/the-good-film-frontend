import React from "react";
import { Link } from "react-router-dom";

import MyAccountService from "../../services/MyAccountService";

class Favourites extends React.Component {
  state = {
    favourites: [],
    allFavourites: [],
  };

  service = new MyAccountService();

  componentDidMount() {
    this.service
      .getUser(this.props.isLogged._id)
      .then((response) => {
        this.setState({
          favourites: [...response.favourites]
         
        });
        this.myFavourites();
       
      })
      .catch((err) => {
        console.log(err);
      });
  }

  myFavourites = () => {
    const favouritesMap = this.state.favourites.map((_id) => {
      return fetch(
        `${process.env.REACT_APP_BASEURL}/${_id}?api_key=${process.env.REACT_APP_KEY}&language=en-US`
      )
      .then((data)=>{
        return data.json()
      })
      .then((dataJSON)=>{
        return dataJSON
      })
    })

    Promise.all(favouritesMap).then((result) => {
        console.log(result)
      this.setState({ allFavourites: result });
    });
  };



  
//   myWatchlist = () => {
//     const watchlistMap = this.state.watchlist.map((_id) => {
//       return fetch(
//         `${process.env.REACT_APP_BASEURL}/${_id}?api_key=${process.env.REACT_APP_KEY}&append_to_response=videos`
//       )
//         .then((data) => {
//           return data.json();
//         })
//         .then((dataJSON) => {
//           return dataJSON;
//         });
//     });

//     Promise.all(watchlistMap).then((result) => {
//       this.setState({ allWatchlist: result });
//     });
//   };

//   myActivity = () => {
//     const activityMap = this.state.activity.map((_id) => {
//       return fetch(
//         `${process.env.REACT_APP_BASEURL}/${_id}?api_key=${process.env.REACT_APP_KEY}&append_to_response=videos`
//       )
//         .then((data) => {
//           return data.json();
//         })
//         .then((dataJSON) => {
//           return dataJSON;
//         });
//     });

//     Promise.all(activityMap).then((result) => {
//       this.setState({ allActivity: result });
//     });
//   };

renderMyFavourites = () => {
    return this.state.allFavourites.map((allFavourites, index) => {
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${allFavourites.poster_path}`;
      return (
 <Link  name="top" to={`/myaccount/favourites/${allFavourites.id}`} key={index} name="top">
          <div>
            <div key={index}>
              <h3>{allFavourites.original_title}</h3>
              <p>{allFavourites.release_date}</p>
              <img src={poster} alt={allFavourites.original_title} />
            </div>
          </div>
       </Link>
      );
    });
  };

//   renderMyWatchlist = () => {
//     return this.state.allWatchlist.map((movie) => {
//       return <h3>{movie.title}</h3>;
//     });
//   };

//   renderMyActivity = () => {
//     return this.state.allActivity.map((movie) => {
//       return <h3>{movie.title}</h3>;
//     });
//   };

  render() {
    return (
      <div>

        <h2>Welcome, {this.props.isLogged.username}</h2>
        {this.state.allFavourites.length > 0 && this.renderMyFavourites()}
        {/* {this.state.allWatchlist.length > 0 && this.renderMyWatchlist()}
        {this.state.allActivity.length > 0 && this.renderMyActivity()} */}
      </div>
    );
  }
}

export default Favourites;
