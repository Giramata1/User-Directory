import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { User } from "../types";

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile-container">
      <h1>User Profile</h1>
      <table className="user-table">
        <tbody>
          <tr><th>Name</th><td>{user.name}</td></tr>
          <tr><th>Email</th><td>{user.email}</td></tr>
          <tr><th>Phone</th><td>{user.phone || "N/A"}</td></tr>
          <tr><th>Website</th><td>{user.website || "N/A"}</td></tr>
          <tr><th>Company</th><td>{user.company?.name || "N/A"}</td></tr>
          <tr>
            <th>Address</th>
            <td>
              {user.address
                ? `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`
                : "N/A"}
            </td>
          </tr>
        </tbody>
      </table>

  
      <style>
        {`
          .user-profile-container {
            max-width: 1000px;
            margin: 60px auto;
            padding: 20px;
            font-family: Arial, sans-serif;
            
          }

          .user-table {
            width: 100%;
            border-collapse: collapse;
            
          }

          .user-table th, .user-table td {
            padding: 12px;
            text-align: left;
            border: 1px solid var(--border-color);
          }

          .user-table th {
            background-color: gray;
            font-weight: bold;
            width: 30%;
          }

          
          :root {
            --background: #ffffff;
            --text-color: #000000;
            --header-bg: #f2f2f2;
            --border-color: #cccccc;
          }

          
          @media (prefers-color-scheme: dark) {
            :root {
              --background: #1e1e1e;
              --text-color: #f5f5f5;
              --header-bg: #2e2e2e;
              --border-color: #444444;
            }
            body {
              background-color: var(--background);
              color: var(--text-color);
            }
          }
        `}
      </style>
    </div>
  );
};

export default UserProfile;
