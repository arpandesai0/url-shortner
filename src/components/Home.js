import axios from "axios";
import React, { useRef, useState } from "react";
import Loader from "./Loader/Loader";
import copy from "../assets/copy.png";
import goto from "../assets/go-to.png";
import arrow from "../assets/arrow.png";
import Card from "./Card";
function Home() {
  const base = process.env.REACT_APP_HOSTURL;
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({ url: "", password: "" });
  const [response, setResponse] = useState({ ok: true });
  const [isEmpty, setIsEmpty] = useState({ url: false, password: false });
  const [copied, setCopied] = useState(false);
  const div = useRef(null);
  const handleSubmit = async () => {
    setLoader(true);
    console.log(data);
    if (data.url.length === 0) {
      setIsEmpty({ ...isEmpty, message: true });
      setLoader(false);
      return;
    }
    if (data.password.length === 0) {
      setIsEmpty({ ...isEmpty, password: true });
      setLoader(false);
      return;
    }
    setIsEmpty({ url: false, password: false });
    //perform api req
    axios.post("/create", data).then((res) => {
      console.log(res.data);
      setResponse(res.data);
      try {
        div.current.scrollIntoView();
      } catch {
        console.log("error");
      }
      setLoader(false);
    });
    //
  };
  const cardData = [
    {
      title: "Inspire trust",
      text: "With more clicks comes increased brand recognition and consumer trust in your communications—which in turn inspires even more engagement with your links. (It’s a wonderful cycle.)",
    },
    {
      title: "Boost results",
      text: "On top of better deliverability and click-through, rich link-level data gives you crucial insight into your link engagement so your team can make smarter decisions around its content and communications.",
    },
    {
      title: "Gain control",
      text: "Take credit for your content and learn more about how it’s consumed by enabling auto-branding—a feature that ensures your brand remains in any link someone shortens pointing to your website.",
    },
  ];
  return (
    <div id="home" className=" h-screen px-16">
      <div className="w-80 h-8 bg-black absolute right-0 top-2/3 rotate-45" />
      <div className="w-80 h-8 bg-black absolute right-0 top-1/2 -rotate-45 flex items-center">
        <p className=" text-stone-200 px-4 tracking-widest">
          Start tracking your urls
        </p>
      </div>
      <div className="h-screen">
        <p className="pt-48 text-6xl font-bold tracking-wide">
          <span className="text-rose-600	underline underline-offset-8">
            Short
          </span>{" "}
          links,{" "}
          <span className="text-emerald-400 underline underline-offset-8">
            big
          </span>{" "}
          results
        </p>
        <p className="py-16 text-xl font-bold tracking-wide w-1/2">
          A URL shortener built with powerful tools to help you grow and protect
          your brand.
        </p>
        <div className="w-8/12 flex flex-col gap-4">
          <div className="flex">
            <div className="w-full flex flex-col gap-1">
              {isEmpty.message ? (
                <p className="text-red-600 animate-bounce ">Enter url:</p>
              ) : response.ok ? (
                <p>Enter url: </p>
              ) : (
                <p className="text-red-600 animate-bounce">
                  {response.message}
                </p>
              )}
              <input
                placeholder="Enter link to shorten"
                className="outline-0 p-3 w-full"
                onChange={(e) => setData({ ...data, url: e.target.value })}
              />
            </div>
            <div className="w-max mx-1 flex flex-col gap-1">
              {isEmpty.password ? (
                <p className="w-56 text-red-600 animate-bounce">
                  Enter password (for tracking)
                </p>
              ) : (
                <p className="w-56">Enter password (for tracking)</p>
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
      {response.shortId && (
        <div ref={div} className="h-screen pt-24 relative flex flex-col gap-12">
          {copied && (
            <div className="absolute bottom-16 left-auto w-full flex justify-center	copy-popup">
              <p
                className={
                  " text-center text-white bg-black/75 w-max p-3 ease-in-out duration-300 	"
                }
              >
                Link Copied
              </p>
            </div>
          )}
          <div>
            <p className="text-lg font-medium tracking-wide">
              Your original link is:
            </p>
            <div className="flex bg-white gap-4">
              <a
                rel="noreferrer"
                href={response.url}
                target="_blank"
                className="text-xl font-medium tracking-wide truncate w-3/4 hover:text-blue-400"
              >
                {response.url}
              </a>
            </div>
          </div>
          <div className="flex gap-16">
            <div>
              <p className="text-lg font-medium tracking-wide">
                Your shortened link is:
              </p>
              <div className="flex items-center bg-white gap-4">
                <p className="text-xl font-medium tracking-wide ">
                  {base + "/" + response.shortId}
                </p>
                <button
                  onClick={() => {
                    setCopied(true);
                    navigator.clipboard.writeText(
                      base + "/" + response.shortId
                    );
                  }}
                >
                  <img
                    alt=""
                    src={copy}
                    className="h-6 w-6"
                    title="Copy link"
                  />
                </button>
                <a
                  rel="noreferrer"
                  href={base + "/" + response.shortId}
                  target="_blank"
                >
                  <img
                    alt=""
                    src={goto}
                    className="h-6 w-6"
                    title="Go to link"
                  />
                </a>
              </div>
            </div>
            <div>
              <p className="text-lg font-medium tracking-wide">
                Your tracking password:
              </p>
              <div className="flex items-center bg-white gap-4">
                <p className="text-xl font-medium tracking-wide ">
                  {response.password}
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(response.password);
                    setCopied(true);
                  }}
                >
                  <img
                    alt=""
                    src={copy}
                    className="h-6 w-6"
                    title="Copy password"
                  />
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-t-2 pt-12">
            <p className="text-center font-semibold text-xl text-stone-700">
              The link shortener that has your brand’s back
            </p>
            <p className="text-center  text-lg text-stone-700">
              Your brand wasn’t built to be hidden. Help it stand out with
              branded links that drive more clicks.
            </p>
            <div className="flex items-center justify-around pt-4">
              {cardData.map((item, index) => (
                <Card key={index} title={item.title} text={item.text} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
