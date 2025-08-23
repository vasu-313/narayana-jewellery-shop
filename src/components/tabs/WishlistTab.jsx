import { useWishlist } from "../../context/WishlistContext";

const WishlistTab = () => {
  const { wishlistItems, toggleWishlistItem } = useWishlist();

  return (
    <div className="tab-content">
      <h2>My Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p className="no-items">Your wishlist is currently empty.</p>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlist-item">
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)}</p>
                <div className="item-actions">
                  <button className="add-to-cart">Add to Cart</button>
                  <button
                    className="remove-item"
                    onClick={() => toggleWishlistItem(item)}
                  >
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistTab;