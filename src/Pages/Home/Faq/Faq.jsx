// import { FaMinus, FaPlus } from "react-icons/fa";
const Faq = () => {
  return (
    <div>
      <h2 className="uppercase text-center py-20 text-4xl font-bold ">faq?</h2>
      <div className="max-w-7xl mb-10 mx-auto p-5 lg:p-0">
        <div className="collapse bg-project-400 p-2 rounded-none collapse-arrow ">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            How does voting work on this platform?
          </div>
          <div className="collapse-content">
            <p>
              To vote in a survey, you need to find your survey and then you can
              vote on that.
            </p>
          </div>
        </div>
        <div className="collapse bg-project-400 p-2 rounded-none collapse-arrow ">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            Are the surveys anonymous?
          </div>
          <div className="collapse-content">
            <p>
              No, we have dedicated surveyor to create the survey, then admin
              choose what survey to publish what to unpublish
            </p>
          </div>
        </div>
        <div className="collapse bg-project-400 p-2 rounded-none collapse-arrow">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            Can I create my own surveys?
          </div>
          <div className="collapse-content">
            <p>
              User can not create survey. As I say before, we have dedicated
              surveyor. Their work is to create survey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
