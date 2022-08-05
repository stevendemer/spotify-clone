import PropTypes from "prop-types";
import { useRouter } from "next/router";

export default function Card({ category, isPlaylist }) {
  const router = useRouter();

  return (
    <div className="flex items-center  whitespace-wrap relative transition-colors delay-75 duration-100 bg-opacity-10 rounded-lg hover:bg-neutral-800 p-2 ">
      <div
        className={`
        cursor-pointer w-full h-auto`}
        onClick={() => router.push(`/category/${category.id}`)}
      >
        <img
          className=""
          src={`${
            isPlaylist ? category?.images[0].url : category?.icons[0].url
          }`}
          alt=""
        />
        <div className="text-white relative px-2   font-bold p-4">
          {category.name}
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  category: PropTypes.object.isRequired,
  isPlaylist: PropTypes.bool,
  title: PropTypes.string,
  isLiked: PropTypes.bool,
};
