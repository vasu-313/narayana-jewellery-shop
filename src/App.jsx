import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import WishlistPage from './pages/WishlistPage'
import CartPage from './pages/CartPage'
import ProductDetailPage from './singlePages/ProductDetailPage'
import CategoriesPage from './pages/CategoriesPage'
import MobileCategory from './components/MobileCategory'
import RegisterForm from './components/authentication/RegisterForm'
import LoginForm from './components/authentication/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import { lazy, Suspense } from 'react'
// import Dashboard from './pages/Dashboard'

const Dashboard = lazy(() => import('./pages/DashboardPage'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/categories/:id" element={<CategoriesPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/mobilec" element={<MobileCategory />} />

      <Route path="/signup" element={
        <PublicRoute>
          <RegisterForm />
        </PublicRoute>
      } />

      <Route path="/login" element={
        <PublicRoute>
          <LoginForm />
        </PublicRoute>
      } />

      <Route path='/dashboard' element={<ProtectedRoute>
        <Suspense>
          <Dashboard />
        </Suspense>
      </ProtectedRoute>} />
    </Routes>
  )
}

export default App