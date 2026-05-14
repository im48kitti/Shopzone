 
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import { MemoryRouter } from 'react-router-dom';
import CheckoutPage from '../pages/CheckoutPage';

const renderCheckout = () => render(
  <MemoryRouter>
    <CartProvider>
      <CheckoutPage />
    </CartProvider>
  </MemoryRouter>
);

test('แสดงฟอร์มครบ 3 ช่อง', () => {
  renderCheckout();
  expect(screen.getByTestId('input-name')).toBeInTheDocument();
  expect(screen.getByTestId('input-email')).toBeInTheDocument();
  expect(screen.getByTestId('input-address')).toBeInTheDocument();
});

test('มีปุ่ม submit', () => {
  renderCheckout();
  expect(screen.getByTestId('submit-order')).toBeInTheDocument();
});

test('กรอกชื่อในฟอร์มได้', () => {
  renderCheckout();
  const input = screen.getByTestId('input-name');
  fireEvent.change(input, { target: { value: 'Kittisak' } });
  expect(input.value).toBe('Kittisak');
});

test('กรอกอีเมลในฟอร์มได้', () => {
  renderCheckout();
  const input = screen.getByTestId('input-email');
  fireEvent.change(input, { target: { value: 'gas@email.com' } });
  expect(input.value).toBe('gas@email.com');
});

test('กรอกที่อยู่ในฟอร์มได้', () => {
  renderCheckout();
  const input = screen.getByTestId('input-address');
  fireEvent.change(input, { target: { value: '123 Phitsanulok' } });
  expect(input.value).toBe('123 Phitsanulok');
});

test('กด submit โดยไม่กรอกข้อมูล → ไม่ crash', () => {
  renderCheckout();
  const btn = screen.getByTestId('submit-order');
  fireEvent.click(btn);
  // ยังเห็นฟอร์มอยู่ = validation ทำงาน
  expect(screen.getByTestId('input-name')).toBeInTheDocument();
});

test('กรอกครบแล้ว submit → แสดงหน้า success', () => {
  renderCheckout();
  fireEvent.change(screen.getByTestId('input-name'),    { target: { value: 'Kittisak' } });
  fireEvent.change(screen.getByTestId('input-email'),   { target: { value: 'gas@email.com' } });
  fireEvent.change(screen.getByTestId('input-address'), { target: { value: '123 Phitsanulok' } });
  fireEvent.click(screen.getByTestId('submit-order'));
  expect(screen.getByText('สั่งซื้อสำเร็จ!')).toBeInTheDocument();
});