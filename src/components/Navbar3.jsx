import {  FiUser, FiHeart, FiShoppingCart, } from 'react-icons/fi';
import '../styles/navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';


const NavBar = () => {

  const {cartItems} = useCart();
  
  const {currentUser} = useAuth();
  

  
  const navigate = useNavigate();

 
 

  const handleLogoClick = () => {
  navigate('/'); 
  };

  const handleAccountClick =  () => {
    if (currentUser) {
      navigate("/dashboard");
    } else {
      navigate("/login")
    }
  } 

  return (
    <>
      {/* Desktop/Top Navbar */}
      <nav className="navbar3">
        <div className="navbar-grid">
          <div className="logo-container">
            <div className="circle-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}  >NJ</div>
            <span className="full-logo">Narayana Jewellery</span>
          </div>

      
          <div className="nav-icons">
            
            <div className="nav-icon">
              <FiUser onClick={handleAccountClick} className="icon" />
              <span>Account</span>
            </div>
          
            <Link to='/wishlist' >
            <div className="nav-icon">
              <FiHeart className="icon" />
              <span>Wishlist</span>
            </div>
            </Link>
            
            <Link to='/cart' >
            <div className="nav-icon">
              <FiShoppingCart className="icon" />
              <span>Cart</span>
              <h4 className='cart-number' >{cartItems.length}</h4>
            </div>
            </Link>

          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;