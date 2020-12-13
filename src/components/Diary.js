import React from "react";

import { Link } from "react-router-dom";

import UserService from "../services/UserService";

class Diary extends React.Component {

   state = {
      diary: [],
      allDiary: [],
    };
  


  service = new UserService();

  componentDidMount() {
    fetch(
      `localhost:3000/myaccount/diary`
    )
      .then((data) => {

        return data.json();
      })
      .then((dataJSON) => {

        this.setState({
          diary: dataJSON,
        });
      })

      .catch((err) => {
        console.log(err);
      });
  }

//  diary = () => {
//     const diaryMap = this.state.diary.map((_id) => {
//       return fetch(
//         `${process.env.REACT_APP_BASEURL}/${_id}?api_key=${process.env.REACT_APP_KEY}&language=en-US`
//       )
//       .then((data)=>{
//         return data.json()
//       })
//       .then((dataJSON)=>{
//         return dataJSON
//       })

      
//     })

//     Promise.all(diaryMap).then((result) => {
//       this.setState({ allDiary: result });
//     });
//   };





//   // deleteActivity = (movieID) => {
//   //   console.log('burro')
//   //   console.log(this.state.allActivity)
//   //   const activityCopy = [...this.state.allActivity]; // <== notice the spread operator here!
//   //   activityCopy.splice(movieID, 1);
//   //   this.setState({
//   //     allActivity: activityCopy
//   //   })
//   // }

//   renderButton = () => {
   
//     return (
//       <div>
       
//         <button onClick={() => this.deleteActivity()}>Remove</button>

//       </div>
//     );
  

//   }

// renderDiary = (props) => {
//     return this.state.allDiary.map((allDiary, index) => {
//       const poster = `${process.env.REACT_APP_BASEURLPOSTER}${allDiary.poster_path}`;
//       return (
//         <div> 
//          <Link to={`/myaccount/allDiary/${allDiary.id}`} key={index} name="top">
//           <div>
//             <div key={index}>
//               <h3>{allDiary.title}</h3>
           
//               <p>{allDiary.release_date}</p>
//               <img src={poster} alt={allDiary.title} />
              

//             </div>
//           </div>
//        </Link>
//        </div>
//       );
//     });
//   };








  render() {
    return (
      <div>

{/*       
        <h2>{this.props.isLogged.username} diary</h2>
        {this.state.allDiary.length > 0 && this.renderDiary()}
        {/* {this.state.allWatchlist.length > 0 && this.renderMyWatchlist()}
        {this.state.allActivity.length > 0 && this.renderMyActivity()} */}

      </div>
    );
  }
}

export default Diary;
