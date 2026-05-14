import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const { addItem }                   = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast }                 = useToast();
  const navigate                      = useNavigate();
  const wishlisted                    = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(product);
    showToast(`เพิ่ม "${product.name}" ลงตะกร้าแล้ว`, 'success');
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
    showToast(
      wishlisted ? `ลบ "${product.name}" ออกจาก Wishlist` : `เพิ่ม "${product.name}" ใน Wishlist`,
      'wishlist'
    );
  };

  return (
    <div
      style={styles.card}
      data-testid="product-card"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* รูปสินค้า + ปุ่ม wishlist */}
      <div style={styles.imgWrapper}>
        <img src={product.image} alt={product.name} style={styles.img} />
        <button
          style={{ ...styles.wishBtn, color: wishlisted ? '#f43f5e' : '#9ca3af' }}
          onClick={handleWishlist}
          data-testid="wishlist-btn"
          title={wishlisted ? 'ลบออกจาก Wishlist' : 'เพิ่มใน Wishlist'}
        >
          {wishlisted ? '❤️' : '🤍'}
        </button>
        {product.stock <= 3 && (
          <span style={styles.stockBadge}>เหลือ {product.stock} ชิ้น!</span>
        )}
      </div>

      <div style={styles.body}>
        <span style={styles.category}>{product.category}</span>
        <h3 style={styles.title}>{product.name}</h3>

        {/* Rating */}
        <div style={styles.rating}>
          {'★'.repeat(Math.round(product.rating))}
          {'☆'.repeat(5 - Math.round(product.rating))}
          <span style={styles.ratingNum}> {product.rating}</span>
        </div>

        <div style={styles.footer}>
          <span style={styles.price}>฿{product.price.toLocaleString()}</span>
          <button
            style={styles.btn}
            onClick={handleAddToCart}
            data-testid="add-to-cart"
          >
            + Add
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  imgWrapper: {
    position: 'relative',
  },
  img: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    display: 'block',
  },
  wishBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stockBadge: {
    position: 'absolute',
    bottom: '8px',
    left: '8px',
    background: '#f43f5e',
    color: 'white',
    fontSize: '0.7rem',
    fontWeight: 'bold',
    padding: '3px 8px',
    borderRadius: '20px',
  },
  body: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  category: {
    background: '#ede9fe',
    color: '#6366f1',
    borderRadius: '20px',
    padding: '2px 10px',
    fontSize: '0.75rem',
    width: 'fit-content',
  },
  title: {
    fontSize: '1rem',
    color: '#1e1b4b',
    fontWeight: 'bold',
  },
  rating: {
    color: '#f59e0b',
    fontSize: '0.9rem',
  },
  ratingNum: {
    color: '#6b7280',
    fontSize: '0.8rem',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '6px',
  },
  price: {
    fontWeight: 'bold',
    color: '#6366f1',
    fontSize: '1.1rem',
  },
  btn: {
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
};