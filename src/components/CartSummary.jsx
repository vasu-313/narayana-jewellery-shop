import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';


const CartSummary = () => {

    const navigate = useNavigate();
    const { cartItems } = useCart();


    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const displayRezorpay = async () => {
        await loadScript('https://checkout.razorpay.com/v1/checkout.js');

        const options = {
            key: "rzp_test_RC080rESJib2cj",
            amount: (totalAmount) * 100,
            curreny: "INR",
            name: "Narayana Jewellery",
            descriiption: "Thank You For Shopping",
            image: "https://raw.githubusercontent.com/vasu-313/logo-jewellery-shop/refs/heads/main/jewellery-logo.webp",
            handler: ({ payment_id }) => {
                navigate("/")
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open()
    }


    const totalAmount = cartItems.reduce((total, item) => {
        const itemTotal = (item.price * item.quantity) + ((item.making || 0) * item.quantity);
        return total + itemTotal;
    }, 0);

    const MRP = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)

    const makingCharge = cartItems.reduce((total, item) => total + ((item.making || 0) * item.quantity), 0)



    return (
        <>
            <div className="cart-summary">
                <h3>Order Summary</h3>

                <div className="summary-row">
                    <span>MRP</span>
                    <span>₹{MRP}</span>
                </div>

                <div className="summary-row">
                    <span>Making Charge</span>
                    <span>
                        ₹{makingCharge}
                    </span>
                </div>

                <div className="summary-row">
                    <span>Delivery</span>
                    <span className="free-delivery">Free</span>
                </div>

                <div className="summary-row total">
                    <span>Total</span>
                    <span>
                        ₹{totalAmount}
                    </span>
                </div>
                {/* <Link to='/confirm' > */}
                <button onClick={displayRezorpay} className="checkout-btn">
                    Proceed to Checkout
                </button>
                {/* </Link> */}
            </div>
        </>
    )
}

export default CartSummary