import { Routes, Route } from 'react-router-dom';
import { CartProvider }     from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider }    from './context/ToastContext';
import Navbar               from './components/Navbar';
import HomePage             from './pages/HomePage';
import CartPage             from './pages/CartPage';
import CheckoutPage         from './pages/CheckoutPage';
import ProductDetailPage    from './pages/ProductDetailPage';
import WishlistPage         from './pages/WishlistPage';

export default function App() {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/"            element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart"        element={<CartPage />} />
            <Route path="/checkout"    element={<CheckoutPage />} />
            <Route path="/wishlist"    element={<WishlistPage />} />
          </Routes>
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}