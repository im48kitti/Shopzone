import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    // ลบออกอัตโนมัติหลัง 3 วินาที
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div style={styles.container}>
        {toasts.map(toast => (
          <div
            key={toast.id}
            style={{
              ...styles.toast,
              background: toast.type === 'success' ? '#10b981' :
                          toast.type === 'wishlist' ? '#f43f5e' : '#6366f1',
            }}
          >
            <span>
              {toast.type === 'success'  ? '🛒' :
               toast.type === 'wishlist' ? '❤️' : 'ℹ️'}
            </span>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const styles = {
  container: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    zIndex: 9999,
  },
  toast: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: 'white',
    padding: '14px 20px',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '0.95rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
    animation: 'slideIn 0.3s ease',
    minWidth: '260px',
  },
};