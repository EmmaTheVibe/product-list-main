export default function Placeholder({ colors }) {
  return (
    <div className="placeholder">
      <img
        src="./assets/images/illustration-empty-cart.svg"
        alt=""
        className="placeholder"
      />
      <p style={{ fontWeight: "600", fontSize: "14px", color: colors.dark }}>
        Your added items will appear here
      </p>
    </div>
  );
}
