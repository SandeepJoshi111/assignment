import PropTypes from "prop-types";
import { useState } from "react";
import { itemData } from "../data/itemData";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
const TableContent = ({ checkedItems, handleCheckboxChange }) => {
  // Define items per page
  const ITEMS_PER_PAGE = 10;

  // State for the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the range of items to display
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = currentPage * ITEMS_PER_PAGE;

  // Determine the items to display for the current page
  const itemsToDisplay = itemData.slice(startIndex, endIndex);

  // Calculate the total number of pages
  const totalPages = Math.ceil(itemData.length / ITEMS_PER_PAGE);

  // Function to handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <table className="w-full text-xl">
        <thead>
          <tr className="bg-gray-200 text-gray-700 text-center">
            <th className="p-3 border-b-2">Name</th>
            <th className="p-3 border-b-2">Weight</th>
            <th className="p-3 border-b-2">Price</th>
            <th className="p-3 border-b-2">Checkout</th>
          </tr>
        </thead>
        <tbody>
          {itemsToDisplay.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="p-3 text-center">{item.name}</td>
              <td className="p-3 text-center">{item.weight}g</td>
              <td className="p-3 text-center">${item.price.toFixed(2)}</td>
              <td className="p-3 text-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-red-500 rounded"
                  checked={checkedItems[item.name] || false}
                  onChange={(e) =>
                    handleCheckboxChange(item.name, e.target.checked)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-controls text-center py-4">
        <button
          className="mr-2 p-2"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <IoIosArrowBack />
        </button>
        <span className="text-xl">
          {currentPage}/{totalPages}
        </span>
        <button
          className="ml-2 p-2"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </>
  );
};
TableContent.propTypes = {
  checkedItems: PropTypes.objectOf(PropTypes.bool).isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default TableContent;
