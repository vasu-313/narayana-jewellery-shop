import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProductsByCategoryClient } from '../services/api';
import Navbar3 from '../components/Navbar3';
import CategoriesNavbar from '../components/CategoriesNavbar';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import '../styles/ProductsPage.css';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function CategoriesPage() {
  const { addToCart } = useCart();
  const { toggleWishlistItem, wishlistItems } = useWishlist();

  const { id } = useParams(); // category ID from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await fetchProductsByCategoryClient(id);
        console.log("API Response:", products); // array of products
        setProducts(Array.isArray(products) ? products : []);
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  return (
    <>
      <Navbar3 />
      <CategoriesNavbar />
      <div className="products-page">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="image-wrapper">
              <div
                className="wishlist-icon"
                onClick={() =>
                  toggleWishlistItem({ ...product, category: 'category' })
                }
                style={{ cursor: 'pointer' }}
              >
                {isInWishlist(product.id) ? (
                  <FaHeart style={{ color: 'red' }} />
                ) : (
                  <FaRegHeart style={{ color: 'white' }} />
                )}
              </div>
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.title} />
              </Link>
            </div>
            <h4>{product.title}</h4>
            <div className="price-cart">
              <span className="price">₹{product.price}</span>
              <button className="cart-btn" onClick={() => addToCart(product)}>
                <MdOutlineShoppingCart />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
