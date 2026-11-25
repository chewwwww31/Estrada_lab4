
import { useState } from "react";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import "./App.css";

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  function handleAddToCart(productTitle) {
    setCartCount(cartCount + 1);
    setLastAdded(productTitle);
  }

  return (
    <div className="app">

      <header>
        <h1>CvSU Mini Store</h1>
        <p>Your simple online shopping experience</p>
      </header>

      <div className="cart-message">
        {cartCount === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <p>
            Items added to cart: {cartCount}
            {" "}(Last added: {lastAdded})
          </p>
        )}
      </div>

      <main className="product-grid">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            category={product.category}
            inStock={product.inStock}
            onAddToCart={handleAddToCart}
          >
            {product.badge && (
              <span className="badge">
                {product.badge}
              </span>
            )}
          </ProductCard>
        ))}

      </main>

    </div>
  );
}

export default App;
