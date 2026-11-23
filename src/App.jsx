import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar.jsx";
import ProductCard from "./components/ProductCard.jsx";
import products from "./data/products.js";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const [cart, setCart] = useState([]);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  const normalizedQuery = debouncedSearch.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesTitle = product.title
      .toLowerCase()
      .includes(normalizedQuery);
    const matchesCategory =
      category === "All" || product.category === category;
    return matchesTitle && matchesCategory;
  });

  const displayedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "price-asc") {
      return Number(a.price) - Number(b.price);
    }
    if (sortOrder === "price-desc") {
      return Number(b.price) - Number(a.price);
    }
    return 0;
  });

  useEffect(() => {
    document.title = `CvSU Mini Store (${displayedProducts.length} results)`;
  }, [displayedProducts.length]);

  const handleClearFilters = () => {
    setSearchText("");
    setDebouncedSearch("");
    setCategory("All");
    setSortOrder("default");
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    setCartMessage(`Added "${product.title}" to cart.`);
  };

  return (
    <div className="app">
      <header className="store-header">
        <div className="store-header__inner">
          <div>
            <p className="store-header__eyebrow">DCIT26 Mini Catalog</p>
            <h1 className="store-header__title">CvSU Mini Store</h1>
          </div>
          <div className="cart-pill" aria-live="polite">
            Cart: <strong>{cart.length}</strong>{" "}
            {cart.length === 1 ? "item" : "items"}
          </div>
        </div>
      </header>

      <main className="store-main">
        {cartMessage && (
          <div className="cart-banner" role="status">
            <span>{cartMessage}</span>
            <button
              type="button"
              className="cart-banner__dismiss"
              onClick={() => setCartMessage("")}
              aria-label="Dismiss cart message"
            >
              ×
            </button>
          </div>
        )}

        <SearchBar
          searchText={searchText}
          onSearchChange={setSearchText}
          category={category}
          onCategoryChange={setCategory}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          onClearFilters={handleClearFilters}
        />

        <div className="results-bar">
          <p className="results-count">
            Showing <strong>{displayedProducts.length}</strong> of{" "}
            <strong>{products.length}</strong> products
          </p>
          {searchText !== debouncedSearch && (
            <span className="typing-indicator">Searching...</span>
          )}
        </div>

        {displayedProducts.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state__title">
              No products found. Try a different keyword or category.
            </p>
            <button
              type="button"
              className="clear-btn clear-btn--outline"
              onClick={handleClearFilters}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;