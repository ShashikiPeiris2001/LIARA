// export interface CartItem {
//   ProductID: number;
//   Name: string;
//   Price: number;
//   Quantity: number;
//   ImageUrl?: string;
//   Size?: string;
//   Color?: string;
// }

// const CART_KEY = "cart";

// export function getCart(): CartItem[] {
//   return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
// }

// function saveCart(items: CartItem[]) {
//   localStorage.setItem(CART_KEY, JSON.stringify(items));
//   // notify everyone that cart changed
//   window.dispatchEvent(new Event("cartUpdated"));
// }

// export function addToCart(item: CartItem) {
//   const cart = getCart();
//   const existing = cart.find((i) => i.ProductID === item.ProductID);
//   if (existing) {
//     existing.Quantity += item.Quantity;
//   } else {
//     cart.push(item);
//   }
//   saveCart(cart);
// }

// export function removeFromCart(productId: number) {
//   const cart = getCart().filter((i) => i.ProductID !== productId);
//   saveCart(cart);
// }

export interface CartItem {
  ProductID: number;
  Name: string;
  Price: number;
  Quantity: number;
  ImageUrl?: string;
  Size?: string;
  Color?: string;
}

const CART_KEY = "cart";

export function getCart(): CartItem[] {
  const raw = localStorage.getItem(CART_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  // Optionally notify other parts of your app that the cart was updated
  window.dispatchEvent(new Event("cartUpdated"));
}

export function addToCart(item: CartItem) {
  const cart = getCart();
  const existing = cart.find((i) => i.ProductID === item.ProductID);
  if (existing) {
    existing.Quantity += item.Quantity;
  } else {
    cart.push(item);
  }
  saveCart(cart);
}

export function removeFromCart(productId: number) {
  const cart = getCart().filter((i) => i.ProductID !== productId);
  saveCart(cart);
}

/**
 * Completely clears all items from the cart.
 */
export function clearCart() {
  localStorage.removeItem(CART_KEY);
  window.dispatchEvent(new Event("cartUpdated"));
}
