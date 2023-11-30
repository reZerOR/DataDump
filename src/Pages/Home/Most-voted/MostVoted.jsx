import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { GiVote } from "react-icons/gi";
import { Link } from "react-router-dom";

const MostVoted = () => {
  const axiosPublic = useAxiosPublic();
  const { data: surveys = [] } = useQuery({
    queryKey: ["survey"],
    queryFn: async () => {
      const res = await axiosPublic.get("/surveys/most-voted");
      return res.data;
    },
  });
  return (
    <div>
      <h2 className="text-center font-bold text-7xl my-20">
        Most Voted Surveys
      </h2>

      <div className="grid mb-20 grid-cols-1 md:grid-cols-2 justify-items-center max-w-7xl mx-auto gap-6 lg:grid-cols-3">
        {surveys.map((item) => (
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

export default MostVoted;
