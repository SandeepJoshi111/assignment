import PropTypes from "prop-types";

const PlaceOrder = ({ checkedItemNames, totalWeight, totalPrice }) => {
  return (
    <>
      <div className="w-[60%]">
        <p>Checked Items: {checkedItemNames.join(", ")}</p>
        <p>Total Weight: {totalWeight}g</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
      </div>
    </>
  );
};
PlaceOrder.propTypes = {
  checkedItemNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalWeight: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

export default PlaceOrder;
