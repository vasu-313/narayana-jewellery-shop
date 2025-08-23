import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import Navbar3 from '../components/Navbar3';
import { FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa';
import '../styles/ProductDetailPage.css';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import BottomNavbar from '../components/BottomNavbar';

export default function ProductDetailPage() {
  const { addToCart } = useCart();
  const { toggleWishlistItem, wishlistItems } = useWishlist();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const fetchedProduct = await fetchProductById(id);
        if (!fetchedProduct) {
          setError('Product not found');
        } else {
          setProduct(fetchedProduct);
        }
      } catch (err) {
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const handleShare = (product) => {
    const shareUrl = `${window.location.origin}/product/${product.id}`;
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!product) return <div className="error">No product found.</div>;

  return (
    <>
      <Navbar3 className="product-detail-nav" />
      <div className="product-detail-container">
        <div className="image-section">
          <img
            src={product.image}
            alt={product.title}
            className="product-image-signal"
          />
          <div className="top-right-icons-vertical">
            <div
              className="icon-button"
              onClick={() => toggleWishlistItem({ ...product, category: 'bangles' })}
              style={{ cursor: 'pointer' }}
            >
              {isInWishlist(product.id) ? (
                <FaHeart style={{ color: 'red' }} />
              ) : (
                <FaRegHeart style={{ color: 'white' }} />
              )}
            </div>
            <div
              className="icon-button"
              onClick={() => handleShare(product)}
              title="Copy link"
            >
              <FaShareAlt />
            </div>
          </div>
        </div>

        <div className="info-section">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-price">₹{product.price}</p>

          <h3 className="section-heading">Product Details</h3>
          <ul className="single-product-details">
            <li>
              <strong>Weight:</strong> {product.weight}
            </li>
            <li>
              <strong>Purity:</strong> {product.purity}
              <span className="karat"></span>
            </li>
            <li>
              <strong>Making Charges:</strong> {product.making}
            </li>
            <li>
              <strong>Wastage:</strong> {product.wastage}
            </li>
          </ul>

          <div className="action-buttons">
            <button className="single-add-cart-btn" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
            <button className="single-buy-now-btn">Buy Now</button>
          </div>
        </div>
      </div>
      <BottomNavbar />
    </>
  );
}
