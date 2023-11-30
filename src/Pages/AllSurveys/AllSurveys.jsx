import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import { GiVote } from "react-icons/gi";
import { Link } from "react-router-dom";

const AllSurveys = () => {
  const axiosPublic = useAxiosPublic();
  const [sortTitle, setSortTitle] = useState("");
  const [sortCategory, setSortCategory] = useState("");
  const [sortVote, setSortVoted] = useState("asc");

  const { data: allsurveys = [], refetch } = useQuery({
    queryKey: ["allsurveys"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/surveys/search?title=${sortTitle}&category=${sortCategory}&sort=${sortVote}`
      );
      return res.data;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleCategory = (e) => {
    setSortCategory(e.target.value);
  };

  const handleVote = (e) => {
    setSortVoted(e.target.value);
  };

  const handleTitle = (e) => {
    setSortTitle(e.target.value);
  };
  return (
    <div className="min-h-screen">
      <h2 className="text-center font-bold text-7xl mt-20 mb-10">
        All Surveys
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mb-10 gap-4 md:flex-row justify-center items-center"
      >
        {/* filter by searching title */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">Search By Title </span>
          </label>
          <input
            onChange={handleTitle}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        {/* filter by category */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">Filter By Category</span>
          </label>
          <div className="flex gap-3">
            <select
              onChange={handleCategory}
              className="select flex-1 select-bordered"
              defaultValue={sortCategory}
            >
              <option value="">All</option>
              <option value="Sports">Sports</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Healthcare">Healthcare</option>
            </select>
          </div>
        </div>
        {/* filter by vote */}
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">Filter By Vote</span>
          </label>
          <div className="flex gap-3">
            <select
              onChange={handleVote}
              className="select flex-1 select-bordered"
              defaultValue={sortVote}
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
            <button className="bg-project-400 px-4 rounded-md" type="submit">
              Filter
            </button>
          </div>
        </div>
      </form>
      {/* survey cards */}
      <div className="grid mb-20 grid-cols-1 md:grid-cols-2 justify-items-center max-w-7xl mx-auto gap-6 lg:grid-cols-3">
        {allsurveys.map((item) => (
          <div
            key={item._id}
            className="card w-96 bg-project-700 bg-opacity-30 text-white shadow-xl"
          >
            <div className="card-body">
              <h2 className="card-title text-2xl text-project-600 font-bold">
                {item.title.slice(0, 21)}
                {item.title.length > 21 && "..."}
              </h2>
              <div>
                <p className="font-semibold px-3 rounded-full  bg-project-600 inline-block">
                  {item.category}
                </p>
              </div>
              <p className="text-black">{item.description.slice(0, 35)}...</p>
              <p className="flex items-center font-semibold text-project-600 gap-2">
                <GiVote className="text-3xl" />
                Voted:{" "}
                <span className="bg-project-900 py-1 px-2 rounded-full text-white">
                  {item.vote}
                </span>
              </p>
              <div className="card-actions">
                <Link
                  to={`/surveyDetails/${item._id}`}
                  className="py-3 rounded-lg text-center text-black font-medium w-full bg-project-400"
                >
                  Take survey
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllSurveys;
