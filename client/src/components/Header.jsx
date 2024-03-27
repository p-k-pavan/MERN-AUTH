import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='bg-slate-200'>
      <div className='flex justify-between max-w-6xl mx-auto p-3 items-center'>
        <Link to={"/"}>
          <h1 className='font-bold'>AUTH APP</h1>
        </Link>

        <ul className='flex gap-8'>
        <Link to={"/home"}>
          <li className='font-semibold'>Home</li>
        </Link>

        <Link to={"/profile"}>
          <li className='font-semibold'>Profile</li>
        </Link>

        <Link to={"/about"}>
          <li className='font-semibold'>About</li>
        </Link>
        </ul>
      </div>
    </div>
  )
}
