
import { FiSearch, FiUser, FiHeart, FiShoppingCart } from 'react-icons/fi';
import '../styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {

  const {cartItems} = useCart();
  
    const  {currentUser}  = useAuth();


  const navigate = useNavigate();

  const { query, setQuery } = useSearch(); 
 
  const handleSearch = (e) => {
    setQuery(e.target.value); // this will now update context globally
  };

  const handleLogoClick = () => {
  navigate('/'); // ✅ This navigates to home without reload
  };


 const handleAccountClick = () => {
    if (currentUser) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {/* Desktop/Top Navbar */}
      <nav className="navbar">
        <div className="navbar-grid">
          <div className="logo-container">
            <div className="circle-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}  >NJ</div>
            <span className="full-logo">Narayana Jewellery</span>
          </div>

            <div className="search-wrapper">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search for jewellery..."
                className="search-input"
                value={query}
                onChange={handleSearch}
              />
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

export default Navbar;