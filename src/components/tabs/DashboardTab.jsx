import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";

const DashboardTab = () => {

  const { wishlistItems} = useWishlist();
  const {currentUser} = useAuth()

  return (
    <div className="tab-content">
      <h2>My Dashboard</h2>
      <div className="dashboard-grid">

        <div className="dashboard-card welcome">
          <h3>Hello, {currentUser.email.split('@')[0]}!</h3>
          <p>Welcome to your jewelry account dashboard.</p>
        </div>

        <div className="dashboard-card orders">
          <h3>Recent Orders</h3>
          <p>No recent orders</p>
          <button className="view-all">View All Orders</button>
        </div>

        <div className="dashboard-card wishlist">
          <h3>Wishlist</h3>
          <p>You have {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your wishlist</p>
          <button className="view-all">View Wishlist</button>
        </div>

        <div className="dashboard-card account">
          <h3>Account Information</h3>
          <p>{currentUser.email.split('@')[0]}</p>
          <p>{currentUser.email}</p>
          <button className="edit-btn">Edit Account</button>
        </div>

        <div className="dashboard-card account">
          <h3>Calculate Your Gold Cost</h3>
          <p>State Wise Live Cost</p>
          <p>Easy To Calculate</p>
          <button className="edit-btn">Calculate</button>
        </div>

        <div className="dashboard-card account">
          <h3>Calculate Your Silver Cost</h3>
          <p>Live Cost</p>
          <p>Easy To Calculate</p>
          <button className="edit-btn">Calculate</button>
        </div>

      </div>
    </div>
  );
};

export default DashboardTab;