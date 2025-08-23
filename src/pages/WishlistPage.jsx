import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Navbar3 from '../components/Navbar3';
import CategoriesNavbar from '../components/CategoriesNavbar';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';
import '../styles/WishlistPage.css';
import BottomNavbar from '../components/BottomNavbar';

const WishlistPage = () => {
  const { addToCart } = useCart();
  const { wishlistItems, toggleWishlistItem } = useWishlist();

  const isInWishlist = (item) =>
    wishlistItems.some((wishItem) => wishItem.id === item.id);

  const handleShare = (item) => {
    const shareUrl = `${window.location.origin}/product/${item.id}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <>
      <Navbar3 />
      <CategoriesNavbar />

      <div className="wishlist-page">
        <h1 className="wishlist-title">My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <p>Your wishlist is empty.</p>
          </div>
        ) : (
          <div className="wishlist-items-container">
            {wishlistItems.map((item) => (
              <div className="wishlist-card" key={item.id}>
                <div className="image-card">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="wishlist-image"
                  />
                  <div
                    className="wishlist-toggle-icon"
                    onClick={() => toggleWishlistItem(item)}
                  >
                    {isInWishlist(item) ? (
                      <FaHeart className="heart-icon filled" />
                    ) : (
                      <FaRegHeart className="heart-icon" />
                    )}
                  </div>
                </div>

                <div className="wishlist-details">
                  <div className="wishlist-header-row">
                    <h3>{item.title}</h3>
                    <FiShare2
                      className="share-icon"
                      onClick={() => handleShare(item)}
                      title="Copy link"
                    />
                  </div>

                  <div className="wishlist-info-row">
                    <span className="price">₹{item.price}</span>
                    <span className="weight">
                      Weight: {item.weight}
                    </span>
                  </div>

                  <button
                    className="add-to-cart-full"
                    onClick={() => addToCart(item)}
                  >
                    <MdOutlineShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNavbar/>
    </>
  );
};

export default WishlistPage;
