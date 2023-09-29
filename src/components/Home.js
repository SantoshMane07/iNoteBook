import React from "react";
import noteContext from "../context/notes/noteContext";
import Notes from "./Notes";

const Home = (props) => {
  
  return (
    <div className="my-3"> 
      <Notes showAlert={props.showAlert}/>
    </div>
  );
};

export default Home;
