import {createContext, useContext ,useEffect,useMemo,useState, } from "react"
import { useAuth } from "./AuthContext"


const CartContext = createContext()

export const Cartprovider = ({children}) =>{
  const { currentUser } = useAuth();
    const [ cartItems, setCartItems ] = useState([]);

      // Build key based on user or guest
  const storageKey = currentUser ? `cart_${currentUser.uid}` : "cart_guest";

  // Load cart when user changes
  useEffect(() => {
    const storedCart = localStorage.getItem(storageKey);
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch {
        setCartItems([]);
      }
    } else {
      setCartItems([]);
    }
  }, [currentUser]); // runs every time user logs in/out

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(cartItems));
  }, [cartItems, storageKey]);


    const addToCart =(item)=>{
        setCartItems([...cartItems, item])
    }

const removeFromCart =(item)=>{
    setCartItems(cartItems.filter((apple)=> apple!== item))
}


  const updateQuantity = (id, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const value = useMemo(
    () => ({ cartItems, addToCart, removeFromCart, updateQuantity }),
    [cartItems]
  );

return(
    <CartContext.Provider value={value} >
        {children}
    </CartContext.Provider>
)

}

export const useCart = () => {
    return useContext(CartContext)
}