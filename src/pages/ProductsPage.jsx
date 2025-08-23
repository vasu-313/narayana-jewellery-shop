import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api'; // make sure this returns the products array directly
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { MdOutlineShoppingCart } from 'react-icons/md';
import '../styles/ProductsPage.css';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useSearch } from '../context/SearchContext';

const ProductsPage = () => {
  const { query } = useSearch();
  const { addToCart } = useCart();
  const { toggleWishlistItem, wishlistItems } = useWishlist();

  const [products, setProducts] = useState([]); // initialize as empty array
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts(); // fetchProducts should return products array
        setProducts(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
      } 
    };
    fetchData();
  }, []);

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  // if (loading) return <div className="loading">Loading...</div>;
  // if (error) return <div className="error">Error: {error}</div>;

  // Defensive check before filtering
  const filteredProducts = Array.isArray(products)
    ? products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    )
    : [];

  return (
    <>
  
      <div className="products-page">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="image-wrapper">
              <div
                className="wishlist-icon"
                onClick={() =>
                  toggleWishlistItem({ ...product, category: 'bangles' })
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
};

export default ProductsPage;
