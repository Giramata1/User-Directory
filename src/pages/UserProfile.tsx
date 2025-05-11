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
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone || "N/A"}</p>
      <p>Website: {user.website || "N/A"}</p>
      <p>Company: {user.company?.name || "N/A"}</p>
      <p>Address: {user.address ? `${user.address.street}, ${user.address.city}` : "N/A"}</p>
      <p>street: {user.address?.street}</p>
      <p>Suite: {user.address?.suite}</p>
      <p>City: {user.address?.city}</p>
      
      <p>Zipcode: {user.address?.zipcode}</p>
    </div>
  );
};

export default UserProfile;