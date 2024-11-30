function InputField({ id, type = "text", placeholder, value, onChange }) {
  return (
    <div className="input-container">
      <label htmlFor={id}></label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`bg-green4 px-[15px] py-[20px] w-full text-black placeholder-black font-bold rounded-lg outline-none`}
      />
    </div>
  );
}

export default InputField;
