import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        Swal.fire({
          title: "User Login Successful.",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
        navigate(location.state?.from?.pathname || "/");
      })
      .catch((error) => {
        console.log(error);
        setError("Invalid user cradentials");
      });
  };
  return (
    // <!-- component -->
    <div className="flex h-screen">
      {/* <!-- Left Pane --> */}
      <div className="hidden lg:flex items-center justify-center flex-1">
        <div className="max-w-2xl text-center">
          <img
            className="w-full"
            src="https://opendoodles.s3-us-west-1.amazonaws.com/selfie.svg"
            alt=""
          />
        </div>
      </div>
      {/* <!-- Right Pane --> */}
      <div className="w-full bg-project-200 lg:w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-3xl font-semibold mb-6 text-black text-center">
            Login
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            Join to Our Community with all time access and free{" "}
          </h1>
          <SocialLogin></SocialLogin>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>or with email</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && <p className="text-red-600 my-2">{error}</p>}
            {/* <!-- Your form elements go here --> */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                {...register("email")}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                {...register("password", { required: true })}
                className="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-project-400 text-white p-2 rounded-md hover:bg-project-500 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-gray-600 text-center">
            <p>
              Don{"'"}t have an account?{" "}
              <Link className="text-black hover:underline" to={"/Register"}>
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
