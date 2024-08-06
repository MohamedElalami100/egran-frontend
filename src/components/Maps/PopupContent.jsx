import React from "react";

const PopupContent = ({ message, onClick }) => {
  return (
    <div>
      <p>{message}</p>
      <button onClick={onClick}>View Images</button>
    </div>
  );
};

export default PopupContent;
