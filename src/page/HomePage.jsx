import { useState } from "react";
import { itemData } from "../data/itemData";
import OrderButton from "../compoment/OrderButton";
import TableContent from "../compoment/TableContent";
import OrderOutput from "../compoment/OrderOutput";
import PlaceOrder from "../compoment/PlaceOrder";
import Title from "../compoment/Title";

const HomePage = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [packages, setPackages] = useState([]);
  // Handler for checkbox change
  const handleCheckboxChange = (itemName, isChecked) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [itemName]: isChecked,
    }));
  };

  // Calculate total weight, total price, and selected items
  let totalWeight = 0;
  let totalPrice = 0;
  const checkedItemNames = [];
  const selectedItems = [];

  for (const item of itemData) {
    if (checkedItems[item.name]) {
      totalWeight += item.weight;
      totalPrice += item.price;
      checkedItemNames.push(item.name);
      selectedItems.push(item); // Add selected item to array
    }
  }

  // Function to handle order placement and package calculation
  const handleOrderPlacement = () => {
    const selectedItems = itemData.filter((item) => checkedItems[item.name]);
    // Initialize the packages list
    let newPackages = [];
    const maxPrice = 250; // Maximum allowed package price

    // Weight brackets for shipping
    const shippingCharges = [
      { maxWeight: 200, charge: 5 },
      { maxWeight: 500, charge: 10 },
      { maxWeight: 1000, charge: 15 },
      { maxWeight: 5000, charge: 20 },
    ];
    // Sort selected items by weight
    selectedItems.sort((a, b) => b.weight - a.weight);

    // Initialize the first package
    let currentPackage = {
      items: [],
      totalWeight: 0,
      totalPrice: 0,
    };

    // Function to determine the shipping charge based on weight
    const getShippingCharge = (weight) => {
      for (const bracket of shippingCharges) {
        if (weight <= bracket.maxWeight) {
          return bracket.charge;
        }
      }
      // If weight is more than 5000g, default to highest charge
      return shippingCharges[shippingCharges.length - 1].charge;
    };
    // Iterate over selected items and form packages
    for (const item of selectedItems) {
      // Check if the current package can accommodate the item without exceeding the maximum price
      if (currentPackage.totalPrice + item.price <= maxPrice) {
        // Add the item to the current package
        currentPackage.items.push(item.name);
        currentPackage.totalWeight += item.weight;
        currentPackage.totalPrice += item.price;
      } else {
        // Push the current package to packages list and start a new package
        currentPackage.courierPrice = getShippingCharge(
          currentPackage.totalWeight
        ); // Add courier price to package
        newPackages.push(currentPackage);
        currentPackage = {
          items: [],
          totalWeight: 0,
          totalPrice: 0,
        };
        // Add the current item to the new package
        currentPackage.items.push(item.name);
        currentPackage.totalWeight += item.weight;
        currentPackage.totalPrice += item.price;
      }
    }

    // Add the last package if not empty
    if (currentPackage.items.length > 0) {
      currentPackage.courierPrice = getShippingCharge(
        currentPackage.totalWeight
      );
      newPackages.push(currentPackage);
    }

    // Update the packages state with the new packages
    setPackages(newPackages);
  };
  return (
    <>
      <Title />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white shadow rounded-lg mt-2">
          <TableContent
            checkedItems={checkedItems}
            handleCheckboxChange={handleCheckboxChange}
          />
        </div>
      </div>
      <div className="flex justify-between items-center p-4 text-xl w-full">
        <PlaceOrder
          checkedItemNames={checkedItemNames}
          totalWeight={totalWeight}
          totalPrice={totalPrice}
        />
        <OrderButton onOrderPlacement={handleOrderPlacement} />
      </div>
      <OrderOutput packages={packages} />
    </>
  );
};

export default HomePage;
