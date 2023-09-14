import { COLOR_WELFARE } from "../constants/styles.constants";

const Indicator = ({ progress, imageUrl, name, onClick, isSelected }) => {
  const getColor = () => {
    let currentColor = "#FF0000";

    for (const key in COLOR_WELFARE) {
      if (progress <= parseInt(key)) {
        currentColor = COLOR_WELFARE[key];
        break;
      }
    }
    return currentColor;
  };

  const handleButtonClick = () => {
    onClick(name);
  };

  return (
    <div
      className={`h-screen-[50%] flex m-[1vh] p-[1vh] items-center rounded-lg ${
        isSelected ? "bg-green-400" : ""
      }`}
    >
      <div className="">
        <button
          className="rounded-lg overflow-hidden hover:bg-blue-500"
          onClick={handleButtonClick}
        >
          <img
            className={`h-[3vw] ${isSelected ? "bg-white" : ""}`}
            src={imageUrl}
            alt={name}
          />
        </button>
      </div>

      <div className="grid items-center w-full ml-2 bg-white rounded-full h-1/2 font-bold">
        <div
          className="rounded-full text-[1vw]"
          style={{
            width: `${progress}%`,
            backgroundColor: getColor(),
          }}
        >
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default Indicator;
