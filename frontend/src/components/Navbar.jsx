import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
      <nav>
          <h2>TaskHub</h2>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
          <Link to='/dashboard'>Dashboard</Link>    

          
    </nav>
  )
}

export default Navbar
