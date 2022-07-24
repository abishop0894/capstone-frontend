import React, { useState, useEffect } from "react";

function AllData() {
  const [data, setData] = useState("");

  useEffect((e) => {
    // fetch all accounts from API
    fetch("https://albisproject.herokuapp.com/account/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(JSON.stringify(data));
      });
  }, []);

  return (
    <>
      <h5>All Data in Store:</h5>
      {data}
    </>
  );
}

export default AllData;
