import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema, UserFormData, Role } from "../types";

type UserWithId = UserFormData & { id: string };
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

  const [users, setUsers] = useState<UserWithId[]>([]);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedUsers) {
        const parsedUsers = JSON.parse(storedUsers) as UserWithId[];
        const validatedUsers = Array.isArray(parsedUsers)
          ? parsedUsers.filter(
              (user) =>
                user &&
                typeof user.id === "string" &&
                typeof user.name === "string" &&
                typeof user.email === "string" &&
                typeof user.age === "number" &&
                typeof user.role === "string"
            )
          : [];

        if (parsedUsers.length !== validatedUsers.length) {
          setStorageError("Some invalid user data was ignored.");
        }

        setUsers(validatedUsers);
      }
    } catch (e) {
      setStorageError("Failed to load users. Data may be corrupted.");
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
      setStorageError(null);
    } catch (e) {
      setStorageError("Failed to save users. Storage may be full.");
    }
  }, [users]);

  const onSubmit = (data: UserFormData) => {
    const newUser: UserWithId = { ...data, id: crypto.randomUUID() };
    setUsers((prev) => [...prev, newUser]);
    reset();
  };

  const handleRemove = (id: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <div className="flex flex-wrap justify-center gap-10 p-6 font-sans">
    
      {storageError && (
        <div className="w-full max-w-md p-4 bg-red-100 text-red-700 rounded-md mb-6">
          {storageError}
        </div>
      )}

     
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full p-6 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow"
      >
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
          Add New User
        </h2>

        <div className="mb-5">
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Name
          </label>
          <input
            {...register("name")}
            className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            } dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-5">
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            {...register("email")}
            className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            } dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-5">
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Age
          </label>
          <input
            type="number"
            {...register("age", { valueAsNumber: true })}
            className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 ${
              errors.age
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            } dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100`}
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-500">{errors.age.message}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
            Role
          </label>
          <select
            {...register("role")}
            className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-2 ${
              errors.role
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-blue-400"
            } dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100`}
            defaultValue=""
          >
            <option value="" disabled>
              Select a role
            </option>
            <option value={Role.ADMIN}>{Role.ADMIN}</option>
            <option value={Role.EDITOR}>{Role.EDITOR}</option>
            <option value={Role.VIEWER}>{Role.VIEWER}</option>
          </select>
          {errors.role && (
            <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
        >
          Add User
        </button>
      </form>

    
      <div className="max-w-3xl w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          User List
        </h2>
        <table className="min-w-full border-collapse text-sm rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Age</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr className="bg-gray-50 dark:bg-gray-800">
                <td
                  colSpan={6}
                  className="p-4 text-center text-gray-600 dark:text-gray-300"
                >
                  No users yet.
                </td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr
                  key={user.id}
                  className={idx % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-700"}
                >
                  <td className="p-3 border border-gray-300 dark:border-gray-600">{idx + 1}</td>
                  <td className="p-3 border border-gray-300 dark:border-gray-600">{user.name}</td>
                  <td className="p-3 border border-gray-300 dark:border-gray-600">{user.email}</td>
                  <td className="p-3 border border-gray-300 dark:border-gray-600">{user.age}</td>
                  <td className="p-3 border border-gray-300 dark:border-gray-600">{user.role}</td>
                  <td className="p-3 border border-gray-300 dark:border-gray-600">
                    <button
                      onClick={() => handleRemove(user.id)}
                      className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors duration-150"
                    >
                      Remove
                    </button>
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
