function SearchBar({
  searchText,
  onSearchChange,
  category,
  onCategoryChange,
  sortOrder,
  onSortChange,
  onClearFilters,
}) {
  return (
    <section className="search-bar" aria-label="Search and filter products">
      <div className="search-bar__group search-bar__group--search">
        <label htmlFor="search-input" className="search-bar__label">
          Search Products
        </label>
        <input
          id="search-input"
          type="text"
          className="search-bar__input"
          placeholder="Search by title (e.g., mouse, notebook)..."
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="search-bar__group">
        <label htmlFor="category-select" className="search-bar__label">
          Category
        </label>
        <select
          id="category-select"
          className="search-bar__select"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="School Supplies">School Supplies</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      <div className="search-bar__group">
        <label htmlFor="sort-select" className="search-bar__label">
          Sort By
        </label>
        <select
          id="sort-select"
          className="search-bar__select"
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <div className="search-bar__group search-bar__group--action">
        <button
          type="button"
          className="clear-btn"
          onClick={onClearFilters}
        >
          Clear Filters
        </button>
      </div>
    </section>
  );
}

export default SearchBar;