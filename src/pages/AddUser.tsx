import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema, UserFormData } from "../types";

const LOCAL_STORAGE_KEY = "addedUsers";

const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
  });

  const [users, setUsers] = useState<UserFormData[]>([]);

  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers);

        if (Array.isArray(parsedUsers)) {
          setUsers(parsedUsers);
        } else {
          console.error("Stored users are not in an array format");
        }
      }
    } catch (e) {
      console.error("Failed to parse users from localStorage", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  const onSubmit = (data: UserFormData) => {
    setUsers((prev) => [...prev, data]);
    reset();
  };

  const handleRemove = (index: number) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add New User</h1>

      <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "30px" }}>
        <div>
          <label>Name</label>
          <br />
          <input {...register("name")} />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        <div>
          <label>Email</label>
          <br />
          <input {...register("email")} />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>

        <div>
          <label>Age</label>
          <br />
          <input type="number" {...register("age", { valueAsNumber: true })} />
          {errors.age && <p style={{ color: "red" }}>{errors.age.message}</p>}
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Add User
        </button>
      </form>

      {users.length > 0 && (
        <div>
          <h2>User List</h2>
          <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
            {users.map((user, idx) => (
              <div
                key={idx}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "16px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              >
                <h3 style={{ margin: "0 0 8px" }}>{user.name}</h3>
                <p style={{ margin: "4px 0" }}>
                  <strong>Email:</strong> {user.email}
                </p>
                <p style={{ margin: "4px 0" }}>
                  <strong>Age:</strong> {user.age}
                </p>
                
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUser;
