import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between max-w-6xl mx-auto p-3 items-center">
        <Link to={"/"}>
          <h1 className="font-bold">AUTH APP</h1>
        </Link>

        <ul className="flex gap-10">
          <Link to={"/home"}>
            <li className="font-semibold hover:text-slate-800">Home</li>
          </Link>

          <Link to={"/about"}>
            <li className="font-semibold hover:text-slate-800">About</li>
          </Link>

          <Link to={"/profile"}>
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                className="w-7 rounded-full object-cover w-7"
              />
            ) : (
              <li className="font-semibold  hover:text-slate-800">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
