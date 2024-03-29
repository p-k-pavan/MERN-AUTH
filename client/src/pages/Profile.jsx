import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div>
      <h1 className="text-center my-8 text-3xl font-semibold ">Profile</h1>
      <form className="flex flex-col m-auto max-w-lg gap-4">
        <img
          src={currentUser.profilePicture}
          className="rounded-full w-24 h-24 self-center cursor-pointer"
        />

        <input
          type="text"
          placeholder="UserName"
          className="p-3 focus:outline-slate-600 bg-slate-200 rounded-lg"
          id="username"
          defaultValue={currentUser.username}
        />
        <input
          type="email"
          placeholder="Email"
          className="p-3 focus:outline-slate-600 bg-slate-200 rounded-lg"
          id="email"
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 focus:outline-slate-600 bg-slate-200 rounded-lg"
          id="password"
        />
        <button className="bg-slate-600 text-white font-semibold p-3 rounded-lg hover:bg-slate-500">
          UPDATE
        </button>
      </form>
      <div className="flex m-auto justify-center max-w-lg justify-between my-4">
        <span className="hover:text-red-600 font-semibold cursor-pointer">Delete Account</span>
        <span className="hover:text-red-600 font-semibold cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
