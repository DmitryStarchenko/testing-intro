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

function changeQuantity() {
  return notImplemented();
}
function removeFromCart() {
  return notImplemented();
}
function calculateCartSubtotal() {
  return notImplemented();
}
function calculateOrderTotal() {
  return notImplemented();
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
