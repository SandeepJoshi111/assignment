import PropTypes from "prop-types";

const OrderOutput = ({ packages }) => {
  return (
    <>
      <h2 className="text-xl font-bold px-4 pt-4">Order Packages:</h2>
      <div className="p-4  flex gap-5">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="p-2 border rounded-lg my-2 text-wrap w-[15rem]"
          >
            <h3 className="text-lg font-bold">Package {index + 1}</h3>
            <p>Items: {pkg.items.join(", ")}</p>
            <p>Total weight: {pkg.totalWeight}g</p>
            <p>Total price: ${pkg.totalPrice.toFixed(2)}</p>
            <p>Courier price: ${pkg.courierPrice.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </>
  );
};

OrderOutput.propTypes = {
  packages: PropTypes.arrayOf(
    PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.string).isRequired,
      totalWeight: PropTypes.number.isRequired,
      totalPrice: PropTypes.number.isRequired,
      courierPrice: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default OrderOutput;
