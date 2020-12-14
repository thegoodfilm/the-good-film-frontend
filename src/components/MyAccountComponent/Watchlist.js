import React from "react";
import { Link } from "react-router-dom";

import MyAccountService from "../../services/MyAccountService";

class Watchlist extends React.Component {
  state = {
    watchlist: [],
    allWatchlist: [],
  };

  service = new MyAccountService();

  componentDidMount() {
    this.service
      .getUser(this.props.isLogged._id)
      .then((response) => {
        this.setState({
          watchlist: [...response.watchlist]
         
        });
        this.myWatchlist();
       
      })
      .catch((err) => {
        console.log(err);
      });
  }

  myWatchlist = () => {
    const watchlistMap = this.state.watchlist.map((_id) => {
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

    Promise.all(watchlistMap).then((result) => {
        console.log(result)
      this.setState({ allWatchlist: result });
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

renderMyWatchlist = () => {
    return this.state.allWatchlist.map((allWatchlist, index) => {
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${allWatchlist.poster_path}`;
      return (
 <Link to={`/myaccount/watchlist/${allWatchlist.id}`} key={index} name="top">
          <div>
            <div key={index}>
              <h3>{allWatchlist.title}</h3>
              <p>hola</p>
              <p>{allWatchlist.release_date}</p>
              <img src={poster} alt={allWatchlist.title} />
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
        <h2>{this.props.isLogged.username} watchlist</h2>
        {this.state.allWatchlist.length > 0 && this.renderMyWatchlist()}
        {/* {this.state.allWatchlist.length > 0 && this.renderMyWatchlist()}
        {this.state.allActivity.length > 0 && this.renderMyActivity()} */}
      </div>
    );
  }
}

export default Watchlist;
