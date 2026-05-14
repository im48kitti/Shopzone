 
import { createContext, useContext, useReducer } from 'react';

// 1. สร้าง Context
const CartContext = createContext();

// 2. Reducer — logic ทั้งหมดของ cart อยู่ที่นี่
const cartReducer = (state, action) => {
  switch (action.type) {

    case 'ADD_ITEM': {
      // ถ้าสินค้านี้มีอยู่แล้วใน cart → เพิ่ม quantity
      const exists = state.find(i => i.id === action.payload.id);
      if (exists) {
        return state.map(i =>
          i.id === action.payload.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      // ถ้าไม่มี → เพิ่มเป็นรายการใหม่
      return [...state, { ...action.payload, quantity: 1 }];
    }

    case 'REMOVE_ITEM':
      return state.filter(i => i.id !== action.payload);

    case 'UPDATE_QTY':
      return state.map(i =>
        i.id === action.payload.id
          ? { ...i, quantity: action.payload.qty }
          : i
      );

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
};

// 3. Provider — ครอบ app ทั้งหมดเพื่อให้ทุก component ใช้ cart ได้
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addItem    = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeItem = (id)      => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQty  = (id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
  const clearCart  = ()        => dispatch({ type: 'CLEAR_CART' });

  // คำนวณ total ราคา และจำนวนสินค้าทั้งหมด
  const total     = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQty, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

// 4. Custom hook — ไว้เรียกใช้ใน component อื่น
export const useCart = () => useContext(CartContext);