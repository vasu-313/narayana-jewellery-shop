import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Cartprovider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Cartprovider>
          <WishlistProvider>
            <App />
          </WishlistProvider>
        </Cartprovider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
