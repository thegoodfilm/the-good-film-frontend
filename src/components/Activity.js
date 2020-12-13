import React from "react";
import { Link } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";

import MyAccountService from "../services/MyAccountService";

class Activity extends React.Component {

   state = {
      activity: [],
      allActivity: [],
    };
  


  service = new MyAccountService();

  componentDidMount() {
    this.service
      .getUser(this.props.isLogged._id)
      .then((response) => {
        this.setState({
          activity: [...response.activity]
         
        });
        this.myActivity();
       
      })
      .catch((err) => {
        console.log(err);
      });
  }

  myActivity = () => {
    const activitytMap = this.state.activity.map((_id) => {
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

    Promise.all(activitytMap).then((result) => {
      this.setState({ allActivity: result });
    });
  };





  // deleteActivity = (movieID) => {
  //   console.log('burro')
  //   console.log(this.state.allActivity)
  //   const activityCopy = [...this.state.allActivity]; // <== notice the spread operator here!
  //   activityCopy.splice(movieID, 1);
  //   this.setState({
  //     allActivity: activityCopy
  //   })
  // }

  renderButton = () => {
   
    return (
      <div>
       
        <button onClick={() => this.deleteActivity()}>Remove</button>

      </div>
    );
  

  }

renderMyActivity = (props) => {
    return this.state.allActivity.map((allActivity, index) => {
      const poster = `${process.env.REACT_APP_BASEURLPOSTER}${allActivity.poster_path}`;
      return (
        <div> 
         <Link to={`/myaccount/activity/${allActivity.id}`} key={index} name="top">
          <div>
            <div key={index}>
              <h3>{allActivity.title}</h3>
           
              <p>{allActivity.release_date}</p>
              <img src={poster} alt={allActivity.title} />
              

            </div>
          </div>
       </Link>
       </div>
      );
    });
  };








  render() {
    return (
      <div>

      
        <h2>{this.props.isLogged.username} activity</h2>
        {this.state.allActivity.length > 0 && this.renderMyActivity()}
        {/* {this.state.allWatchlist.length > 0 && this.renderMyWatchlist()}
        {this.state.allActivity.length > 0 && this.renderMyActivity()} */}
     
      </div>
    );
  }
}

export default Activity;
