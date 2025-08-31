import React, { useEffect, useState } from "react";
import Table from "./Table";
import axios from "axios";

const UserLists = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/customer");
      setCustomers(response.data.customers);
    } catch (err) {
      console.error("Error fetching customers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/customer/create",
        { name, email, phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message || "Customer added successfully");
      setName("");
      setEmail("");
      setPhone("");
      setShowForm(false);
      fetchCustomers();
    } catch (err) {
      console.error(err.message);
      alert("Error adding customer");
    }
  };

  return (
    <>
      <div className="mt-4 m-5 flex flex-col md:flex-row justify-between gap-3 md:gap-0">
        <h2 className="text-lg font-semibold">Accounts</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 shadow-xl text-white hover:bg-blue-600 font-bold py-2 px-6 rounded-xl flex items-center gap-2 text-sm md:text-base"
        >
          <i className="bi bi-plus"></i>
          <span>New Account</span>
        </button>
      </div>

      {showForm && (
        <div className="m-5 p-5 bg-gray-100 rounded-xl shadow-lg">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full max-w-md"
          >
            <input
              type="text"
              placeholder="Customer Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 border rounded-lg w-full"
              required
            />
            <input
              type="email"
              placeholder="Customer Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border rounded-lg w-full"
              required
            />
            <input
              type="text"
              placeholder="Customer Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-2 border rounded-lg w-full"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
            >
              Save
            </button>
          </form>
        </div>
      )}

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 m-5">
        {loading ? (
          <div className="p-5 text-center text-gray-600 font-medium">
            Loading...
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">Customer Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Phone</th>
                <th scope="col" className="px-6 py-3">Created At</th>
                <th scope="col" className="px-6 py-3">Updated At</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            {customers.map((x) => (
              <Table
                key={x._id}
                refreshCustomers={fetchCustomers}
                customer={x}
              />
            ))}
          </table>
        )}
      </div>
    </>
  );
};

export default UserLists;
