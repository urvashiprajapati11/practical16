
function Dashboard({ totalProducts, inventoryValue, totalUnits }) {
  const stats = [
    {
      label: "Total Products",
      value: totalProducts.toLocaleString(),
      icon: "▦",
      color: "purple",
      note: "Products registered",
    },
    {
      label: "Total Units",
      value: totalUnits.toLocaleString(),
      icon: "▣",
      color: "blue",
      note: "Units in inventory",
    },
    {
      label: "Inventory Value",
      value: inventoryValue.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
      }),
      icon: "₹",
      color: "green",
      note: "Based on current stock",
    },
  ];

  return (
    <section className="stats-grid">
      {stats.map((stat) => (
        <article className="stat-card" key={stat.label}>
          <div className={`stat-icon ${stat.color}`}>
            {stat.icon}
          </div>
          <div className="stat-content">
            <p>{stat.label}</p>
            <h2>{stat.value}</h2>
            <span>{stat.note}</span>
          </div>
        </article>
      ))}
    </section>
  );
}

export default Dashboard;
