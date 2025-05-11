import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema, UserFormData, Role } from "../types";

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

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "40px",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          maxWidth: "400px",
          width: "100%",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Add New User</h2>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Name</label>
          <input
            {...register("name")}
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc" }}
          />
          {errors.name && (
            <p style={{ fontSize: "12px", color: "red" }}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Email</label>
          <input
            {...register("email")}
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc" }}
          />
          {errors.email && (
            <p style={{ fontSize: "12px", color: "red" }}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Age</label>
          <input
            type="number"
            {...register("age", { valueAsNumber: true })}
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc" }}
          />
          {errors.age && (
            <p style={{ fontSize: "12px", color: "red" }}>
              {errors.age.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Role</label>
          <select
            {...register("role")}
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", color: "darkblue" }}
          >
            <option value="">Select a role</option>
            <option value={Role.ADMIN}>{Role.ADMIN}</option>
            <option value={Role.EDITOR}>{Role.EDITOR}</option>
            <option value={Role.VIEWER}>{Role.VIEWER}</option>
          </select>
          {errors.role && (
            <p style={{ fontSize: "12px", color: "red" }}>
              {errors.role.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            backgroundColor: "#eee",
            cursor: "pointer",
            color: "darkblue"
          }}
        >
          Add User
        </button>
      </form>

      <div style={{ maxWidth: "600px", width: "100%" }}>
        <h2 style={{ marginBottom: "10px" }}>User List</h2>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid gray",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid gray", padding: "8px" }}>#</th>
              <th style={{ border: "1px solid gray", padding: "8px" }}>Name</th>
              <th style={{ border: "1px solid gray", padding: "8px" }}>Email</th>
              <th style={{ border: "1px solid gray", padding: "8px" }}>Age</th>
              <th style={{ border: "1px solid gray", padding: "8px" }}>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  style={{ textAlign: "center", padding: "12px" }}
                >
                  No users yet.
                </td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr key={idx}>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {idx + 1}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {user.name}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {user.email}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {user.age}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "8px" }}>
                    {user.role}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddUser;
