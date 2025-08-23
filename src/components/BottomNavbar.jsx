import React from 'react'
import '../styles/BottomNavbar.css'
import { FiGrid, FiHeart, FiHome, FiShoppingCart, FiUser } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const BottomNavbar = () => {

  const {currentUser} = useAuth();
  const navigate = useNavigate();
  const handleAccountClick = () => {
    if (currentUser) {
      navigate('/dashboard');
    }else {
      navigate("/login")
    }

  }
  return (
    <>
    {/* Mobile/Bottom Navbar */}
    <nav className="bottom-navbar">
      <Link to='/' >
      <div  className="bottom-nav-icon">
        <FiHome className="icon" />
        <span>Home</span>
      </div>
      </Link>

      
      <div  className="bottom-nav-icon">
        <FiUser onClick={handleAccountClick} className="icon" />
        <span>Account</span>
      </div>
   
      
      <Link to='/mobilec' >
      <div className="bottom-nav-icon">
        <FiGrid className="icon" />
        <span>Categories</span>
      </div>
      </Link>

      <Link to='/wishlist' >
      <div  className="bottom-nav-icon">
        <FiHeart className="icon" />
        <span>Wishlist</span>
      </div>
      </Link>

      <Link to='/cart' >
      <div  className="bottom-nav-icon">
        <FiShoppingCart className="icon" />
        <span>Cart</span>
      </div>
      </Link>
    </nav>
    </>
  )
}

export default BottomNavbar