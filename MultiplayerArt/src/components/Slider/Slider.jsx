const Slider = ({ value, onChange }) => {
  return (
    <div className="flex justify-between">
      <div>Title</div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className="slider"
      />
    </div>
  );
};

export default Slider;
