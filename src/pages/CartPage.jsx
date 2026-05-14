import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cart, removeItem, updateQty, total, itemCount } = useCart();

  // ถ้า cart ว่าง
  if (!cart.length) return (
    <div style={styles.empty}>
      <div style={{ fontSize: '4rem' }}>🛒</div>
      <h2>ตะกร้าว่างเปล่า</h2>
      <p style={{ color: '#6b7280', margin: '8px 0 24px' }}>
        ยังไม่มีสินค้าในตะกร้า
      </p>
      <Link to="/" style={styles.shopBtn}>เลือกสินค้า →</Link>
    </div>
  );

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>🛒 ตะกร้าสินค้า ({itemCount} ชิ้น)</h2>

      {/* รายการสินค้าในตะกร้า */}
      <div style={styles.list}>
        {cart.map(item => (
          <div key={item.id} style={styles.item} data-testid="cart-item">

            {/* รูปสินค้า */}
            <img src={item.image} alt={item.name} style={styles.img} />

            {/* ข้อมูลสินค้า */}
            <div style={styles.info}>
              <h3 style={styles.itemName}>{item.name}</h3>
              <p style={styles.itemPrice}>฿{item.price.toLocaleString()} / ชิ้น</p>
            </div>

            {/* ปรับจำนวน */}
            <div style={styles.qtyBox}>
              <button
                style={styles.qtyBtn}
                onClick={() => {
                  if (item.quantity === 1) removeItem(item.id);
                  else updateQty(item.id, item.quantity - 1);
                }}
              >−</button>
              <span style={styles.qtyNum}>{item.quantity}</span>
              <button
                style={styles.qtyBtn}
                onClick={() => updateQty(item.id, item.quantity + 1)}
              >+</button>
            </div>

            {/* ราคารวมของรายการนี้ */}
            <span style={styles.subtotal}>
              ฿{(item.price * item.quantity).toLocaleString()}
            </span>

            {/* ปุ่มลบ */}
            <button
              style={styles.removeBtn}
              onClick={() => removeItem(item.id)}
              data-testid="remove-item"
            >🗑️</button>

          </div>
        ))}
      </div>

      {/* Summary */}
      <div style={styles.summary}>
        <div style={styles.summaryRow}>
          <span>จำนวนสินค้า</span>
          <span>{itemCount} ชิ้น</span>
        </div>
        <div style={styles.summaryRow}>
          <strong style={{ fontSize: '1.2rem' }}>ยอดรวม</strong>
          <strong style={{ fontSize: '1.2rem', color: '#6366f1' }}>
            ฿{total.toLocaleString()}
          </strong>
        </div>
        <Link to="/checkout" style={styles.checkoutBtn}>
          ดำเนินการสั่งซื้อ →
        </Link>
      </div>

    </div>
  );
}

const styles = {
  page: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '24px',
  },
  heading: {
    marginBottom: '24px',
    color: '#1e1b4b',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '24px',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
  },
  img: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  info: {
    flex: 1,
  },
  itemName: {
    fontSize: '1rem',
    color: '#1e1b4b',
    marginBottom: '4px',
  },
  itemPrice: {
    color: '#6b7280',
    fontSize: '0.85rem',
  },
  qtyBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#f5f3ff',
    borderRadius: '8px',
    padding: '4px 8px',
  },
  qtyBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: '#6366f1',
    fontWeight: 'bold',
    width: '24px',
  },
  qtyNum: {
    fontWeight: 'bold',
    minWidth: '24px',
    textAlign: 'center',
  },
  subtotal: {
    fontWeight: 'bold',
    color: '#6366f1',
    minWidth: '80px',
    textAlign: 'right',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
  },
  summary: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  checkoutBtn: {
    display: 'block',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: 'white',
    padding: '14px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '1rem',
    marginTop: '8px',
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