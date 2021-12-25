import React from "react";
import LineCard from "./LineCard";
import mongoDB from "../assets/mongo.jpg";
import react from "../assets/react-logo.png";
import express from "../assets/express.png";
import node from "../assets/nodejs-logo.png";
import talwind from "../assets/talwind.svg";
function AboutUs() {
  const data = [
    { title: "NodeJS", logo: node },
    { title: "ExpressJS", logo: express },
    { title: "MongoDB", logo: mongoDB },
    { title: "ReactJS", logo: react },
    { title: "TalwindCSS", logo: talwind },
  ];
  return (
    <div className="h-screen px-16 flex flex-col gap-2">
      <p className="pt-24 text-4xl font-bold tracking-wide">Hi,</p>
      <p className="text-2xl font-semibold tracking-wide">
        I am &nbsp; &nbsp;
        <span className="text-4xl font-bold tracking-wide text-sky-500	">
          Arpan Desai
        </span>
      </p>
      <p className="text-xl font-semibold tracking-wide">
        This is a small url shortning project made by me. Currently you can only
        track the clicks on an URL. However features like ip tracking, regional
        graphs are under development.
      </p>
      <p className="text-xl font-semibold tracking-wide">
        This project is focused mainly on backend services so igonore the bad UI
        😅
      </p>
      <p className="text-xl font-semibold tracking-wide my-4">
        Techstack used:
      </p>
      <div className="grid grid-cols-3 gap-y-4">
        {data.map((item, index) => (
          <LineCard key={index} title={item.title} logo={item.logo} />
        ))}
      </div>
    </div>
  );
}

export default AboutUs;
