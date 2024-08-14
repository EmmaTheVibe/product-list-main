export default function ItemCard({
  src,
  category,
  name,
  price,
  onClick,
  selected,
  count,
  increaseCount,
  decreaseCount,
  colors,
}) {
  return (
    <div className="item-card">
      <div className={`pic ${selected ? "selected" : ""}`}>
        <img src={src} alt={name} className={selected ? "" : "bare"} />
      </div>
      <div className={`add-to-cart ${selected ? "picked" : "unpicked"}`}>
        {selected ? (
          <div className="counter">
            <button onClick={() => decreaseCount(name)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 10 2"
                className="minus"
              >
                <path className="minus-path" d="M0 .375h10v1.25H0V.375Z" />
              </svg>
            </button>
            <p style={{ color: colors.lightRose, fontWeight: "600" }}>
              {count}
            </p>
            <button onClick={() => increaseCount(name)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 10 10"
                className="plus"
              >
                <path
                  className="plus-path"
                  d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="adder" onClick={onClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              fill="none"
              viewBox="0 0 21 20"
            >
              <g fill="#C73B0F" clipPath="url(#a)">
                <path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z" />
                <path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z" />
              </g>
              <defs>
                <clipPath id="a">
                  <path fill="#fff" d="M.333 0h20v20h-20z" />
                </clipPath>
              </defs>
            </svg>
            <span>Add to cart</span>
          </div>
        )}
      </div>
      <div className="info">
        <p
          style={{
            color: colors.deepRose,
            fontWeight: "400",
            lineHeight: "21px",
            marginTop: "12px",
          }}
        >
          {category}
        </p>
        <p
          style={{ fontWeight: "600", lineHeight: "24px", color: colors.dark }}
        >
          {name}
        </p>
        <p style={{ color: colors.red, fontWeight: "600", lineHeight: "24px" }}>
          ${price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
