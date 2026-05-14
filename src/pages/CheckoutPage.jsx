import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm]           = useState({ name: '', email: '', address: '' });
  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Validate ฟอร์ม
  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'กรุณากรอกชื่อ';
    if (!form.email.trim())   e.email   = 'กรุณากรอกอีเมล';
    if (!form.address.trim()) e.address = 'กรุณากรอกที่อยู่';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setSubmitted(true);
    clearCart();
  };

  // หน้า Order Confirmed
  if (submitted) return (
    <div style={styles.success}>
      <div style={{ fontSize: '5rem' }}>🎉</div>
      <h2 style={styles.successTitle}>สั่งซื้อสำเร็จ!</h2>
      <p style={styles.successSub}>ขอบคุณที่สั่งซื้อ <strong>{form.name}</strong>!</p>
      <p style={{ color: '#6b7280', marginBottom: '32px' }}>
        เราจะส่งอีเมลยืนยันไปที่ {form.email}
      </p>
      <button onClick={() => navigate('/')} style={styles.homeBtn}>
        กลับหน้าหลัก
      </button>
    </div>
  );

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>📦 Checkout</h2>

      <div style={styles.grid}>

        {/* ฟอร์มกรอกข้อมูล */}
        <div style={styles.formBox}>
          <h3 style={styles.formTitle}>ข้อมูลการจัดส่ง</h3>

          {[
            { key: 'name',    label: 'ชื่อ-นามสกุล',  placeholder: 'เช่น สมชาย มากมี' },
            { key: 'email',   label: 'อีเมล',          placeholder: 'เช่น user@email.com' },
            { key: 'address', label: 'ที่อยู่จัดส่ง',  placeholder: 'เช่น 123 ถ.กรุงเทพ' },
          ].map(field => (
            <div key={field.key} style={styles.fieldBox}>
              <label style={styles.label}>{field.label}</label>
              <input
                placeholder={field.placeholder}
                value={form[field.key]}
                onChange={e => {
                  setForm({ ...form, [field.key]: e.target.value });
                  setErrors({ ...errors, [field.key]: '' });
                }}
                style={{
                  ...styles.input,
                  borderColor: errors[field.key] ? '#f43f5e' : '#e5e7eb',
                }}
                data-testid={`input-${field.key}`}
              />
              {errors[field.key] && (
                <span style={styles.errorMsg}>{errors[field.key]}</span>
              )}
            </div>
          ))}

          <button
            onClick={handleSubmit}
            style={styles.submitBtn}
            data-testid="submit-order"
          >
            ✓ ยืนยันการสั่งซื้อ
          </button>
        </div>

        {/* Order Summary */}
        <div style={styles.summaryBox}>
          <h3 style={styles.formTitle}>สรุปคำสั่งซื้อ</h3>

          {cart.length === 0 ? (
            <p style={{ color: '#6b7280' }}>ไม่มีสินค้าในตะกร้า</p>
          ) : (
            cart.map(i => (
              <div key={i.id} style={styles.summaryRow}>
                <span>{i.name} x{i.quantity}</span>
                <span>฿{(i.price * i.quantity).toLocaleString()}</span>
              </div>
            ))
          )}

          <hr style={{ margin: '16px 0', borderColor: '#e5e7eb' }} />
          <div style={styles.totalRow}>
            <strong>ยอดรวมทั้งหมด</strong>
            <strong style={{ color: '#6366f1', fontSize: '1.2rem' }}>
              ฿{total.toLocaleString()}
            </strong>
          </div>
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '24px',
  },
  heading: {
    marginBottom: '24px',
    color: '#1e1b4b',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
  },
  formBox: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
  },
  formTitle: {
    marginBottom: '20px',
    color: '#1e1b4b',
  },
  fieldBox: {
    marginBottom: '16px',
  },
  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
    color: '#374151',
    fontSize: '0.9rem',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid #e5e7eb',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  errorMsg: {
    color: '#f43f5e',
    fontSize: '0.8rem',
    marginTop: '4px',
    display: 'block',
  },
  submitBtn: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '8px',
  },
  summaryBox: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    height: 'fit-content',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    color: '#374151',
    fontSize: '0.95rem',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  success: {
    textAlign: 'center',
    padding: '80px 24px',
  },
  successTitle: {
    fontSize: '2rem',
    color: '#1e1b4b',
    marginTop: '16px',
  },
  successSub: {
    fontSize: '1.1rem',
    margin: '8px 0',
  },
  homeBtn: {
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: 'white',
    border: 'none',
    padding: '14px 32px',
    borderRadius: '12px',
    fontSize: '1rem',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};