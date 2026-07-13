import { useRouteError, useLocation,useNavigate } from "react-router-dom";

const Error = () => {
  const navigate=useNavigate();
  const error = useRouteError();
  const apiError = useLocation();
  const displayError =
    apiError.state?.message ||
    error?.data ||
    error?.message ||
    "Internal Server Error Occured"; //error<.data shows msg for page not found and error?.message shows msg for any other error

    function handleGoBack(){
      navigate(-1);
    }
    
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-20">
        <h2 className="font-asul">OOPS! AN ERROR OCCURED</h2>
        <div className="font-asul">
          {error&&error.status == 404 ? (
            <h2>Page Not Found</h2>
          ) : displayError ? (
            <h2>{displayError}</h2>
          ) : (
            ""
          )}
        </div>

        <button onClick={handleGoBack} className="p-2 cursor-pointer bg-black text-white rounded-full">
           GO BACK
        </button>
      </div>
    </>
  );
};

export default Error;
