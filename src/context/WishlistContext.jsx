import {createContext, useContext ,useEffect,useMemo,useState, } from "react"
import { useAuth } from "./AuthContext";


const WishlistContext = createContext()

export const WishlistProvider = ({children}) =>{

    const { currentUser } = useAuth();
    const [ wishlistItems, setWishlistItems ] = useState([])

    // Build key based on user or guest
  const storageKey = currentUser ? `wishlist_${currentUser.uid}` : "wishlist_guest";

  // Load wishlist when user changes (login/logout)
  useEffect(() => {
    const storedWishlist = localStorage.getItem(storageKey);
    if (storedWishlist) {
      try {
        setWishlistItems(JSON.parse(storedWishlist));
      } catch {
        setWishlistItems([]);
      }
    } else {
      setWishlistItems([]);
    }
  }, [currentUser]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(wishlistItems));
  }, [wishlistItems, storageKey]);



    const toggleWishlistItem = (item) => {
        setWishlistItems(prevItems => {
            // Check for both ID and category
            const exists = prevItems.some(prevItem => 
                prevItem.id === item.id && 
                prevItem.category === item.category
            )
            
            return exists 
                ? prevItems.filter(prevItem => 
                    !(prevItem.id === item.id && prevItem.category === item.category)
                  )
                : [...prevItems, item]
        })
    }

      // Memoize context value to prevent unnecessary re-renders
    const value = useMemo(() => ({
      wishlistItems,
      toggleWishlistItem
  }), [wishlistItems]);


return(
    <WishlistContext.Provider value={value} >
        {children}
    </WishlistContext.Provider>
)

}

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
      throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
  };