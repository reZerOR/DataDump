import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("");
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      console.log(filter);
      const res = await axiosSecure.get(`/users?filter=${filter}`);
      return res.data;
    },
  });
  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  const makeAdmin = (user) => {
    axiosSecure.put(`/users/admin/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  const makeSurveyor = (user) => {
    axiosSecure.put(`/users/surveyor/${user._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an surveyor Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div>
      <h2 className="text-center text-4xl font-bold my-10">Mange Users</h2>
      {/* for filtering by user role */}
      <form onSubmit={handleSubmit} className="flex justify-center items-end">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-tex font-semibold">Filter By</span>
          </label>
          <div className="flex gap-3">
            <select
              onChange={handleChange}
              className="select flex-1 select-bordered"
              defaultValue={filter}
            >
              <option value="">All</option>
              <option value="user">User</option>
              <option value="pro-user">Pro User</option>
              <option value="surveyor">Surveyor</option>
            </select>
            <button className="bg-project-400 px-4 rounded-md" type="submit">
              Filter
            </button>
          </div>
        </div>
      </form>
      {/* users table */}
      <div className="overflow-x-auto mt-10 max-w-7xl mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-project-400">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <p>{item.name}</p>
                </td>
                <td>
                  <p>{item.email}</p>
                </td>
                <td>{item?.role}</td>
                <th className="space-x-1">
                  {item?.role === "user" || item?.role === "pro-user" ? (
                    <>
                      <button
                        onClick={() => makeAdmin(item)}
                        className="btn bg-project-400 btn-xs"
                      >
                        Admin
                      </button>
                      <button
                        onClick={() => makeSurveyor(item)}
                        className="btn  bg-project-300 btn-xs"
                      >
                        Surveyor
                      </button>
                    </>
                  ) : (
                    item?.role === "surveyor" && (
                      <button
                        onClick={() => makeAdmin(item)}
                        className="btn bg-project-400 btn-xs"
                      >
                        Admin
                      </button>
                    )
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
