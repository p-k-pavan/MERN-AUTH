import React from 'react'
import { Link } from 'react-router-dom'

export default function () {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-7">SIGN UP</h1>
      <form className="flex flex-col max-w-lg mx-auto gap-4">
      <input type="text" placeholder="UserName" className="p-3 focus:outline-slate-600 bg-slate-200 rounded-lg" id="username"/>
      <input type="email" placeholder="Email" className="p-3 focus:outline-slate-600 bg-slate-200 rounded-lg" id="email"/>
      <input type="password" placeholder="Password" className="p-3 focus:outline-slate-600 bg-slate-200 rounded-lg" id="password"/>
      <button className="bg-slate-600 text-white font-semibold p-3 rounded-lg hover:bg-slate-500" >SIGNUP</button>
        </form>
        <p className="text-center my-7 font-semibold"> Alredy have accout? <Link to='/sign-in' className="text-blue-500">Sign-In</Link></p>
    </div>
  )
}
