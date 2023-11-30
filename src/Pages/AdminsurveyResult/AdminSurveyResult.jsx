import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
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
const AdminSurveyResult = () => {
  const axiosSecure = useAxiosSecure();
  const [survey, setSurvey] = useState([]);
  useEffect(() => {
    axiosSecure.get(`/surveys?status=published`).then((res) => {
      setSurvey(res.data);
    });
  }, [axiosSecure]);
  console.log(survey);
  return (
    <div>
      <h2 className="text-4xl font-bold text-center my-10">
        My Survey Responses
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

              <th>NO Vote</th>
              <th>Yes Vote</th>
              <th>Total Vote</th>
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

                <td>{item.noVoted}</td>
                <td>{item.yesVoted}</td>
                <td>{item.vote}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <BarChart
        className="py-5 mx-auto"
        width={400}
        height={300}
        data={survey}
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
    </div>
  );
};

export default AdminSurveyResult;
