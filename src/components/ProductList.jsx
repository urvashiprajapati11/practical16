
function ProductList({ products, search, setSearch, onDelete }) {
  const formatPrice = (price) =>
    price.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    });

  return (
    <section className="panel product-panel">
      <div className="list-header">
        <div>
          <h2>Product Inventory</h2>
          <p>View and manage all registered products.</p>
        </div>

        <div className="search-box">
          <span>⌕</span>
          <input
            type="search"
            aria-label="Search products"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Product ID</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Stock Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="product-name-cell">
                      <div className="product-avatar">
                        {product.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <strong>{product.name}</strong>
                        <span>
                          {product.description || "No description"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className="product-id">{product.id}</span>
                  </td>

                  <td>
                    <span className="category-badge">
                      {product.category}
                    </span>
                  </td>

                  <td className="price-cell">
                    {formatPrice(product.price)}
                  </td>

                  <td>{product.quantity}</td>

                  <td>
                    <span
                      className={`stock-badge ${
                        product.quantity === 0
                          ? "out-of-stock"
                          : product.quantity <= 5
                            ? "low-stock"
                            : "in-stock"
                      }`}
                    >
                      {product.quantity === 0
                        ? "Out of stock"
                        : product.quantity <= 5
                          ? "Low stock"
                          : "In stock"}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => onDelete(product.id)}
                      aria-label={`Delete ${product.name}`}
                      title="Delete product"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty-state">
                  <div className="empty-icon">▤</div>
                  <strong>No products found</strong>
                  <p>
                    {search
                      ? "Try another search term."
                      : "Add your first product using the form above."}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer">
        <span>
          Showing <strong>{products.length}</strong> product
          {products.length !== 1 ? "s" : ""}
        </span>
      </div>
    </section>
  );
}

export default ProductList;
