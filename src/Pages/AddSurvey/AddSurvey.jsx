import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext } from "react";
import moment from "moment";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddSurvey = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const onSubmit = async (data) => {
    const surveyInfo = {
      title: data.title,
      category: data.category,
      question: data.question,
      description: data.description,
      vote: 0,
      status: "pending",
      like: 0,
      dislike: 0,
      surveyor_email: user?.email,
      createdDate: moment().format("YYYY-MM-DD"),
      expiryDate: data.date,
      noVoted: 0,
      yesVoted: 0,
    };
    axiosSecure.post("/surveys", surveyInfo).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Survey Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    });

    console.log(surveyInfo);
  };
  return (
    <div>
      <p className="text-center text-4xl font-bold mt-10">Add Survey</p>
      {/* form */}
      <form className="max-w-7xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
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
              defaultValue="default"
              {...register("category", { required: true })}
              className="select select-bordered w-full"
            >
              <option disabled value="default">
                Select a category
              </option>
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
              placeholder="date"
              {...register("date", { required: true })}
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
            {...register("question")}
            className="input input-bordered"
            placeholder="question"
          ></input>
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            {...register("description")}
            className="textarea textarea-bordered h-24"
            placeholder="Bio"
          ></textarea>
        </div>

        <button className="btn bg-project-400">
          Add survey
          {/* Add Item <FaUtensils className="ml-4"></FaUtensils> */}
        </button>
      </form>
    </div>
  );
};

export default AddSurvey;
