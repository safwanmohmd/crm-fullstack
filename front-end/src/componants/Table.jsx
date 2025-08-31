import React, { useState } from "react";
import axios from "axios";

const Table = ({ customer, refreshCustomers }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(customer.name);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phone);
  const token = localStorage.getItem("token");

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/customer/edit/${customer._id}`,
        { name, email, phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEditing(false);
      refreshCustomers();
      alert(res.data.message);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/customer/delete/${customer._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message || "Customer deleted successfully");
      refreshCustomers();
    } catch (err) {
      console.error(err);
      alert("Failed to delete customer");
    }
  };

  return (
    <tbody>
      <tr className="bg-white border-b hover:bg-gray-50">
        <td className="w-4 p-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500"
            />
          </div>
        </td>

        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {isEditing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
          ) : (
            customer.name
          )}
        </th>

        <td className="px-6 py-4">
          {isEditing ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
          ) : (
            customer.email
          )}
        </td>

        <td className="px-6 py-4">
          {isEditing ? (
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
          ) : (
            customer.phone
          )}
        </td>

        <td className="px-6 py-4">{new Date(customer.createdAt).toLocaleDateString("en-GB")}</td>
        <td className="px-6 py-4">{new Date(customer.updatedAt).toLocaleDateString("en-GB")}</td>

        <td className="flex items-center px-6 py-4 gap-2 flex-wrap">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                className="bg-green-200 text-green-600 px-4 py-2 rounded hover:underline"
              >
                Update
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setName(customer.name);
                  setEmail(customer.email);
                  setPhone(customer.phone);
                }}
                className="bg-gray-200 text-gray-600 px-4 py-2 rounded hover:underline"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-200 text-blue-600 px-4 py-2 rounded hover:underline"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-200 text-red-600 px-4 py-2 rounded hover:underline"
              >
                Remove
              </button>
            </>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default Table;
