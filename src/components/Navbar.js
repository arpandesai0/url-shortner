import React from "react";

function Navbar() {
  const routes = [
    { route: "/", label: "Home" },
    { route: "/track", label: "Track" },
    { route: "/about", label: "About Us" },
  ];
  return (
    <div className="bg-black/[0.5] flex gap-8 px-2 py-3 fixed top-0 w-screen items-center justify-center  z-10">
      <div className="flex gap-8">
        {routes.map((item, index) => (
          <a
            key={index}
            href={item.route}
            className="text-stone-200 hover:text-stone-50"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
