import React, { useRef, useState } from "react";
import Loader from "./Loader/Loader";
import arrow from "../assets/arrow.png";
import axios from "axios";
function Track() {
  const [loader, setLoader] = useState(false);
  const [response, setResponse] = useState({});
  const div = useRef(null);
  const baseURL = process.env.REACT_APP_BASEURL;
  const [data, setData] = useState({ url: "", password: "" });
  const [isEmpty, setIsEmpty] = useState({ url: false, password: false });
  const handleSubmit = () => {
    setLoader(true);
    if (data.url.length === 0) {
      setIsEmpty({ ...isEmpty, url: true });
      setLoader(false);
      return;
    }
    if (data.password.length === 0) {
      setIsEmpty({ ...isEmpty, password: true });
      setLoader(false);
      return;
    }
    setIsEmpty({ url: false, password: false });
    axios
      .post("/analytics", {
        shortId: data.url.slice(baseURL.length + 1),
        password: data.password,
      })
      .then((res) => {
        console.log(res.data);
        setResponse(res.data);
        try {
          div.current.scrollIntoView();
        } catch {
          console.log("error");
        }
        setLoader(false);
      });
  };

  return (
    <div className="w-screen  px-16">
      <div className="h-screen">
        <div>
          <p className="pt-48 text-6xl font-bold tracking-wide">
            Track your urls
          </p>
        </div>
        <div className="w-8/12 flex flex-col gap-2 pt-24">
          <div className="flex">
            <div className="w-full flex flex-col gap-1">
              {isEmpty.url ? (
                <p className="text-red-600 animate-bounce ">
                  Enter a valid url
                </p>
              ) : response.ok == -1 ? (
                <p className="text-red-600 animate-bounce ">
                  Url does not exist
                </p>
              ) : (
                <p className="">Enter short url</p>
              )}

              <input
                placeholder={"Eg. " + baseURL + "/xxxxxxx"}
                className="outline-0 p-3 w-full"
                onChange={(e) => setData({ ...data, url: e.target.value })}
              />
            </div>
            <div className="w-max mx-1 flex flex-col gap-1">
              {isEmpty.password ? (
                <p className="text-red-600 animate-bounce ">Enter password</p>
              ) : response.ok == -2 ? (
                <p className="text-red-600 animate-bounce ">
                  Enter a valid password
                </p>
              ) : (
                <p className="">Enter password</p>
              )}

              <input
                placeholder="Enter password"
                className="outline-0 p-3 "
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
          </div>
          <div className="mx-1 ">
            <button
              className="group w-full p-4 flex  items-center bg-black text-white justify-center"
              onClick={handleSubmit}
            >
              {loader ? (
                <Loader />
              ) : (
                <div className="flex gap-2  items-center">
                  <p>Generate Short Url</p>
                  <div>
                    <img
                      className="h-4 w-4 group-hover:translate-x-2 duration-200"
                      src={arrow}
                      alt=""
                    />
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
      {response.ok == 1 && (
        <div ref={div} className="h-screen pt-24">
          <div className="flex items-center justify-between	pb-8">
            <p className="text-3xl font-bold tracking-wide">Analytics:</p>
            <button onClick={handleSubmit} className="bg-black text-white p-2">
              Refresh
            </button>
          </div>
          <div>
            <p className="text-lg font-medium tracking-wide">Short URL:</p>
            <a
              href={
                process.env.REACT_APP_HOSTURL + "/" + response.analytics.shortId
              }
              target="_blank"
              rel="noreferrer"
              className="text-xl font-medium tracking-wide hover:text-blue-400"
            >
              {process.env.REACT_APP_HOSTURL + "/" + response.analytics.shortId}
            </a>
          </div>
          <div className="pt-8 flex gap-16">
            <div>
              <p className="text-lg font-medium tracking-wide">Original URL:</p>
              <a
                href={response.url}
                target="_blank"
                rel="noreferrer"
                className="text-xl font-medium tracking-wide hover:text-blue-400"
              >
                {response.url}
              </a>
            </div>
            <div>
              <p className="text-lg font-medium tracking-wide">Clicks:</p>
              <p className="text-xl font-medium tracking-wide">
                {response.analytics.clicks}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Track;
