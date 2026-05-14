import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Link, useNavigate } from 'react-router-dom';

export default function WishlistPage() {
  const { wishlist, toggleWishlist }  = useWishlist();
  const { addItem }                   = useCart();
  const { showToast }                 = useToast();
  const navigate                      = useNavigate();

  const handleAddToCart = (product) => {
    addItem(product);
    showToast(`เพิ่ม "${product.name}" ลงตะกร้าแล้ว`, 'success');
  };

  const handleRemove = (product) => {
    toggleWishlist(product);
    showToast(`ลบ "${product.name}" ออกจาก Wishlist`, 'wishlist');
  };

  if (!wishlist.length) return (
    <div style={styles.empty}>
      <div style={{ fontSize: '4rem' }}>🤍</div>
      <h2>Wishlist ว่างเปล่า</h2>
      <p style={{ color: '#6b7280', margin: '8px 0 24px' }}>
        กดที่ ❤️ บนสินค้าเพื่อบันทึกไว้
      </p>
      <Link to="/" style={styles.shopBtn}>เลือกสินค้า →</Link>
    </div>
  );

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>❤️ Wishlist ({wishlist.length} รายการ)</h2>

      <div style={styles.grid}>
        {wishlist.map(product => (
          <div key={product.id} style={styles.card}>
            <img
              src={product.image}
              alt={product.name}
              style={styles.img}
              onClick={() => navigate(`/product/${product.id}`)}
            />
            <div style={styles.body}>
              <span style={styles.category}>{product.category}</span>
              <h3 style={styles.name}>{product.name}</h3>
              <div style={styles.rating}>
                {'★'.repeat(Math.round(product.rating))}
                <span style={styles.ratingNum}> {product.rating}</span>
              </div>
              <p style={styles.price}>฿{product.price.toLocaleString()}</p>
              <div style={styles.btnRow}>
                <button
                  style={styles.addBtn}
                  onClick={() => handleAddToCart(product)}
                >
                  🛒 ใส่ตะกร้า
                </button>
                <button
                  style={styles.removeBtn}
                  onClick={() => handleRemove(product)}
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '24px 16px',
  },
  heading: {
    color: '#1e1b4b',
    marginBottom: '24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '20px',
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
  },
  img: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    cursor: 'pointer',
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
  name: {
    fontWeight: 'bold',
    color: '#1e1b4b',
    fontSize: '0.95rem',
  },
  rating: {
    color: '#f59e0b',
    fontSize: '0.85rem',
  },
  ratingNum: {
    color: '#6b7280',
    fontSize: '0.8rem',
  },
  price: {
    color: '#6366f1',
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  btnRow: {
    display: 'flex',
    gap: '8px',
    marginTop: '6px',
  },
  addBtn: {
    flex: 1,
    padding: '10px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.85rem',
  },
  removeBtn: {
    padding: '10px 14px',
    background: '#fff0f3',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  empty: {
    textAlign: 'center',
    padding: '80px 24px',
  },
  shopBtn: {
    display: 'inline-block',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: 'white',
    padding: '12px 28px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};