import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router";

function Redirect() {
  const { id } = useParams();
  useEffect(() => {
    axios
      .post("/get-url/" + id)
      .then((res) => (window.location.href = res.data.url));
  }, []);

  // temp(id);
  // window.location.href =
  //   "https://stackoverflow.com/questions/42914666/react-router-external-link";
  return (
    <div className="absolute top-0 w-screen h-screen bg-white z-10">
      <p className="text-lg text-bold">Redirecting...</p>
    </div>
  );
}

export default Redirect;
