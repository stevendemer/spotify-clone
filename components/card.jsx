import PropTypes from "prop-types";

export default function Card({ title, bgImage }) {
  return (
    <div className="flex items-center justify-around border-b-2  rounded-lg  mx-4">
      <div
        className={`
        cursor-pointer relative w-full h-60  `}
      >
        <img className="" src={bgImage} alt="" />
        <div className="text-white relative px-2 whitespace-nowrap font-bold p-4">
          {title}
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  bgImage: PropTypes.string.isRequired,
};
