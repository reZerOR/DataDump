import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const UpdateSurvey = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const { data: survey = [] } = useQuery({
    queryKey: ["surveySurveyor", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/surveys?email=${user?.email}`);
      return res.data;
    },
  });
  console.log(survey);
  return (
    <div>
      <h2 className="text-4xl font-bold text-center my-10">
        FeedBack and Update
      </h2>
      <div className="overflow-x-auto mt-10 max-w-7xl mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-project-400">
              <th>#</th>
              <th>Title</th>
              <th>Email</th>
              <th>status</th>
              <th>Update</th>
              <th>Feedback</th>
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
                <td>
                  <Link
                    to={`/dashboard/UpdateASurvey/${item._id}`}
                    // onClick={() => makeAdmin(item)}
                    className="btn bg-project-300 btn-xs"
                  >
                    Update
                  </Link>
                </td>
                <th className="space-x-1">
                  {item.status === "published" && (
                    <>
                      <button
                        onClick={() =>
                          document
                            .getElementById(`my_modal_${index + 1}`)
                            .showModal()
                        }
                        className="btn bg-project-400 btn-xs"
                      >
                        User Feedbacks
                      </button>
                      <dialog id={`my_modal_${index + 1}`} className="modal">
                        <div className="modal-box bg-project-400">
                          <div>
                            <h2>FeedBacks</h2>
                            <div className="w-full bg-project-300 mt-6 rounded-lg h-52">
                              {item?.reports?.map((bubble, index) => (
                                <div className="p-6" key={index + 1}>
                                  <p>{index + 1}</p>
                                  <p className="text-sm py-2 px-3 rounded-full mb-4 bg-project-600 inline-block text-white font-medium ">
                                    {bubble}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="modal-action">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </>
                  )}
                  {item.status === "unpublished" && (
                    <button
                      // onClick={() => makeAdmin(item)}
                      className="btn bg-project-400 btn-xs"
                    >
                      Admin Feedbacks
                    </button>
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

export default UpdateSurvey;
