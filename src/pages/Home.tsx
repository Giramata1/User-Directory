import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { User } from "../types";

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0 }}>User Directory</h1>
        <input
          type="text"
          placeholder="Search users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            width: "100%",
            maxWidth: "300px",
            boxSizing: "border-box",
          }}
        />
      </div>

      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
              minWidth: "600px",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Name
                </th>
                <th
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  City
                </th>
                <th
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Zipcode
                </th>
                <th
                  style={{
                    padding: "8px",
                    border: "1px solid #ccc",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: "1px solid #ccc" }}>
                  <td style={{ padding: "8px" }}>{user.name}</td>
                  <td style={{ padding: "8px" }}>{user.email}</td>
                  <td style={{ padding: "8px" }}>{user.address?.city}</td>
                  <td style={{ padding: "8px" }}>{user.address?.zipcode}</td>
                  <td style={{ padding: "8px" }}>
                    <Link to={`/users/${user.id}`}>
                      <button
                        style={{
                          padding: "4px 8px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
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
