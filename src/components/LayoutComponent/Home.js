import React from "react";

const Home = (props) => {

  return (
    <div>
      <p>HOME</p>
      <h3>{props.isLogged.email && `Welcome, ${props.isLogged.name}`}</h3>
    </div>
  );
};

export default Home;
