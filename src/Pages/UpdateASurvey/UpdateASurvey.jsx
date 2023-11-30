import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const UpdateASurvey = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState({});
  const axiosSecure = useAxiosSecure();
  const naviget = useNavigate();
  useEffect(() => {
    axiosSecure.get(`/surveys/update/${id}`).then((res) => {
      setSurvey(res.data);
    });
  }, [id, axiosSecure]);
  console.log(survey);

  const handleSubmit = (e) => {
    e.preventDefault();
    const surveyInfo = {
      title: e.target.title.value,
      category: e.target.category.value,
      question: e.target.question.value,
      description: e.target.description.value,
      expiryDate: e.target.date.value,
    };
    axiosSecure.put(`/surveys/update/${survey._id}`, surveyInfo).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Updated Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        naviget("/dashboard/UpdateSurvey");
      }
    });
    console.log(surveyInfo);
  };
  return (
    <div>
      <p className="text-5xl text-center font-bold my-20">Update Survey</p>
      <form className="max-w-7xl mx-auto" onSubmit={handleSubmit}>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            placeholder="Title"
            defaultValue={survey?.title}
            name="title"
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-6 my-6">
          {/* category */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              defaultValue={survey?.category}
              name="category"
              className="select select-bordered w-full"
            >
              <option value="Sports">Sports</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Healthcare">Healthcare</option>
            </select>
          </div>

          {/* price */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Expiry Date</span>
            </label>
            <input
              type="date"
              defaultValue={survey?.expiryDate}
              placeholder="date"
              name="date"
              className="input input-bordered w-full"
            />
          </div>
        </div>
        {/* recipe details */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Question</span>
          </label>
          <input
            type="text"
            defaultValue={survey?.question}
            name="question"
            className="input input-bordered"
            placeholder="question"
          ></input>
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            className="textarea textarea-bordered h-24"
            placeholder="Bio"
            defaultValue={survey?.description}
          ></textarea>
        </div>

        <button className="btn bg-project-400">Update</button>
      </form>
    </div>
  );
};

export default UpdateASurvey;
