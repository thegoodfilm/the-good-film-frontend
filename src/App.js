import "./styles/App.css";
import React from "react";
import MyNavBar from "./components/Navbar";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import Home from "./components/Home";
import Upcomings from "./components/Upcomings";
import { Route, Redirect } from "react-router-dom";
import NowOnCinemas from "./components/NowOnCinemas";
import TopRated from "./components/TopRated";
import Details from "./components/Details";
import UserService from "./services/UserService";
import Trendings from "./components/Trendings";
import ActorsDetails from "./components/ActorsDetails";
import SearchResult from "./components/SearchResult";
import MyAccount from "./components/MyAccount";
import MyList from "./components/MyList";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: {},
      newUser: {
        name: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
      },
      loggingUser: { email: "", password: "" },
      searchedWord: "",
      message: "",
      searchURL: "",
      searchResult: [],
      loginResult: "",
    };
    this.service = new UserService();
  }

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
        if (this.loginResult === "ok") {
          console.log(this.loginResult);
          // window.location.href="/"
        } else {
          <Redirect to="/signup" />;
        }
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

  submitLogIn = (event) => {
    event.preventDefault();
    this.service
      .login(this.state.loggingUser.email, this.state.loggingUser.password)
      .then((result) => {
        this.setState({ message: result.message });

        // if(this.state.redirect === true) {
        //   <Redirect to="/" />;
        // } else {
        //   <Redirect to="/login" />
        // }
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
    // if(this.state.redirect === true) {
    //   return(
    //     window.location.href="/"

    //   )
    //   }

    return (
      <div className="App">
        <MyNavBar
          isLogged={this.state.isLogged}
          logOut={this.logOut}
          goToSearchResults={this.goToSearchResults}
          changeSearchedWord={this.changeSearchedWord}
          searchInit={this.searchInit}
        />

        <Route
          path="/signup"
          render={() =>
            this.state.isLogged._id ? (
              <Redirect to="/" />
            ) : (
              <SignUp
                submitSignUp={this.submitSignUp}
                newUser={this.state.newUser}
                changeHandlerSignUp={this.changeHandlerSignUp}
                isLogged={this.state.isLogged}
                message={this.state.message}
              />
            )
          }
        />

        <Route
          path="/login"
          render={() =>
            this.state.isLogged._id ? (
              <Redirect to="/" />
            ) : (
              <LogIn
                submitLogIn={this.submitLogIn}
                newUser={this.state.newUser}
                isLogged={this.state.isLogged}
                loggingUser={this.state.loggingUser}
                changeHandlerLogIn={this.changeHandlerLogIn}
                message={this.state.message}
              />
            )
          }
        />

        <Route
          exact
          path="/nowoncinemas/:id"
          render={(props) => {
            return <Details {...props} isLogged={this.state.isLogged} />;
          }}
        />

        <Route
          exact
          path="/toprated/:id"
          render={(props) => {
            return <Details {...props} isLogged={this.state.isLogged} />;
          }}
        />
        <Route
          exact
          path="/trendings/:id"
          render={(props) => {
            return <Details {...props} isLogged={this.state.isLogged} />;
          }}
        />
        <Route
          exact
          path="/upcomings/:id"
          render={(props) => {
            return <Details {...props} isLogged={this.state.isLogged} />;
          }}
        />

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

        <Route exact path="/upcomings" component={Upcomings} />

        <Route exact path="/nowoncinemas" component={NowOnCinemas} />

        <Route exact path="/toprated" component={TopRated} />
        <Route exact path="/trendings" component={Trendings} />

        <Route exact path="/details/actors/:id" component={ActorsDetails} />
        <Route exact path="/details/actors/:id/:title" component={Details} />

        <Route exact path="/search/:id/details" component={Details} />
        <Route
          exact
          path="/search/:id/results/:page"
          component={SearchResult}
        />

        {/* <Route
          path="/search/:value/results"
                  render={() => (
            <SearchResult
            searchedWord={this.state.searchedWord}
   
            />
          )}
        /> */}
        {this.state.isLogged._id && (
          <Route
            path="/myaccount/myprofile"
            render={() => <MyAccount isLogged={this.state.isLogged} />}
          />
        )}
        {this.state.isLogged._id && (
          <Route
            path="/myaccount/mylists"
            render={() => <MyList isLogged={this.state.isLogged} />}
          />
        )}

        <Route
          exact
          path="/search/:id/results"
          render={(props) => {
            return (
              <SearchResult {...props} searchedWord={this.state.searchedWord} />
            );
          }}
        />
      </div>
    );
  }
}

export default App;
