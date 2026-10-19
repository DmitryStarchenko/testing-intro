function addToCart(cart, product, quantity) {
  if (
    !Number.isInteger(quantity) ||
    quantity <= 0 ||
    quantity > product.stock
  ) {
    throw new RangeError("Некорректное количество товара");
  }
  const existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
    const newQuantity = existingProduct.quantity + quantity;
    if (newQuantity > product.stock) {
      throw new RangeError("Недостаточно товара на складе");
    }
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantity: newQuantity } : item,
    );
  }
  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, productId, quantity) {
  const existingProduct = cart.find((item) => item.id === productId);
  if (!existingProduct) {
    return cart;
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError("Некорректное количество товара");
  }
  if (quantity > existingProduct.stock) {
    throw new RangeError("Недостаточно товара на складе");
  }
  return cart.map((item) =>
    item.id === productId ? { ...item, quantity } : item,
  );
}

function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );
}

function calculateOrderTotal(cart, promoCode = "") {
  const subtotal = calculateCartSubtotal(cart);
  const discount =
    promoCode === "SAVE10" && subtotal >= 20000
      ? Math.round(subtotal * 0.1)
      : 0;
  const delivery = subtotal - discount >= 50000 ? 0 : 30000;
  const total = subtotal - discount + delivery;

  return {
    subtotal,
    discount,
    delivery,
    total,
  };
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== "undefined") module.exports = cartApi;
if (typeof window !== "undefined") window.cartApi = cartApi;
