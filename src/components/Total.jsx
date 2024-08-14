export default function Total({ orderItems, className, colors }) {
  const total = orderItems.reduce(
    (acc, orderItems) => acc + orderItems.total,
    0
  );
  return (
    <div className={className}>
      <p style={{ fontWeight: "600", color: colors.dark }}>Order total</p>
      <p className="total-txt">${total.toFixed(2)}</p>
    </div>
  );
}
