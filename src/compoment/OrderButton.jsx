import PropTypes from "prop-types";

const OrderButton = ({ onOrderPlacement }) => {
  return (
    <>
      <button
        className="bg-red-500 text-white p-3 font-bold rounded-xl hover:bg-red-600"
        onClick={onOrderPlacement} // Call the onOrderPlacement function when clicked
      >
        Place Order
      </button>
    </>
  );
};
OrderButton.propTypes = {
  onOrderPlacement: PropTypes.func.isRequired,
};
export default OrderButton;
