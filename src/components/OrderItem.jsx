export default function OrderItem({
  name,
  rate,
  times,
  removeItem,
  total,
  colors,
}) {
  return (
    <div className="order-item">
      <div className="item-details">
        <p className="item-name">{name}</p>
        <div className="multiply">
          <span className="times" style={{ color: colors.red }}>
            {times}x
          </span>
          <span className="rate">@${rate.toFixed(2)}</span>
          <span className="item-total">${total.toFixed(2)}</span>
        </div>
      </div>
      <span className="remove" onClick={() => removeItem(name)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          className="x-svg"
          viewBox="0 0 10 10"
        >
          <path
            className="x-path"
            d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
          />
        </svg>
      </span>
    </div>
  );
}
