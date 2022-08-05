import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Card({ category }) {
  const router = useRouter();

  return (
    <div className="flex items-center  border-b-2 whitespace-wrap relative rounded-lg ">
      <div
        className={`
        cursor-pointer w-full h-auto transition-all delay-75 duration-100 hover:bg-neutral-700 `}
        onClick={() => router.push(`/category/${category.id}`)}
      >
        <img className="" src={category?.icons[0].url} alt="" />
        <div className="text-white relative px-2   font-bold p-4">
          {category.name}
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  category: PropTypes.object.isRequired,
};
