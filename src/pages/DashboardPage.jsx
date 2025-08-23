import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar3 from '../components/Navbar3'
import BottomNavbar from '../components/BottomNavbar';
import '../styles/AccountPage.css';
import { MdDashboardCustomize } from 'react-icons/md';
import { FaBoxOpen, FaHeart, FaMapMarkerAlt, FaUserCog } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { useState } from 'react';
import DashboardTab from '../components/tabs/DashboardTab';
import SettingsTab from '../components/tabs/SettingsTab';
import OrdersTab from '../components/tabs/OrdersTab';
import AddressTab from '../components/tabs/AddressTab';
import WishlistTab from '../components/tabs/WishlistTab';

const Dashboard = () => {

    const { currentUser, logOut } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };


    const renderTabContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardTab />;
            case 'orders':
                return <OrdersTab />;
            case 'wishlist':
                return <WishlistTab />;
            case 'address':
                return <AddressTab />;
            case 'settings':
                return <SettingsTab />;
            default:
                return <DashboardTab />;
        }
    };

    return (
        <>
            <Navbar3 />
            <div className='account-container' >
                <div className='account-content' >
                    <div className='account-sidebar' >
                        <div className='user-profile' >
                            <div className='user-avatar' >
                                <span className='avatar-letter' >{currentUser.email[0]}</span>

                            </div>
                            <h3 className='user-name' > {currentUser.email.split('@')[0]} </h3>
                            <p className='user-email' > {currentUser.email} </p>
                        </div>

                        <nav className='account-nav' >
                            <button
                                className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                                onClick={() => setActiveTab('dashboard')}
                            >
                                <MdDashboardCustomize />
                                Dashboard
                            </button>

                            <button className={`nav-item ${activeTab === 'orders' ? 'active' : ''}`}
                                onClick={() => setActiveTab('orders')} >
                                <FaBoxOpen />
                                My Orders
                            </button>

                            <button className={`nav-item ${activeTab === 'wishlist' ? 'active' : ''}`}
                                onClick={() => setActiveTab('wishlist')}

                            >
                                <FaHeart />
                                Wishlist
                            </button>

                            <button className={`nav-item ${activeTab === 'address' ? 'active' : ''}`}
                                onClick={() => setActiveTab('address')} >
                                <FaMapMarkerAlt />
                                Address
                            </button>

                            <button className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
                                onClick={() => setActiveTab('settings')} >
                                <FaUserCog />
                                Settings
                            </button>

                            <button onClick={handleLogout} className='nav-item' >
                                <IoLogOut />
                                Logout
                            </button>
                        </nav>

                    </div>
                    <div className='account-main'>
                        {renderTabContent()}
                    </div>
                </div>


            </div>
            <BottomNavbar />
        </>
    );
};

export default Dashboard;
