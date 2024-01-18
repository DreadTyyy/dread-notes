import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-9xl leading-loose font-bold">Oops</h1>
      <h2 className="text-3xl leading-normal font-semibold">
        404 - Page Not Found{" "}
      </h2>
      <p>Sorry, the page you are looking for is unavailable for now.</p>
      <Link
        to="/"
        className="mt-6 py-2 px-4 bg-green-700 rounded-full hover:bg-green-500 transition-all">
        Back To Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
