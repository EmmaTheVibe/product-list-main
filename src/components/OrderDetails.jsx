import Placeholder from "./Placeholder";
export default function OrderDetails({ orderItems, colors, children }) {
  const total = orderItems.reduce(
    (acc, orderItems) => acc + orderItems.times,
    0
  );
  return (
    <div
      className="order-details"
      style={{ backgroundColor: colors.lightRose }}
    >
      <h3 style={{ color: colors.red }}>Your Cart ({total})</h3>
      {orderItems.length !== 0 ? (
        <>{children}</>
      ) : (
        <Placeholder colors={colors} />
      )}
    </div>
  );
}
