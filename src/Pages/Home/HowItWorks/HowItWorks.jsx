import Gridsection from "./gridsection";
import { MdHowToVote, MdOutlineTravelExplore } from "react-icons/md";
import { CgTrack } from "react-icons/cg";

const HowItWorks = () => {
  return (
    <div className="bg-project-500">
      <h2 className="uppercase text-center py-20 text-7xl font-bold ">
        how it works
      </h2>
      <div className="pb-20 max-w-7xl mx-auto flex flex-col justify-center gap-6 items-center lg:flex-row lg:justify-around">
        <Gridsection
          icon={<MdOutlineTravelExplore />}
          title={"Explore Polls & Surveys"}
          subtitle={
            "Browse a diverse range of polls and surveys covering various topics and interests."
          }
        ></Gridsection>
        <Gridsection
          icon={<MdHowToVote />}
          title={"Vote & Participate"}
          subtitle={
            "Engage by casting your vote or sharing your opinions on the presented surveys."
          }
        ></Gridsection>
        <Gridsection
          icon={<CgTrack />}
          title={"Track Results"}
          subtitle={
            "Witness real-time results and insights as others contribute their thoughts."
          }
        ></Gridsection>
      </div>
    </div>
  );
};

export default HowItWorks;
