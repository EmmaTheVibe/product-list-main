export default function Confirm({ handleReceipt }) {
  return (
    <button className="confirm" onClick={handleReceipt}>
      Confirm Order
    </button>
  );
}
