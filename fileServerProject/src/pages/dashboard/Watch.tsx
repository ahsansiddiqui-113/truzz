import WatchNav from "../../Components/WatchNav";

const Watch = ({ selectedMediaCategory }) => {
  return (
    <div className="flex flex-col">
      <WatchNav selectedMediaCategory={selectedMediaCategory} />
    </div>
  );
};

export default Watch;
