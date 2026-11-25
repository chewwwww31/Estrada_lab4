
function ProductCard({
  title,
  price,
  category = "General",
  inStock,
  onAddToCart,
  children
}) {
  return (
    <div className={`product-card ${!inStock ? "out-of-stock" : ""}`}>
      {children}

      <h2>{title}</h2>

      <p className="category">{category}</p>

      <h3>
        ₱{price.toLocaleString("en-PH", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        })}
      </h3>

      {inStock ? (
        <p className="stock available">In Stock</p>
      ) : (
        <p className="stock unavailable">Out of Stock</p>
      )}

      <button
        disabled={!inStock}
        onClick={() => onAddToCart(title)}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
