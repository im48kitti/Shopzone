import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import products from '../data/products';

export default function ProductDetailPage() {
  const { id }                           = useParams();
  const navigate                         = useNavigate();
  const { addItem }                      = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { showToast }                    = useToast();

  const product   = products.find(p => p.id === Number(id));
  const wishlisted = product ? isWishlisted(product.id) : false;

  // หาสินค้าแนะนำ (category เดียวกัน)
  const related = products.filter(p => p.category === product?.category && p.id !== product?.id);

  if (!product) return (
    <div style={styles.notFound}>
      <h2>😕 ไม่พบสินค้า</h2>
      <button onClick={() => navigate('/')} style={styles.backBtn}>กลับหน้าแรก</button>
    </div>
  );

  const handleAddToCart = () => {
    addItem(product);
    showToast(`เพิ่ม "${product.name}" ลงตะกร้าแล้ว`, 'success');
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    showToast(
      wishlisted ? `ลบออกจาก Wishlist แล้ว` : `เพิ่มใน Wishlist แล้ว`,
      'wishlist'
    );
  };

  return (
    <div style={styles.page}>

      {/* Back button */}
      <button onClick={() => navigate(-1)} style={styles.backBtn}>← กลับ</button>

      {/* Product Detail */}
      <div style={styles.detail}>

        {/* รูปสินค้า */}
        <div style={styles.imgBox}>
          <img src={product.image} alt={product.name} style={styles.img} />
        </div>

        {/* ข้อมูลสินค้า */}
        <div style={styles.info}>
          <span style={styles.category}>{product.category}</span>
          <h1 style={styles.name}>{product.name}</h1>

          {/* Rating */}
          <div style={styles.rating}>
            {'★'.repeat(Math.round(product.rating))}
            {'☆'.repeat(5 - Math.round(product.rating))}
            <span style={styles.ratingNum}> {product.rating} / 5.0</span>
          </div>

          {/* ราคา */}
          <div style={styles.priceBox}>
            <span style={styles.price}>฿{product.price.toLocaleString()}</span>
            <span style={styles.stock}>
              {product.stock > 0 ? `มีสินค้า ${product.stock} ชิ้น` : 'สินค้าหมด'}
            </span>
          </div>

          {/* รายละเอียด (mock) */}
          <div style={styles.descBox}>
            <h3 style={styles.descTitle}>รายละเอียดสินค้า</h3>
            <p style={styles.desc}>
              {product.name} คุณภาพสูง เหมาะสำหรับการใช้งานทั่วไป
              รับประกันสินค้า 1 ปี จัดส่งฟรีทั่วประเทศ
              เมื่อสั่งซื้อครบ ฿500 ขึ้นไป
            </p>
            <ul style={styles.specList}>
              <li>✅ รับประกัน 1 ปี</li>
              <li>✅ จัดส่งฟรีทั่วประเทศ</li>
              <li>✅ คืนสินค้าได้ภายใน 7 วัน</li>
              <li>✅ ชำระเงินปลายทางได้</li>
            </ul>
          </div>

          {/* ปุ่ม */}
          <div style={styles.btnRow}>
            <button
              style={styles.addBtn}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              🛒 เพิ่มลงตะกร้า
            </button>
            <button
              style={{
                ...styles.wishBtn,
                background: wishlisted ? '#fff0f3' : 'white',
                color: wishlisted ? '#f43f5e' : '#6b7280',
                borderColor: wishlisted ? '#f43f5e' : '#e5e7eb',
              }}
              onClick={handleWishlist}
            >
              {wishlisted ? '❤️ บันทึกแล้ว' : '🤍 บันทึก'}
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div style={styles.related}>
          <h2 style={styles.relatedTitle}>สินค้าที่เกี่ยวข้อง</h2>
          <div style={styles.relatedGrid}>
            {related.map(p => (
              <div
                key={p.id}
                style={styles.relatedCard}
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <img src={p.image} alt={p.name} style={styles.relatedImg} />
                <div style={{ padding: '12px' }}>
                  <p style={styles.relatedName}>{p.name}</p>
                  <p style={styles.relatedPrice}>฿{p.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

const styles = {
  page: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '24px 16px',
  },
  backBtn: {
    background: 'none',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    padding: '8px 16px',
    cursor: 'pointer',
    marginBottom: '24px',
    fontWeight: '600',
    color: '#374151',
  },
  detail: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    background: 'white',
    borderRadius: '20px',
    padding: '32px',
    boxShadow: '0 4px 30px rgba(0,0,0,0.08)',
    marginBottom: '40px',
  },
  imgBox: {
    borderRadius: '16px',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '380px',
    objectFit: 'cover',
    display: 'block',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  category: {
    background: '#ede9fe',
    color: '#6366f1',
    borderRadius: '20px',
    padding: '4px 14px',
    fontSize: '0.8rem',
    fontWeight: '600',
    width: 'fit-content',
  },
  name: {
    fontSize: '1.8rem',
    color: '#1e1b4b',
    lineHeight: 1.3,
  },
  rating: {
    color: '#f59e0b',
    fontSize: '1.1rem',
  },
  ratingNum: {
    color: '#6b7280',
    fontSize: '0.9rem',
  },
  priceBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '16px',
    background: '#f5f3ff',
    borderRadius: '12px',
  },
  price: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#6366f1',
  },
  stock: {
    color: '#10b981',
    fontWeight: '600',
    fontSize: '0.9rem',
  },
  descBox: {
    borderTop: '1px solid #f3f4f6',
    paddingTop: '16px',
  },
  descTitle: {
    color: '#1e1b4b',
    marginBottom: '10px',
  },
  desc: {
    color: '#6b7280',
    lineHeight: 1.7,
    marginBottom: '12px',
  },
  specList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    color: '#374151',
    fontSize: '0.95rem',
  },
  btnRow: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
    flexWrap: 'wrap',
  },
  addBtn: {
    flex: 1,
    padding: '14px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    minWidth: '160px',
  },
  wishBtn: {
    padding: '14px 20px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '0.95rem',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s',
  },
  related: {
    marginTop: '8px',
  },
  relatedTitle: {
    color: '#1e1b4b',
    marginBottom: '20px',
    fontSize: '1.3rem',
  },
  relatedGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '16px',
  },
  relatedCard: {
    background: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
    transition: 'transform 0.2s',
  },
  relatedImg: {
    width: '100%',
    height: '140px',
    objectFit: 'cover',
  },
  relatedName: {
    fontWeight: '600',
    color: '#1e1b4b',
    marginBottom: '4px',
    fontSize: '0.9rem',
  },
  relatedPrice: {
    color: '#6366f1',
    fontWeight: 'bold',
  },
  notFound: {
    textAlign: 'center',
    padding: '80px',
  },
};