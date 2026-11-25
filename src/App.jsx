
import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import products from "./data/products";
import ProductCard from "./components/ProductCard";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  // Existing Lab 3 cart states
  const [cartCount, setCartCount] = useState(0);
  const [lastAdded, setLastAdded] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  // Update browser tab title
  // Update browser title based on search results

  // Add to Cart function
  function handleAddToCart(productTitle) {
    setCartCount((prevCount) => prevCount + 1);
    setLastAdded(productTitle);
  }

  // Filter products
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  // Sort products by price
  if (sortOrder === "low-high") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  } else if (sortOrder === "high-low") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }
  
  useEffect(() => {
  document.title = `CvSU Mini Store (${filteredProducts.length} results)`;
}, [filteredProducts.length]);

  // Clear all filters
  function handleClearFilters() {
    setSearchText("");
    setDebouncedSearch("");
    setCategory("All");
    setSortOrder("default");
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

      {/* Search Bar */}
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        category={category}
        setCategory={setCategory}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onClearFilters={handleClearFilters}
      />

      {/* Product Result Counter */}
      <p className="result-count">
        Showing {filteredProducts.length} of {products.length} products
      </p>

      {/* Product Grid */}
      <main className="product-grid">

        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
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
          ))
        ) : (
          <div className="empty-state">
            <h2>No products found</h2>
            <p>Try another search or category.</p>
            <button onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
        )}

      </main>

    </div>
  );
}

export default App;
