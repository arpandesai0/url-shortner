import React from "react";

function Card({ title, text }) {
  return (
    <div className="w-1/4 flex flex-col gap-1 drop-shadow-lg h-60 bg-stone-200	px-4 pt-4 rounded-md">
      <p className="font-bold text-lg text-stone-700">{title}</p>
      <p>{text}</p>
    </div>
  );
}

export default Card;
