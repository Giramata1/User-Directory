import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { User } from "../types";

const LOCAL_STORAGE_KEY = "addedUsers";

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const localUsersStr = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (localUsersStr) {
          const localUsers = JSON.parse(localUsersStr) as User[];
          const localUser = localUsers.find((u) => u.id === id);
          if (localUser) {
            setUser(localUser);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn("Failed to parse local users", e);
      }

      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(response.data);
      } catch {
        setError("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;
  if (!user) return <div className="text-center mt-10">User not found</div>;

  return (
    <div className="max-w-4xl mx-auto mt-16 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md font-sans">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">User Profile</h1>
      <table className="min-w-full w-full border-collapse text-sm">
        <tbody>
          {[
            ["Name", user.name],
            ["Email", user.email],
            ["Phone", user.phone || "N/A"],
            ["Website", user.website || "N/A"],
            ["Company", user.company?.name || "N/A"],
            [
              "Address",
              user.address
                ? `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`
                : "N/A",
            ],
          ].map(([label, value], idx) => (
            <tr
              key={label}
              className={idx % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-700"}
            >
              <th className="text-left px-6 py-4 font-medium text-gray-800 dark:text-gray-200 w-1/3">
                {label}
              </th>
              <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserProfile;
