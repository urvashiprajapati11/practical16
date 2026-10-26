
import { useEffect, useState } from "react";
import DashBoard from "./components/DashBoard";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

const initialProducts = [
  {
    id: "PRD-1001",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2499,
    quantity: 15,
    description: "Wireless headphones with clear sound.",
  },
  {
    id: "PRD-1002",
    name: "Office Notebook",
    category: "Stationery",
    price: 120,
    quantity: 40,
    description: "A5 notebook for everyday use.",
  },
];

function App() {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem("products");
      return saved === null ? initialProducts : JSON.parse(saved);
    } catch {
      return initialProducts;
    }
  });

  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (product) => {
    const exists = products.some(
      (item) => item.id.toLowerCase() === product.id.toLowerCase()
    );

    if (exists) {
      return { success: false, message: "Product ID already exists." };
    }

    setProducts((current) => [product, ...current]);
    setMessage("Product added successfully!");

    return { success: true };
  };

  const deleteProduct = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      setProducts((current) => current.filter((item) => item.id !== id));
      setMessage("Product deleted successfully!");
    }
  };

  const filteredProducts = products.filter((product) =>
    [
      product.id,
      product.name,
      product.category,
    ].some((value) =>
      value.toLowerCase().includes(search.toLowerCase())
    )
  );

  const inventoryValue = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">P</div>
          <div>
            <h2>ProductHub</h2>
            <span>Management System</span>
          </div>
        </div>

        <p className="nav-heading">WORKSPACE</p>
        <div className="nav-item active">
          <span>▦</span> Products
        </div>
        <div className="nav-item">
          <span>▤</span> Inventory
        </div>

        <div className="sidebar-bottom">
          <div className="profile-avatar">A</div>
          <div>
            <strong>Administrator</strong>
            <span>Product Manager</span>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="breadcrumb">Workspace / Products</p>
            <h1>Product Management</h1>
            <p className="subtitle">
              Manage your products and keep your inventory organized.
            </p>
          </div>
          <div className="topbar-badge">
            <span className="status-dot" /> System Online
          </div>
        </header>

        <Dashboard
          totalProducts={products.length}
          inventoryValue={inventoryValue}
          totalUnits={products.reduce(
            (sum, product) => sum + product.quantity,
            0
          )}
        />

        {message && (
          <div className="success-message" role="status">
            <span>✓</span> {message}
            <button
              type="button"
              aria-label="Dismiss message"
              onClick={() => setMessage("")}
            >
              ×
            </button>
          </div>
        )}

        <ProductForm
          onAddProduct={addProduct}
          existingProducts={products}
        />

        <ProductList
          products={filteredProducts}
          search={search}
          setSearch={setSearch}
          onDelete={deleteProduct}
        />

        <footer className="footer">
          ProductHub · Product Management System
        </footer>
      </main>
    </div>
  );
}

export default App;
