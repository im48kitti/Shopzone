import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Navbar() {
  const { itemCount }       = useCart();
  const { wishlist }        = useWishlist();

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🛍️ ShopZone</Link>

      <div style={styles.actions}>
        {/* Wishlist */}
        <Link to="/wishlist" style={styles.iconBtn}>
          ❤️
          {wishlist.length > 0 && (
            <span style={styles.badge}>{wishlist.length}</span>
          )}
        </Link>

        {/* Cart */}
        <Link to="/cart" style={styles.cartBtn}>
          🛒 Cart
          {itemCount > 0 && (
            <span style={styles.badge}>{itemCount}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 32px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  iconBtn: {
    position: 'relative',
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.3rem',
    padding: '8px 12px',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
  },
  cartBtn: {
    position: 'relative',
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    padding: '8px 20px',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  badge: {
    background: '#f43f5e',
    color: 'white',
    borderRadius: '50%',
    padding: '2px 7px',
    fontSize: '0.72rem',
    fontWeight: 'bold',
    marginLeft: '4px',
  },
};