import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllPayments = () => {
  const axiosSecure = useAxiosSecure();
  const { data: payment = [] } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments");
      return res.data;
    },
  });
  console.log(payment);

  return (
    <div>
      <h2 className="text-center text-4xl font-bold my-10">All Payments</h2>
      <div className="overflow-x-auto px-3 lg:p-0 mt-10 max-w-7xl mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-project-400">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Transection Id</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payment.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <p>{item.name}</p>
                </td>
                <td>
                  <p>{item.email}</p>
                </td>
                <td>
                  <p>{item.transectionId}</p>
                </td>
                <td>
                  <p>${item.price}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPayments;
