function Button({ text }) {
  return (
    <button
      className={`relative w-[120px] h-[42px] flex justify-center items-center bg-red-400 btn-sty`}
    >
      <div className="text-black font-semibold text-[20px]">{text}</div>
    </button>
  );
}

export default Button;
