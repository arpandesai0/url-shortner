import React from "react";

function LineCard({ title, logo }) {
  return (
    <div className="bg-gray-300	w-48 p-3 rounded-lg hover:shadow-md">
      <div className="flex gap-4 items-center ">
        <p className="text-lg font-semibold">{title}</p>
        <img
          className="h-16 w-16 object-cover rounded-full"
          alt=""
          src={logo}
        />
      </div>
    </div>
  );
}

export default LineCard;
