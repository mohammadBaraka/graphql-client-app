import Link from "next/link";
export default function Hero() {
  return (
    <section
      className={`relative bg-[url(https://t4.ftcdn.net/jpg/00/84/40/69/360_F_84406942_f6ql6ZsFRRu8zjY3MeoPScuH9fH5WAg2.jpg)] bg-cover bg-center bg-no-repeat`}
    >
      <div
        className="absolute inset-0 bg-white/75 
      sm:bg-gradient-to-r
      sm:bg-transparent sm:from-white/95 sm:to-white/25 
      md:sm:bg-gradient-to-r
      md:bg-transparent md:from-white/95 md:to-white/15
      "
      ></div>

      <div className="relative px-4 py-32 sm:px-6 w-full lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="lg:w-full flex flex-col justify-center items-center">
          <h1 className="text-3xl lg:text-[75px]  text-grayColor font-bold text-center text-shadow-sm">
            Let us find your
            <strong className="text-5xl  lg:text-[100px] block font-extrabold text-mainColor mt-5 lg:mt-10">
              Forever Articles.
            </strong>
          </h1>

          <p className="max-w-2xl font-bold sm:text-xl/relaxed text-center mt-4 lg:mt-5 text-grayColor [text-shadow:_0px_5px_5px_rgb(255_255_255/_90%)]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              href="/"
              className="block w-full rounded bg-mainColor px-12 py-3 text-sm font-medium text-white shadow hover:bg-hoverColor focus:outline-none focus:ring active:bg-hoverColor sm:w-auto"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
