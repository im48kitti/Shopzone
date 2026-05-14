import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const mockProduct = {
  id: 1,
  name: 'Test Headphones',
  price: 1290,
  category: 'Electronics',
  image: 'https://picsum.photos/400/300',
  rating: 4.5,
  stock: 10,
};

const renderCard = () => render(
  <MemoryRouter>
    <CartProvider>
      <ProductCard product={mockProduct} />
    </CartProvider>
  </MemoryRouter>
);

test('แสดงชื่อสินค้าถูกต้อง', () => {
  renderCard();
  expect(screen.getByText('Test Headphones')).toBeInTheDocument();
});

test('แสดง category ถูกต้อง', () => {
  renderCard();
  expect(screen.getByText('Electronics')).toBeInTheDocument();
});

test('แสดงราคาถูกต้อง', () => {
  renderCard();
  expect(screen.getByText('฿1,290')).toBeInTheDocument();
});

test('มีปุ่ม Add to Cart', () => {
  renderCard();
  expect(screen.getByTestId('add-to-cart')).toBeInTheDocument();
});

test('กดปุ่ม Add to Cart แล้วไม่ crash', () => {
  renderCard();
  const btn = screen.getByTestId('add-to-cart');
  fireEvent.click(btn);
  expect(btn).toBeInTheDocument();
});

test('กดปุ่ม Add หลายครั้งได้', () => {
  renderCard();
  const btn = screen.getByTestId('add-to-cart');
  fireEvent.click(btn);
  fireEvent.click(btn);
  fireEvent.click(btn);
  expect(btn).toBeInTheDocument();
});