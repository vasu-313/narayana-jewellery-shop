import React from 'react';
import { useCart } from '../context/CartContext';
import Navbar3 from '../components/Navbar3';
import { FiPlus, FiMinus, FiX, FiTruck } from 'react-icons/fi';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import '../styles/CartPage.css';
import BottomNavbar from '../components/BottomNavbar';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (id, change) => {
    const item = cartItems.find(item => item.id === id);
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    } else {
      removeFromCart(id); // Remove item if quantity reaches 0
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star half" />);
      } else {
        stars.push(<FaRegStar key={i} className="star" />);
      }
    }
    return stars;
  };

  return (
    <>
      <Navbar3 />
      <div className="cart-page">
        <h1 className="cart-title">My Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your Cart Is Empty</p>
          </div>
        ) : (
          <div className="cart-items-container">
            {cartItems.map((item) => (
              <div className="cart-card" key={item.id}>
                <div className="product-image-container">
                  <img src={item.image} alt={item.title} className="cart-product-image" />
                </div>
                
                <div className="product-main-section">
                  <div className="product-details">
                    <div className="product-header">
                      <h3 className="product-title">{item.title}</h3>
                      <button 
                        className="remove-btn" 
                        onClick={() => removeFromCart(item)}
                      >
                        <FiX />
                      </button>
                    </div>
                    
                    <div className="product-rating">
                      {renderStars(item.rating || 4.5)}
                    </div>
                    
                    <p className="product-weight">Weight: {item.weight}g</p>
                    
                    <div className="delivery-info">
                      <FiTruck className="truck-icon" />
                      <span>Free Delivery</span>
                    </div>
                  </div>
                  
                  <div className="quantity-price-section">
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn" 
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        <FiMinus />
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn" 
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        <FiPlus />
                      </button>
                    </div>
                    
                    <div className="price-section">
                      <p className="product-price">₹{item.price * item.quantity}</p>
                      {item.originalPrice && (
                        <p className="original-price">₹{item.originalPrice * item.quantity}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
<div className="cart-summary">
  <h3>Order Summary</h3>
  
  <div className="summary-row">
    <span>Subtotal</span>
    <span>₹{cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)}</span>
  </div>
  
  <div className="summary-row">
    <span>Making Charge</span>
    <span>
      ₹{cartItems.reduce((total, item) => total + ((item.making || 0) * item.quantity), 0)}
    </span>
  </div>

  <div className="summary-row">
    <span>Delivery</span>
    <span className="free-delivery">Free</span>
  </div>
  
  <div className="summary-row total">
    <span>Total</span>
    <span>
      ₹{cartItems.reduce((total, item) => {
        const itemTotal = (item.price * item.quantity) + ((item.making || 0) * item.quantity);
        return total + itemTotal;
      }, 0)}
    </span>
  </div>
  <Link to='/confirm' >
  <button className="checkout-btn">
    Proceed to Checkout
  </button>
  </Link>
</div>

          </div>
        )}
      </div>

      <BottomNavbar />
    </>
  );
};

export default CartPage;