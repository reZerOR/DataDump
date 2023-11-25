import { TypeAnimation } from "react-type-animation";
import hero from "../../../assets/bannersection.svg";

const Banner = () => {
  return (
    <div
      className="bg-cover flex flex-col items-center justify-center min-h-screen bg-fixed px-5 md:p-20"
      style={{
        backgroundImage: `url(${hero})`,
      }}
    >
      <h2 className="md:text-7xl text-3xl  uppercase text-center leading-tight bg-gradient-to-r from-violet-800 to-rose-600 bg-clip-text text-transparent font-bold  ">
        Your Voice Matters:{" "}
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed once, initially
            "Share",
            2000,
            "Engage",
            2000,
            "Shape",
            2000,
          ]}
          speed={20}
          repeat={Infinity}
        />
        <br />
        the Future through Surveys!
      </h2>
      <button className="bg-project-600 py-3 px-10 hover:bg-project-900 rounded-xl text-project-200 font-bold mt-10">
        Explore Surveys
      </button>
    </div>
  );
};

export default Banner;
