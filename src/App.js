import "./styles/App.css";

import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MyNavBar from "./components/SearchbarComponent/Navbar";
import SignUp from "./components/AuthComponent/SignUp";
import LogIn from "./components/AuthComponent/LogIn";
import Home from "./components/LayoutComponent/Home";
import Footer from "./components/LayoutComponent/Footer";

import Upcomings from "./components/MovieComponent/Upcomings";
import NowOnCinemas from "./components/MovieComponent/NowOnCinemas";
import TopRated from "./components/MovieComponent/TopRated";
import Details from "./components/MovieComponent/Details";
import Trendings from "./components/MovieComponent/Trendings";
import ActorsDetails from "./components/MovieComponent/ActorsDetails";
import SearchResult from "./components/SearchbarComponent/SearchResult";
import MyAccount from "./components/MyAccountComponent/MyAccount";
import Favourites from "./components/MyAccountComponent/Favourites";
import Watchlist from "./components/MyAccountComponent/Watchlist";
import DiaryForm from "./components/DiaryComponent/DiaryForm";
import Diary from "./components/DiaryComponent/Diary";
import ReviewForm from "./components/ReviewComponent/ReviewForm";


import UserService from "./services/UserService";
import DiaryService from "./services/DiaryService";
import ReviewService from "./services/ReviewService";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: "",
      isLoggedIn: false,
      newUser: {
        name: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
      },
      newDiary: {
        movieID: "",
        date: "",
        place: "",
        people: "",
        notes: "",
        userId: "",
      },
      newReview: {
        movieID: "",
        reviewText: "",
        username: "",
        userId: "",
      },
      loggingUser: { email: "", password: "" },
      searchedWord: "",
      message: "",
      searchURL: "",
      searchResult: [],
      loginResult: "",
      submitDiaryCheck: false
    };
    this.service = new UserService();
    this.serviceDiary = new DiaryService();
    this.serviceReview = new ReviewService();
  }

  // AUTH CONFIG

  // Sign up
  submitSignUp = (event) => {
    event.preventDefault();
    this.service
      .signup(
        this.state.newUser.name,
        this.state.newUser.lastName,
        this.state.newUser.username,
        this.state.newUser.email,
        this.state.newUser.password
      )
      .then((result) => {
        this.setState({ message: result.message });
        this.checkIfLoggedIn();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changeHandlerSignUp = (_eventTarget) => {
    this.setState({
      newUser: {
        ...this.state.newUser,
        [_eventTarget.name]: _eventTarget.value,
      },
    });
  };

  // Log in
  submitLogIn = (event) => {
    event.preventDefault();
    this.service
      .login(this.state.loggingUser.email, this.state.loggingUser.password)
      .then((result) => {
        console.log(result.message)
           this.setState({ message: result.message, isLoggedIn: true, isLogged: result});

        // this.setState({ isLogged: result});
        // this.setState({ message: result.message, isLoggedIn: true });
        // this.checkIfLoggedIn();
      })

      .catch((err) => {
        console.log(err);
      });
  };

  changeHandlerLogIn = (_eventTarget) => {
    this.setState({
      loggingUser: {
        ...this.state.loggingUser,
        [_eventTarget.name]: _eventTarget.value,
      },
    });
  };

  checkIfLoggedIn = () => {
    this.service.loggedin().then((result) => {
      this.setState({ isLogged: result });
    });
  };

  // Log out
  logOut = () => {
    this.service
      .logout()
      .then((result) => {
        console.log(result);
        this.checkIfLoggedIn();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // DIARY FORM CONFIG
  submitDiaryForm = (event) => {
    event.preventDefault();

    this.serviceDiary
      .diary(
        this.state.newDiary.movieID,
        this.state.newDiary.date,
        this.state.newDiary.place,
        this.state.newDiary.people,
        this.state.newDiary.notes,
        this.state.newDiary.userID
      )
      .then((result) => {
        this.setState({ message: result.message });
        this.checkIfLoggedIn();
        this.setState({submitDiaryCheck: true})
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changeHandlerDiary = (_eventTarget) => {
    this.setState({
      newDiary: {
        ...this.state.newDiary,
        [_eventTarget.name]: _eventTarget.value,
      },
    });
  };

  // REVIEW FORM CONFIG
  submitReviewForm = (event) => {
    event.preventDefault();
    console.log("soy review submit");
    this.serviceReview
      .review(
        this.state.newReview.movieID,
        this.state.newReview.reviewText,
        this.state.newReview.username,
        this.state.newReview.userID
      )
      .then((result) => {
        console.log(result);
        this.setState({ message: result.message });
        this.checkIfLoggedIn();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changeHandlerReview = (_eventTarget) => {
    this.setState({
      newReview: {
        ...this.state.newReview,
        [_eventTarget.name]: _eventTarget.value,
      },
    });
  };

  // SEARCHBAR CONFIG
  changeSearchedWord = (_value) => {
    this.setState({
      searchedWord: _value,
    });
  };

  searchInit = () => {
    window.location.href = `/search/${this.state.searchedWord}/results`;
  };

  componentDidMount() {
    this.checkIfLoggedIn();
  }

  render() {
    return (
      <div className="App">
        {/* NAVBAR COMPONENT */}

        <MyNavBar
          isLogged={this.state.isLogged}
          logOut={this.logOut}
          goToSearchResults={this.goToSearchResults}
          changeSearchedWord={this.changeSearchedWord}
          searchInit={this.searchInit}
        />

        <Switch>
          {/* AUTH ROUTES */}

          <Route
            exact
            path="/"
            render={() => (
              <Home
                logOut={this.logOut}
                isLogged={this.state.isLogged}
                title={this.state.title}
              />
            )}
          />

          {!this.state.isLogged._id ? (
            <Route
              path="/signup"
              render={() => (
                <SignUp
                  submitSignUp={this.submitSignUp}
                  newUser={this.state.newUser}
                  changeHandlerSignUp={this.changeHandlerSignUp}
                  isLogged={this.state.isLogged}
                  message={this.state.message}
                  redirect={this.redirect}
                />
              )}
            />
          ) : (
            <Route path="/signup" render={() => <Redirect to="/" />} />
          )}

          {!this.state.isLogged._id ? (
            <Route
              path="/login"
              render={() => (
                <LogIn
                  submitLogIn={this.submitLogIn}
                  newUser={this.state.newUser}
                  isLogged={this.state.isLogged}
                  loggingUser={this.state.loggingUser}
                  changeHandlerLogIn={this.changeHandlerLogIn}
                  message={this.state.message}
                />
              )}
            />
          ) : (
            <Route path="/login" render={() => <Redirect to="/" />} />
          )}
     

          {/* MOVIE ROUTES */}

          <Route exact path="/nowoncinemas" component={NowOnCinemas} />

          <Route
            exact
            path="/details/:id"
            render={(props) => {
              return (
                <Details
                  {...props}
                  isLogged={this.state.isLogged}
                  submitReviewForm={this.submitReviewForm}
                  newReview={this.state.newReview}
                  changeHandlerReview={this.changeHandlerReview}
                  message={this.state.message}
                />
              );
            }}
          />

          <Route exact path="/toprated" component={TopRated} />

          <Route
            exact
            path="/details/:id"
            render={(props) => {
              return <Details {...props} isLogged={this.state.isLogged} />;
            }}
          />

          <Route exact path="/trendings" component={Trendings} />

          <Route
            exact
            path="/details/:id"
            render={(props) => {
              return <Details {...props} isLogged={this.state.isLogged} />;
            }}
          />

          <Route exact path="/upcomings" component={Upcomings} />

          <Route
            exact
            path="/details/:id"
            render={(props) => {
              return <Details {...props} isLogged={this.state.isLogged} 
              newReview={this.state.newReview}
              changeHandlerReview={this.changeHandlerReview}
              />;
            }}
          />

          <Route exact path="/details/actors/:id" component={ActorsDetails} />


          <Route
            path="/details/actors/:id/:title"
            render={(props) => (
              <Details
                {...props}
                submitLogIn={this.submitLogIn}
                newUser={this.state.newUser}
                isLogged={this.state.isLogged}
                loggingUser={this.state.loggingUser}
                changeHandlerLogIn={this.changeHandlerLogIn}
                message={this.state.message}
              />
            )}
          />

          {this.state.isLogged._id && (
            <Route
              exact
              path="/myaccount/watchlist"
              render={() => <Watchlist isLogged={this.state.isLogged} />}
            />
          )}

          <Route
            exact
            path="/myaccount/watchlist/:id"
            render={(props) => {
              return <Details {...props} isLogged={this.state.isLogged} />;
            }}
          />

          {/* SEARCHBAR ROUTES */}

          <Route
            exact
            path="/search/:id/details"
            render={(props) => {
              return <Details {...props} isLogged={this.state.isLogged} />;
            }}
          />

          <Route
            exact
            path="/search/:id/results"
            render={(props) => {
              return (
                <SearchResult
                  {...props}
                  searchedWord={this.state.searchedWord}
                  isLogged={this.state.isLogged}
                />
              );
            }}
          />
          <Route
            exact
            path="/search/:id/results/:page"
            component={SearchResult}
            isLogged={this.state.isLogged}
          />

          <Route
            exact
            path="/search/:id/details"
            render={(props) => {
              return <Details {...props} isLogged={this.state.isLogged} />;
            }}
          />

          {/* MYACCOUNT ROUTES */}

          {this.state.isLogged._id && (
            <Route
              path="/myaccount/myprofile"
              render={() => <MyAccount isLogged={this.state.isLogged} />}
            />
          )}

          {this.state.isLogged._id && (
            <Route
              exact
              path="/myaccount/favourites"
              render={() => <Favourites isLogged={this.state.isLogged} />}
            />
          )}

          <Route
            exact
            path="/myaccount/favourites/:id"
            render={(props) => {
              return <Details {...props} isLogged={this.state.isLogged} />;
            }}
          />

          {/* DIARY ROUTES */}

          {this.state.isLogged._id && (
            <Route
              exact
              path="/myaccount/diary"
              render={(props) => {
                return (
                  <Diary
                    {...props}
                    newDiary={this.state.newDiary}
                    changeHandlerDiary={this.changeHandlerDiary}
                    message={this.state.message}
                    isLogged={this.state.isLogged}
                  />
                );
              }}
            />
          )}


         



          {!this.state.submitDiaryCheck ? (
            <Route
              exact
              path="/myaccount/diary/:id"
              render={(props) => (
                <DiaryForm
                  {...props}
                  submitDiaryForm={this.submitDiaryForm}
                  newDiary={this.state.newDiary}
                  changeHandlerDiary={this.changeHandlerDiary}
                  isLogged={this.state.isLogged}
                  message={this.state.message}
                />
              )}
            />
          ) :  <Route
              exact
              path="/myaccount/diary/:id"
              render={() => <Redirect to="/myaccount/diary"/>}
            />
          }

          {/* REVIEW ROUTH */}

          {this.state.isLogged._id && (
            <Route
              exact
              path="/details/:id"
              render={(props) => {
                return (
                  <Diary
                    {...props}
                    message={this.state.message}
                    isLogged={this.state.isLogged}
                    newReview={this.state.newReview}
                  />
                );
              }}
            />
          )}

          {this.state.isLogged._id && (
            <Route
              exact
              path="/review/:id"
              render={(props) => (
                <Details
                  {...props}
                  submitReviewForm={this.submitReviewForm}
                  newReview={this.state.newReview}
                  changeHandlerReview={this.changeHandlerReview}
                  isLogged={this.state.isLogged}
                  message={this.state.message}
                />
          
              )}
            />
          )}
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
