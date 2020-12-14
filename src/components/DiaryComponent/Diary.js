import React from "react";
import { Link } from "react-router-dom";

import DiaryService from "../../services/DiaryService";

class Diary extends React.Component {
  state = {
    diary: [],
    allDiary: []
  };

  service = new DiaryService();

  componentDidMount() {
    this.service
      .getDiary(this.props.isLogged._id)
      .then((response) => {
        console.log(response);

        this.setState({
          diary: [...response],
        });
       
    
      })
      .catch((err) => {
        console.log(err);
      });
  }




  

  renderMyDiary = () => {
    return this.state.diary.map((diary, index) => {
          

      return (
        <div>
          <div key={index}>

            <p>{diary.movieID}</p>
            <p>{diary.date}</p>
            <p>{diary.place}</p>
            <p>{diary.people}</p>
            <p>{diary.notes}</p>
          </div>
        </div>
      );
    });
  };

  myWatchlist = () => {
    const watchlistMap = this.state.diary.map((_id) => {
      return fetch(
        `${process.env.REACT_APP_BASEURL}/${_id.movieID}?api_key=${process.env.REACT_APP_KEY}&append_to_response=videos`
      )
        .then((data) => {
          return data.json();
        })
        .then((dataJSON) => {
          return dataJSON;
        });
    });

    Promise.all(watchlistMap).then((result) => {
      this.setState({ allDiary: result });
    });
  };


  render() {
    return (
      <div>
        <h2>Welcome, {this.props.isLogged.username}</h2>
        {this.renderMyDiary()}
        {/* {this.renderDetails()} */}
        {/* {this.state.allFavourites.length > 0 && this.renderMyFavourites()}
        {/* {this.state.allWatchlist.length > 0 && this.renderMyWatchlist()}
        {this.state.allActivity.length > 0 && this.renderMyActivity()} */}
      </div>
    );
  }
}

export default Diary;
