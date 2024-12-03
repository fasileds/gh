import Image from "next/image";
import { Product } from "@/types/product";
import { FaTrash } from "react-icons/fa";

const productData: Product[] = [
  {
    image:
      "https://images.unsplash.com/photo-1454944338482-a69bb95894af?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Pizza",
    price: 296,
    profit: 45,
  },
  {
    image:
      "https://images.unsplash.com/photo-1454944338482-a69bb95894af?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Burger",
    price: 546,
    profit: 125,
  },
  {
    image:
      "https://images.unsplash.com/photo-1483918793747-5adbf82956c4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Steak",
    price: 443,
    profit: 247,
  },
  {
    image:
      "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Fruit",
    price: 499,
    profit: 103,
  },
];

const TableTwo = () => {
  return (
    <div className="w-full m-6 mx-auto shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-8 md:px-8 xl:px-12 ">
        <h4 className="text-3xl font-extrabold  tracking-wide">
          Uploaded Videos
        </h4>
      </div>

      <div className="grid grid-cols-7 px-4 py-3 border-b border-gray-200 sm:grid-cols-8 gap-4">
        <div className="col-span-3">
          <p className="font-medium text-gray-800">Product Name</p>
        </div>
        <div className="col-span-1">
          <p className="font-medium text-gray-800">Price</p>
        </div>
        <div className="col-span-1">
          <p className="font-medium text-gray-800">Profit</p>
        </div>
        <div className="col-span-1">
          <p className="font-medium text-gray-800 text-center">Actions</p>
        </div>
      </div>
      {productData.map((product, key) => (
        <div
          className="grid grid-cols-7 px-4 py-3 border-b border-gray-200 sm:grid-cols-8 gap-4 items-center"
          key={key}
        >
          <div className="col-span-3 flex items-center gap-4">
            <Image
              src={product.image}
              width={48}
              height={48}
              alt="Product"
              className="object-cover rounded-md shadow-sm"
            />
            <p className="text-gray-800 truncate">{product.name}</p>
          </div>
          <div className="col-span-1">
            <p className="text-gray-800">${product.price}</p>
          </div>
          <div className="col-span-1">
            <p className="text-green-600">${product.profit}</p>
          </div>
          <div className="col-span-1 flex justify-center">
            <button className="text-red-500 hover:text-red-700">
              <FaTrash size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTwo;
