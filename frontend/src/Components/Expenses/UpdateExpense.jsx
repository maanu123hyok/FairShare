import { useNavigate, useLocation, useParams,NavLink } from "react-router-dom";
import api from "../../api/PreApi";
import { useState } from "react";

const UpdateExpenses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const element = location.state?.element||undefined;
  const url=useParams();
  if(element){
    const [expCredentials, setExpCredentials] = useState({
        expName: element.expName,
        expDescription: element.expDescription,
        amtPaid:element.amtPaid,
        whoPaid: element.whoPaid,
        forWhomPaid: element.forWhomPaid,
        amtReturned: element.amtReturned,
      });
    
      const handleChange = (e) => {
        setExpCredentials((prev) => {
            return {...prev,[e.target.name]:e.target.value}
        });
      };
      async function handleSubmit(e) {
        e.preventDefault();
        try {
          const data = await api.patch(`/groups/${element.groupId}/expenses/${element._id}`,expCredentials);
          navigate(-1);
        } catch (err) {
          const errMsg = err.response?.data?.message || err || "";
          navigate("/error", { state: { message: errMsg } });
        }
      }
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {element ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
          >
            <div className="flex flex-col justify-center items-center mb-5">
              <label>Expense Name</label>
              <input
                name="expName"
                value={expCredentials.expName}
                  onChange={handleChange}
                type="text"
                className="p-1 border rounded-2xl"
              ></input>
            </div>

            <div className="flex flex-col justify-center items-center mb-5">
              <label>Expense Description</label>
              <input
                name="expDescription"
                value={expCredentials.expDescription}
                  onChange={handleChange}
                type="text"
                className="p-1 border rounded-2xl "
              ></input>
            </div>

            <div className="flex flex-col justify-center items-center mb-5">
              <label>Amount Paid</label>
              <input
                name="amtPaid"
                value={expCredentials.amtPaid}
                  onChange={handleChange}
                type="number"
                className="p-1 border rounded-2xl "
              ></input>
            </div>

            <div className="flex flex-col justify-center items-center mb-5">
              <label>Id of the user who paid:</label>
              <input
                name="whoPaid"
                value={expCredentials.whoPaid}
                  onChange={handleChange}
                type="text"
                className="p-1 border rounded-2xl "
              ></input>
            </div>

            <div className="flex flex-col justify-center items-center mb-5">
              <label>Id of the user for whom paid:</label>
              <input
                name="forWhomPaid"
                value={expCredentials.forWhomPaid}
                  onChange={handleChange}
                type="text"
                className="p-1 border rounded-2xl "
              ></input>
            </div>

            <div className="flex flex-col justify-center items-center mb-5">
              <label>Amount Returned</label>
              <input
                name="amtReturned"
                value={expCredentials.amtReturned}
                  onChange={handleChange}
                type="number"
                className="p-1 border rounded-2xl "
              ></input>
            </div>

            <button className="p-3 bg-black text-white rounded-4xl cursor-pointer">
              UPDATE
            </button>
          </form>
        ) : (
          <button className="p-3 bg-black text-white mt-10 mb-10">
            <NavLink to="/groups">Go To Groups</NavLink>
          </button>
        )}
      </div>
    </>
  );
};

export default UpdateExpenses;
