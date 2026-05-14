 
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../context/CartContext';

// wrapper คือการครอบ CartProvider ให้ hook ใช้งานได้
const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

const mockProduct = { id: 1, name: 'Headphones', price: 1290, image: '' };
const mockProduct2 = { id: 2, name: 'Keyboard', price: 3290, image: '' };

// --- ADD ITEM ---
test('เพิ่มสินค้าใหม่เข้า cart ได้', () => {
  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => result.current.addItem(mockProduct));

  expect(result.current.cart).toHaveLength(1);
  expect(result.current.cart[0].name).toBe('Headphones');
  expect(result.current.cart[0].quantity).toBe(1);
});

test('เพิ่มสินค้าเดิมซ้ำ → quantity เพิ่มขึ้น ไม่ใช่เพิ่มรายการใหม่', () => {
  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => result.current.addItem(mockProduct));
  act(() => result.current.addItem(mockProduct));

  expect(result.current.cart).toHaveLength(1);
  expect(result.current.cart[0].quantity).toBe(2);
});

test('เพิ่มสินค้าหลายชนิด → มีหลาย item ใน cart', () => {
  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => result.current.addItem(mockProduct));
  act(() => result.current.addItem(mockProduct2));

  expect(result.current.cart).toHaveLength(2);
});

// --- REMOVE ITEM ---
test('ลบสินค้าออกจาก cart ได้', () => {
  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => result.current.addItem(mockProduct));
  act(() => result.current.removeItem(1));

  expect(result.current.cart).toHaveLength(0);
});

test('ลบสินค้าถูกตัว ไม่กระทบสินค้าอื่น', () => {
  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => result.current.addItem(mockProduct));
  act(() => result.current.addItem(mockProduct2));
  act(() => result.current.removeItem(1));

  expect(result.current.cart).toHaveLength(1);
  expect(result.current.cart[0].id).toBe(2);
});

// --- UPDATE QTY ---
test('อัพเดท quantity ของสินค้าได้', () => {
  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => result.current.addItem(mockProduct));
  act(() => result.current.updateQty(1, 5));

  expect(result.current.cart[0].quantity).toBe(5);
});

// --- TOTAL ---
test('คำนวณ total ราคาถูกต้อง', () => {
  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => result.current.addItem(mockProduct));  // 1290
  act(() => result.current.addItem(mockProduct));  // 1290 x2 = 2580

  expect(result.current.total).toBe(2580);
});

test('คำนวณ total หลายสินค้าถูกต้อง', () => {
  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => result.current.addItem(mockProduct));   // 1290
  act(() => result.current.addItem(mockProduct2));  // 3290
  // total = 1290 + 3290 = 4580

  expect(result.current.total).toBe(4580);
});

// --- ITEM COUNT ---
test('นับจำนวนสินค้าทั้งหมดใน cart ถูกต้อง', () => {
  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => result.current.addItem(mockProduct));
  act(() => result.current.addItem(mockProduct));
  act(() => result.current.addItem(mockProduct2));
  // itemCount = 2 + 1 = 3

  expect(result.current.itemCount).toBe(3);
});

// --- CLEAR CART ---
test('clearCart ล้าง cart ทั้งหมด', () => {
  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => result.current.addItem(mockProduct));
  act(() => result.current.addItem(mockProduct2));
  act(() => result.current.clearCart());

  expect(result.current.cart).toHaveLength(0);
  expect(result.current.total).toBe(0);
});