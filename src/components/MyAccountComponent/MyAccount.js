// import React from "react";
// import MyAccountService from "../../services/MyAccountService";

// class MyAccount extends React.Component {
//   state = {
//     favourites: [],
//     watchlist: [],
//     activity: [],
//     allFavourites: [],
//     allWatchlist: [],
//     allActivity: [],
//   };

//   service = new MyAccountService();

//   componentDidMount() {
//     this.service
//       .myProfile(this.props.isLogged._id)
//       .then((response) => {
//         this.setState({
//           favourites: [...response.favourites],
//           watchlist: [...response.watchlist],
//           activity: [...response.activity],
//         });
//         this.myFavourites();
//         this.myWatchlist();
//         this.myActivity();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   myFavourites = () => {
//     const favouritesMap = this.state.favourites.map((_id) => {
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

//     Promise.all(favouritesMap).then((result) => {
//       this.setState({ allFavourites: result });
//     });
//   };

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

//   renderMyFavourites = () => {
//     return this.state.allFavourites.map((movie) => {
//       return (
//         <h3>
//           {movie.title}
//           <p>hola</p>
//         </h3>
//       );
//     });
//   };

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

//   render() {
//     return (
//       <div>
//         {this.renderMyFavourites()}
//         <h2>Welcome, {this.props.isLogged.username}</h2>
//         {this.state.allFavourites.length > 0 && this.renderMyFavourites()}
//         {this.state.allWatchlist.length > 0 && this.renderMyWatchlist()}
//         {this.state.allActivity.length > 0 && this.renderMyActivity()}
//       </div>
//     );
//   }
// }

// export default MyAccount;
