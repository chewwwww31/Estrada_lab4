
function SearchBar({
  searchText,
  setSearchText,
  category,
  setCategory,
  sortOrder,
  setSortOrder,
  onClearFilters
}) {
  return (
    <div className="search-bar">

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {/* Category Filter */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Books">Books</option>
        <option value="School Supplies">School Supplies</option>
        <option value="Accessories">Accessories</option>
      </select>

      {/* Price Sorting */}
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="default">Default</option>
        <option value="low-high">Price: Low to High</option>
        <option value="high-low">Price: High to Low</option>
      </select>

      {/* Clear Filters */}
      <button onClick={onClearFilters}>
        Clear Filters
      </button>

    </div>
  );
}

export default SearchBar;
