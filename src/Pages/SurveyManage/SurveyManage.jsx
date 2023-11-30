import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const SurveyManage = () => {
  const axiosSecure = useAxiosSecure();
  const { data: survey = [], refetch } = useQuery({
    queryKey: ["surveymanage"],
    queryFn: async () => {
      const res = await axiosSecure.get("/survey/manage");
      return res.data;
    },
  });
  const handleSubmit = (id) => {
    axiosSecure.put(`/survey/manage/${id}?status=unpulished`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };
  const handlepublish = (id) => {
    axiosSecure.put(`/survey/manage/${id}?status=publish`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };
  return (
    <div>
      <h2 className="text-5xl text-center font-bold my-20">Survey Manage</h2>
      <div className="overflow-x-auto mt-10 max-w-7xl mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-project-400">
              <th>#</th>
              <th>Title</th>
              <th>Email</th>
              <th>status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {survey.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <p>{item.title}</p>
                </td>
                <td>
                  <p>{item.surveyor_email}</p>
                </td>
                <td>{item.status}</td>
                <td className="space-x-1">
                  {item.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleSubmit(item._id)}
                        className="btn bg-project-400 btn-xs"
                      >
                        Unpublish
                      </button>
                      <button
                        onClick={() => handlepublish(item._id)}
                        className="btn bg-project-400 btn-xs"
                      >
                        Publish
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurveyManage;
