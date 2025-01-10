export const Input = ({
  id,
  handleOnchangeInput,
}: {
  id?: string;
  handleOnchangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      className="bg-[#27282D] p-2 rounded-md w-1/2"
      type="number"
      min={0}
      max={23}
      id={id}
      onChange={(e) => handleOnchangeInput(e)}
      defaultValue={"00"}
    />
  );
};
