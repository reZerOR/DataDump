const Gridsection = ({ title, subtitle, icon }) => {
  return (
    <div className="max-w-sm rounded-lg p-6 bg-project-400 shadow-lg">
      <div className="flex justify-center text-4xl">{icon}</div>
      <h2 className="text-center font-semibold my-2 text-2xl">{title}</h2>
      <p className="text-justify text-sm ">{subtitle}</p>
    </div>
  );
};

export default Gridsection;
