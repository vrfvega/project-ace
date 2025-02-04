interface PlayerCounterProps {
  current: number;
  total: number;
}

const PlayerCounter = ({ current, total }: PlayerCounterProps) => {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm">
      <span className="text-sm text-gray-600 font-medium">
        {current}/{total}
      </span>
    </div>
  );
};

export default PlayerCounter;
