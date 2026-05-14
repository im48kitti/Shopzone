import { useState } from 'react';
import products from '../data/products';
import ProductCard from '../components/ProductCard';

const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Sports'];

export default function HomePage() {
  const [selected, setSelected] = useState('All');
  const [search, setSearch]     = useState('');

  // กรองสินค้าตาม category และ search
  const filtered = products.filter(p =>
    (selected === 'All' || p.category === selected) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>

      {/* Hero Banner */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Find What You Love 🎨</h1>
        <p style={styles.heroSub}>สินค้าคุณภาพดี ราคาสบายกระเป๋า</p>
        <input
          placeholder="🔍 ค้นหาสินค้า..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={styles.search}
        />
      </div>

      {/* Filter Buttons */}
      <div style={styles.filters}>
        {categories.map(c => (
          <button
            key={c}
            style={selected === c ? styles.activeFilter : styles.filter}
            onClick={() => setSelected(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/* จำนวนสินค้าที่เจอ */}
      <p style={styles.resultCount}>
        พบ {filtered.length} รายการ
      </p>

      {/* Product Grid */}
      {filtered.length > 0 ? (
        <div style={styles.grid}>
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div style={styles.empty}>
          <p>😕 ไม่พบสินค้าที่ค้นหา</p>
        </div>
      )}

    </div>
  );
}

const styles = {
  page: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px',
  },
  hero: {
    textAlign: 'center',
    padding: '48px 24px',
    background: 'linear-gradient(135deg, #ede9fe, #fce7f3)',
    borderRadius: '20px',
    marginBottom: '32px',
  },
  heroTitle: {
    fontSize: '2rem',
    color: '#4c1d95',
    marginBottom: '8px',
  },
  heroSub: {
    color: '#6b7280',
    marginBottom: '24px',
  },
  search: {
    padding: '12px 24px',
    width: '400px',
    maxWidth: '100%',
    borderRadius: '30px',
    border: '2px solid #a78bfa',
    fontSize: '1rem',
    outline: 'none',
  },
  filters: {
    display: 'flex',
    gap: '10px',
    marginBottom: '16px',
    flexWrap: 'wrap',
  },
  filter: {
    padding: '8px 20px',
    borderRadius: '20px',
    border: '2px solid #e5e7eb',
    cursor: 'pointer',
    background: 'white',
    fontWeight: '500',
    color: '#6b7280',
  },
  activeFilter: {
    padding: '8px 20px',
    borderRadius: '20px',
    border: '2px solid transparent',
    cursor: 'pointer',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: 'white',
    fontWeight: '600',
  },
  resultCount: {
    color: '#6b7280',
    fontSize: '0.9rem',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '24px',
  },
  empty: {
    textAlign: 'center',
    padding: '60px',
    color: '#6b7280',
    fontSize: '1.2rem',
  },
};