function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <div className="product-card__meta">
        <span>{product.category}</span>
      </div>
      <h2 className="product-card__title">{product.title}</h2>
      {product.description && (
        <p className="product-card__desc">{product.description}</p>
      )}
      <div className="product-card__footer">
        <strong className="product-card__price">
          ₱{Number(product.price).toLocaleString()}
        </strong>
        <button type="button" onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;