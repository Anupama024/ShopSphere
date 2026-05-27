// Cart utility functions for managing cart items in localStorage

const CART_STORAGE_KEY = 'shopsphere_cart';

/**
 * Get all cart items from localStorage
 */
export const getCartItems = () => {
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error getting cart items:', error);
    return [];
  }
};

/**
 * Save cart items to localStorage
 */
export const saveCartItems = (items) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('cartUpdated'));
  } catch (error) {
    console.error('Error saving cart items:', error);
  }
};

/**
 * Add item to cart or increase quantity if already exists
 */
export const addToCart = (product, quantity = 1, selectedSize = null) => {
  const items = getCartItems();
  const existingItem = items.find(
    item => item.id === product.id && item.selectedSize === selectedSize
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    items.push({
      ...product,
      quantity,
      selectedSize,
      cartItemId: `${product.id}-${selectedSize}-${Date.now()}` // Unique ID for cart item
    });
  }

  saveCartItems(items);
  return items;
};

/**
 * Remove item from cart by cartItemId
 */
export const removeFromCart = (cartItemId) => {
  let items = getCartItems();
  items = items.filter(item => item.cartItemId !== cartItemId);
  saveCartItems(items);
  return items;
};

/**
 * Update quantity of an item in cart
 */
export const updateCartItemQuantity = (cartItemId, quantity) => {
  const items = getCartItems();
  const item = items.find(i => i.cartItemId === cartItemId);
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(cartItemId);
    }
    item.quantity = quantity;
    saveCartItems(items);
  }
  return items;
};

/**
 * Clear entire cart
 */
export const clearCart = () => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([]));
};

/**
 * Get cart count
 */
export const getCartCount = () => {
  return getCartItems().length;
};

/**
 * Calculate cart totals
 */
export const calculateCartTotals = (items) => {
  const subtotal = items.reduce((sum, item) => {
    const price = parseInt(item.price?.replace(/[^\d]/g, '') || 0);
    return sum + price * item.quantity;
  }, 0);

  const discount = Math.floor(subtotal * 0.15); // 15% discount
  const deliveryFee = subtotal > 180 ? 0 : 80; // Free shipping above ₹180
  const total = subtotal - discount + deliveryFee;

  return {
    subtotal,
    discount,
    deliveryFee,
    total
  };
};
