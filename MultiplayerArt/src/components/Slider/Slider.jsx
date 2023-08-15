const Slider = ({ value, onChange, title, min, max }) => {
  return (
    <div className="relative flex justify-between slider-container">
      <div className="absolute inset-0 flex items-center justify-center slider-title">
        {title}
      </div>
      <input
        type="range"
        min={min ? min : 0}
        max={max ? max : 100}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="slider-thumb w-full"
      />
    </div>
  );
};

export default Slider;
