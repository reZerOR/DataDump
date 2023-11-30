import Banner from "./Banner/Banner";
import Faq from "./Faq/Faq";
import HowItWorks from "./HowItWorks/HowItWorks";
import MostVoted from "./Most-voted/MostVoted";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <MostVoted></MostVoted>
      <HowItWorks></HowItWorks>
      <Faq></Faq>
    </div>
  );
};

export default Home;
