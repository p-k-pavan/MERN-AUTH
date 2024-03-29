import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        console.log(data);
        return;
      }

      dispatch(signInSuccess(data));
      navigate("/");
    } catch (err) {
      dispatch(signInFailure(err));
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-7">SIGN IN</h1>
      <form
        className="flex flex-col max-w-lg mx-auto gap-4"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          className="p-3 focus:outline-slate-600 bg-slate-200 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 focus:outline-slate-600 bg-slate-200 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button className="bg-slate-600 text-white font-semibold p-3 rounded-lg hover:bg-slate-500">
          {loading ? "Loading..." : "SIGNIN"}
        </button>
        <OAuth />
      </form>
      <p className="text-center my-7 font-semibold">
        {" "}
        Dont have accout?{" "}
        <Link to="/sign-up" className="text-blue-500">
          Sign-Up
        </Link>
      </p>

      <p className="text-red-500 text-center">
        {error ? error.message || "something went worng!" : ""}
      </p>
    </div>
  );
}
