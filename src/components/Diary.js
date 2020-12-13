import React from "react";
import { Link } from "react-router-dom";

import MyAccountService from "../services/MyAccountService";

class Diary extends React.Component {
    constructor(props){
        super(props)
       this.state = {
            movieID: [],
            movieIDAll: [],
           
    
 
  };

  this.service = new MyAccountService();

    }
  



  componentDidMount() {
    this.service
      .diary(this.props.isLogged._id)
      .then((response) => {
        this.setState({
            movieID: [...response.movieID]
         
        });
        this.myDiary();
       
      })
      .catch((err) => {
        console.log(err);
      });
  }

  myDiary = () => {
    const diaryMap = this.state.movieID.map((_id) => {
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

    Promise.all(diaryMap).then((result) => {
    
      this.setState({ movieIDAll: result });
    });
  };





renderMyDiary = () => {
    return this.state.movieIDAll.map((movieIDAll, index) => {
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${movieIDAll.poster_path}`;
      return (
 <Link to={`/myaccount/diary/${movieIDAll.id}`} key={index} name="top">
          <div>
            <div key={index}>
              <h3>{movieIDAll.original_title}</h3>
              <p>{movieIDAll.release_date}</p>
              <img src={poster} alt={movieIDAll.original_title} />
            </div>
          </div>
       </Link>
      );
    });
  };

  render() {
    return (
      <div>

        <h2>{this.props.isLogged.username} diary</h2>
        {this.state.movieIDAll.length > 0 && this.renderMyDiary()}
        {/* {this.state.allWatchlist.length > 0 && this.renderMyWatchlist()}
        {this.state.allActivity.length > 0 && this.renderMyActivity()} */}
      </div>
    );
  }
}

export default Diary;
