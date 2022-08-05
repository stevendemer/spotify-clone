import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/solid";

const Category = () => {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    if (router.isReady) {
      console.log(router.query);
      setName(router.query.pid);
    }
  }, [router.isReady]);

  return (
    <>
      <div className="text-3xl flex container mx-auto text-white">
        The name is {name}
        <div className="flex container items-center mx-auto">
          <ArrowLeftIcon
            onClick={() => router.push("/browse")}
            className="w-6 h-6 text-white"
          />
        </div>
      </div>
    </>
  );
};

export default Category;
