const WatchNav = () => {
  return (
    <div className="flex items-center justify-evenly gap-x-3 w-full">
      <div className="text-[40px] font-bold">Watch</div>
      <div className="border border-[#000] px-3 py-1 rounded-md">Photos</div>
      <div>
        <input type="date" className="border border-[#000] px-3 py-1 rounded-md" />
      </div>
      <div>
        <input type="date" className="border border-[#000] px-3 py-1 rounded-md" />
      </div>
      <div>
        <input
          type="text"
          className="border border-[#000] px-3 py-1 rounded-md"
          placeholder="Search..."
        />
      </div>
      <div>
        <button className="bg-[#838996] px-3 py-1 rounded-md text-[22px] text-[#fff]">
          Create
        </button>
      </div>
    </div>
  );
};

export default WatchNav;
