export const Input = () => {
  return (
    <input
      className="bg-[#27282D] p-2 rounded-md w-1/2"
      type="number"
      min={0}
      max={24}
      aria-valuemin={0}
      aria-valuemax={24}
    />
  );
};
