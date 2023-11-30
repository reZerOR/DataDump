import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import useUser from "../../hooks/useUser";
import useProUser from "../../hooks/useProUser";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import moment from "moment/moment";
import { useQuery } from "@tanstack/react-query";

const SurveyDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();

  const [Uplike, setUpLike] = useState(0);
  const [UPdislike, setUpDislike] = useState(0);
  const [isUserVoted, setIsUserVoted] = useState(false);
  const [isUser] = useUser();
  const [proUser] = useProUser();
  const [dateExpire, setDateExpire] = useState(false);

  // useEffect(() => {
  //   axiosPublic.get(`/surveys/${id}?email=${user?.email}`).then((res) => {
  //     setSurvey(res.data.result);
  //     console.log(res.data);
  //     const today = moment().format("YYYY-MM-DD");
  //     console.log(today, res.data.result.expiryDate);
  //     setDateExpire(moment(res.data.result.expiryDate).isBefore(today));
  //     setIsUserVoted(res.data.isUserVoted);
  //   });
  // }, [axiosPublic, id, user]);

  const { data: survey = {}, refetch } = useQuery({
    queryKey: ["survey", id, user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/surveys/${id}?email=${user?.email}`);
      const today = moment().format("YYYY-MM-DD");
      console.log(today, res.data.result.expiryDate);
      setDateExpire(moment(res.data.result.expiryDate).isBefore(today));
      setIsUserVoted(res.data.isUserVoted);
      return res.data.result;
    },
  });
  console.log(survey);

  const [yesNo, setYesNo] = useState("");
  const { category, description, question, title, comments, _id } = survey;

  console.log(dateExpire);

  const handleLike = () => {
    if (isUser || proUser) {
      setUpDislike(0);
      setUpLike(1);
    }
  };
  const handleDislike = () => {
    if (isUser || proUser) {
      setUpDislike(1);
      setUpLike(0);
    }
  };

  const handleOptionChange = (e) => {
    setYesNo(e.target.value);
  };

  // voted
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(yesNo);
    let yes = 0;
    let no = 0;
    if (yesNo === "yes") {
      yes = 1;
      no = 0;
    }
    if (yesNo === "no") {
      yes = 0;
      no = 1;
    }
    const votedInfo = {
      email: user?.email,
      votedIn: yesNo,
      like: Uplike,
      dislike: UPdislike,
      yesVoted: yes,
      noVoted: no,
    };
    console.log(votedInfo);

    axiosPublic.put(`/updateSurvey/${_id}`, votedInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Voted Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  // report
  const handlReport = (e) => {
    e.preventDefault();
    const report = e.target.report.value;
    console.log(report);
    axiosPublic
      .put(`/surveyReportUpdate/${_id}?report=${report}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Reported successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  // comment
  const handleComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    console.log(comment);
    axiosPublic
      .put(`/surveyCommentUpdate/${_id}?comment=${comment}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Comment added successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      });
  };

  return (
    <div>
      <h2 className="uppercase text-center py-20 text-7xl font-bold ">
        Survey Details
      </h2>
      <div className="max-w-7xl mx-auto mb-10">
        <div className="max-w-xl mx-auto bg-project-700 bg-opacity-30 rounded-lg">
          {/* card div */}
          {isUserVoted || dateExpire ? (
            <BarChart
              className="py-5 mx-auto"
              width={400}
              height={300}
              data={[survey]}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="yesVoted"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="noVoted"
                fill="#000000"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          ) : (
            <div className="card-body">
              <h2 className="card-title text-2xl text-project-600 font-bold">
                {title}
              </h2>
              <div>
                <p className="font-semibold px-3 rounded-full text-white  bg-project-600 inline-block">
                  {category}
                </p>
              </div>
              <p className="text-black">{description}</p>
              {/* OPTIONS WITH QUESTION */}
              <form onSubmit={handleSubmit} className="">
                <div className="form-control w-full max-w-lg">
                  <label className="label">
                    <span className="font-semibold text-lg">{question}</span>
                  </label>
                  <div className="flex gap-3">
                    <div className="flex gap-3 flex-1">
                      <label className="flex gap-1 items-center">
                        <input
                          type="radio"
                          name="radio-1"
                          checked={yesNo === "yes"}
                          onChange={handleOptionChange}
                          value="yes"
                        />
                        Yes
                      </label>
                      <label className="flex gap-1 items-center">
                        <input
                          type="radio"
                          name="radio-2"
                          checked={yesNo === "no"}
                          onChange={handleOptionChange}
                          value="no"
                        />
                        No
                      </label>
                    </div>
                    <button
                      type="submit"
                      disabled={!isUser && !proUser}
                      className="bg-project-500 px-3 py-1 disabled:bg-slate-500 text-white rounded-lg"
                    >
                      vote
                    </button>
                  </div>
                </div>
              </form>
              {/* LIKE DISLIKE */}

              <div className="flex py-3 ml-2 text-3xl flex-1 gap-4">
                <AiFillLike
                  onClick={handleLike}
                  className={`${
                    Uplike === 1 ? "text-project-500" : "text-black"
                  } cursor-pointer`}
                />
                <AiFillDislike
                  onClick={handleDislike}
                  className={`${
                    UPdislike === 1 ? "text-project-500" : "text-black"
                  } cursor-pointer`}
                ></AiFillDislike>
              </div>
              {/* REPORT FORM */}
              <form
                onSubmit={handlReport}
                className="flex w-full gap-3 flex-col"
              >
                <label> Report if you see anyting inappropriate</label>
                <textarea
                  name="report"
                  className="textarea placeholder:text-white textarea-bordered"
                  placeholder="Report"
                ></textarea>
                {/* if there is a button in form, it will close the modal */}
                <button
                  type="submit"
                  disabled={!isUser && !proUser}
                  className="bg-project-400 disabled:bg-slate-500 rounded-lg py-3"
                >
                  Report
                </button>
              </form>
            </div>
          )}
        </div>
        {/* coments div */}
        <div className="max-w-xl mx-auto my-10 bg-project-300 rounded-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl text-project-600 font-bold">
              Comments
            </h2>
            <div className="w-full h-80 bg-project-200 rounded-lg overflow-y-auto">
              <div className="p-4">
                {comments?.map((item, index) => (
                  <div className=" my-2" key={index}>
                    <p>{index + 1}</p>
                    <p className="bg-project-400 p-4 rounded-full inline-block">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* comment form */}
            <form
              className={`${proUser ? "" : "hidden"}`}
              onSubmit={handleComment}
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Comment"
                  name="comment"
                  className="input input-bordered placeholder:text-black w-full"
                />
                <button
                  type="submit"
                  className="bg-project-400 px-3 rounded-lg"
                >
                  Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyDetails;
