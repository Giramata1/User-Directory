import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { User } from "../types";

const LOCAL_STORAGE_KEY = "addedUsers";

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
        const localUsers = localData ? JSON.parse(localData) : [];
        setUsers([...response.data, ...localUsers]);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleClearSearch = () => setSearchTerm("");

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20 h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 py-4 text-red-600 font-semibold">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
        User Directory
      </h1>

      <div className="relative max-w-md mx-auto mb-6">
        <input
          type="text"
          placeholder="Search users by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-3 pl-10 pr-10 rounded-lg border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-lg">
          🔍
        </span>
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        )}
      </div>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-6">
        Showing {filteredUsers.length} of {users.length} users
      </p>

      {filteredUsers.length === 0 ? (
        <div className="text-center py-16 text-gray-600 dark:text-gray-400">
          No users found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
          <table className="min-w-full text-sm text-left bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100">
            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="px-6 py-4 border-b border-gray-300 dark:border-gray-600">
                  Name
                </th>
                <th className="px-6 py-4 border-b border-gray-300 dark:border-gray-600">
                  Email
                </th>
                <th className="px-6 py-4 border-b border-gray-300 dark:border-gray-600">
                  City
                </th>
                <th className="px-6 py-4 border-b border-gray-300 dark:border-gray-600">
                  Zipcode
                </th>
                <th className="px-6 py-4 border-b border-gray-300 dark:border-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4 text-blue-600 dark:text-blue-400">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">{user.address?.city || "N/A"}</td>
                  <td className="px-6 py-4">
                    {user.address?.zipcode || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <Link to={`/users/${user.id}`}>
                      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-md text-sm">
                        View Profile
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
