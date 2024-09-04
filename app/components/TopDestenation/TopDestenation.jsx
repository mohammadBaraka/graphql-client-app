import Image from "next/image";
import { articlesData } from "./articlesData";
import Link from "next/link";

export default function TopDestenation() {
  return (
    <section className="px-16 mt-marginGlobal">
      <div className=" w-full xl:w-[50%] ">
        <h2 className="text-3xl lg:text-6xl font-bold font-mainFont text-grayColor">
          Top Destenation
        </h2>
        <p className="text-md w-[100%] xl:w-[75%] mt-4 pr-4 text-secondaryGray font-bold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
          laboriosam sed id, magni blanditiis
        </p>
      </div>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8 mt-marginSection">
        {articlesData.map((article) => {
          return (
            <article
              key={article?.id}
              className="overflow-hidden rounded-lg shadow transition hover:shadow-lg"
            >
              <Image
                src={article?.img}
                alt="article1"
                width={500}
                height={100}
              />

              <div className="bg-white p-4 sm:p-6">
                <time
                  dateTime={article?.data}
                  className="block text-xs text-gray-500"
                >
                  10th Oct 2022
                </time>
                <h3 className="mt-0.5 text-lg text-gray-900">
                  {article?.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 mb-8">
                  {article?.desc}
                </p>
                <Link
                  className="mt-8 rounded border border-indigo-600 px-12 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
                  href="/pages/articles"
                >
                  Read More...
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
