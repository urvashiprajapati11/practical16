
import { useState } from "react";

const emptyForm = {
  id: "",
  name: "",
  category: "",
  price: "",
  quantity: "",
  description: "",
};

function ProductForm({ onAddProduct, existingProducts }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.id.trim() ||
      !form.name.trim() ||
      !form.category ||
      form.price === "" ||
      form.quantity === ""
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!Number.isFinite(Number(form.price)) || Number(form.price) < 0) {
      setError("Price must be a valid non-negative number.");
      return;
    }

    if (
      !Number.isInteger(Number(form.quantity)) ||
      Number(form.quantity) < 0
    ) {
      setError("Quantity must be a non-negative whole number.");
      return;
    }

    if (
      existingProducts.some(
        (product) =>
          product.id.toLowerCase() === form.id.trim().toLowerCase()
      )
    ) {
      setError("This Product ID already exists. Please use another ID.");
      return;
    }

    const result = onAddProduct({
      id: form.id.trim(),
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity),
      description: form.description.trim(),
    });

    if (result?.success === false) {
      setError(result.message);
      return;
    }

    setForm(emptyForm);
    setError("");
  };

  return (
    <section className="panel" id="add-product">
      <div className="section-header">
        <div className="section-icon">＋</div>
        <div>
          <h2>Add New Product</h2>
          <p>Enter the details below to register a new product.</p>
        </div>
      </div>

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="id">Product ID *</label>
            <input
              id="id"
              name="id"
              value={form.id}
              onChange={handleChange}
              placeholder="e.g. PRD-1003"
              maxLength={40}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
              maxLength={100}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Food">Food & Beverages</option>
              <option value="Stationery">Stationery</option>
              <option value="Home">Home & Living</option>
              <option value="Accessories">Accessories</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price (₹) *</label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              placeholder="0.00"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity *</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="0"
              step="1"
              value={form.quantity}
              onChange={handleChange}
              placeholder="Enter stock quantity"
              required
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter a short product description..."
              rows="3"
              maxLength={500}
            />
          </div>
        </div>

        <div className="form-actions">
          <span className="required-note">* Required fields</span>
          <div className="action-buttons">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setForm(emptyForm);
                setError("");
              }}
            >
              Reset
            </button>
            <button type="submit" className="btn btn-primary">
              <span>＋</span> Add Product
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default ProductForm;
