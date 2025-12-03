import { Link, useRouteError } from "react-router-dom";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";

export const ErrorComponent = ({ containerClassName, imageClassName }) => {
  const error = useRouteError();

  // Get the current pathname
  const pathname = window.location.pathname;

  // Extract the last segment of the pathname (after the last "/")
  const dynamicPage = pathname.split("/").filter(Boolean).pop();

  console.log(error, "fassa");

  // Check if the error message indicates a route is not found
  const isPageNotFound = true

  return (
    <div
      className={`${containerClassName} px-2 w-full min-h-screen flex flex-col justify-center items-center text-center gap-4`}
    >
      <ReportProblemOutlinedIcon fontSize="large" />
      {/* <img
        className={`${imageClassName} w-96`}
        src={"/images/404-img.svg"}
        alt="404-image"
      /> */}
      {/* {!error?.message ? (
        <h1 className="font-bold text-4xl">Oh no. We lost this page</h1>
      ) : ( */}
      <h1 className="font-bold text-4xl">
        {isPageNotFound
          ? `We don’t have a ${dynamicPage} page for now`
          : "We have got an error!"}
      </h1>
      {/* )} */}
      {isPageNotFound ? (
        <p>
          This module will be available soon. We apologize for the inconvenience.
        </p>
      ) : error?.message ? (
        <p>{error.message}</p>
      ) : (
        <p>
          We searched everywhere but couldn’t find what you’re looking for.
          <br /> Let’s find a better place for you to go.
        </p>
      )}
      <Link to={"/"} v2={true}>
        Back to Homepage
      </Link>
    </div>
  );
};
