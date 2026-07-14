// import { useNavigate, useLocation,NavLink } from "react-router-dom";
// import api from "../../api/PreApi";
// import { useState } from "react";

// const UpdateExpenses = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const element = location.state?.element;
//     const [expCredentials, setExpCredentials] = useState({
//         expName: element.expName ,
//         expDescription: element.expDescription ,
//         amtPaid:element.amtPaid,
//         whoPaid: element.whoPaid.email,
//         forWhomPaid: element.forWhomPaid.email,
//         amtReturned: element.amtReturned,
//       });
    
//       const handleChange = (e) => {
//         setExpCredentials((prev) => {
//             return {...prev,[e.target.name]:e.target.value}
//         });
//       };
//       async function handleSubmit(e) {
//         e.preventDefault();
//         try {
//           const data = await api.patch(`/groups/${element.groupId}/expenses/${element._id}`,expCredentials);
//           navigate(-1);
//         } catch (err) {
//           const errMsg = err.response?.data?.message || err || "";
//           navigate("/error", { state: { message: errMsg } });
//         }
//       }
  
//   return (
//     <>
//       <div className="flex flex-col justify-center items-center">
//         {element ? (
//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-col justify-center items-center"
//           >
//             <div className="flex flex-col justify-center items-center mb-5">
//               <label>Expense Name</label>
//               <input
//                 name="expName"
//                 value={expCredentials.expName}
//                   onChange={handleChange}
//                 type="text"
//                 className="p-1 border rounded-2xl"
//               ></input>
//             </div>

//             <div className="flex flex-col justify-center items-center mb-5">
//               <label>Expense Description</label>
//               <input
//                 name="expDescription"
//                 value={expCredentials.expDescription}
//                   onChange={handleChange}
//                 type="text"
//                 className="p-1 border rounded-2xl "
//               ></input>
//             </div>

//             <div className="flex flex-col justify-center items-center mb-5">
//               <label>Amount Paid</label>
//               <input
//                 name="amtPaid"
//                 value={expCredentials.amtPaid}
//                   onChange={handleChange}
//                 type="number"
//                 className="p-1 border rounded-2xl "
//               ></input>
//             </div>

//             <div className="flex flex-col justify-center items-center mb-5">
//               <label>Id of the user who paid:</label>
//               <input
//                 name="whoPaid"
//                 value={expCredentials.whoPaid}
//                   onChange={handleChange}
//                 type="text"
//                 className="p-1 border rounded-2xl "
//               ></input>
//             </div>

//             <div className="flex flex-col justify-center items-center mb-5">
//               <label>Id of the user for whom paid:</label>
//               <input
//                 name="forWhomPaid"
//                 value={expCredentials.forWhomPaid}
//                   onChange={handleChange}
//                 type="text"
//                 className="p-1 border rounded-2xl "
//               ></input>
//             </div>

//             <div className="flex flex-col justify-center items-center mb-5">
//               <label>Amount Returned</label>
//               <input
//                 name="amtReturned"
//                 value={expCredentials.amtReturned}
//                   onChange={handleChange}
//                 type="number"
//                 className="p-1 border rounded-2xl "
//               ></input>
//             </div>

//             <button className="p-3 bg-black text-white rounded-4xl cursor-pointer">
//               UPDATE
//             </button>
//           </form>
//         ) : (
//           <button className="p-3 bg-black text-white mt-10 mb-10">
//             <NavLink to="/groups">Go To Groups</NavLink>
//           </button>
//         )}
//       </div>
//     </>
//   );
// };

// export default UpdateExpenses;


import { useNavigate, useLocation,NavLink } from "react-router-dom";
import api from "../../api/PreApi";
import { useState } from "react";

const UpdateExpenses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const element = location.state?.element;
    const [expCredentials, setExpCredentials] = useState({
        expName: element?.expName || "",
        expDescription: element?.expDescription || "",
        amtPaid: element?.amtPaid || 0,
        whoPaid: element?.whoPaid?.email || "",
        forWhomPaid: element?.forWhomPaid?.email || "",
        amtReturned: element?.amtReturned || "",
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
  
  return (
    <>
      <div className="flex flex-col justify-center items-center mt-12 mb-20 px-4 font-lato">
        {element ? (
          <div className="w-full max-w-md bg-white border border-[#BCB3B1]/40 p-8 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-asul font-bold text-center text-[#988B7B] tracking-wide mb-2">
              Update Expense
            </h2>
            <p className="text-slate-400 text-sm text-center mb-8 uppercase tracking-wider font-semibold">
              Editing: {element.expName}
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col"
            >
              <div className="flex flex-col mb-5">
                <label className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">Expense Name</label>
                <input
                  name="expName"
                  value={expCredentials.expName}
                  onChange={handleChange}
                  type="text"
                  className="p-2.5 border border-slate-200 rounded-3xl outline-none focus:border-[#988B7B] transition-colors w-full"
                />
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">Expense Description</label>
                <input
                  name="expDescription"
                  value={expCredentials.expDescription}
                  onChange={handleChange}
                  type="text"
                  className="p-2.5 border border-slate-200 rounded-3xl outline-none focus:border-[#988B7B] transition-colors w-full"
                />
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">Amount Paid</label>
                <input
                  name="amtPaid"
                  value={expCredentials.amtPaid}
                  onChange={handleChange}
                  type="number"
                  className="p-2.5 border border-slate-200 rounded-3xl outline-none focus:border-[#988B7B] transition-colors w-full"
                />
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">Id of the user who paid:</label>
                <input
                  name="whoPaid"
                  value={expCredentials.whoPaid}
                  onChange={handleChange}
                  type="text"
                  className="p-2.5 border border-slate-200 rounded-3xl outline-none focus:border-[#988B7B] transition-colors w-full"
                />
              </div>

              <div className="flex flex-col mb-5">
                <label className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">Id of the user for whom paid:</label>
                <input
                  name="forWhomPaid"
                  value={expCredentials.forWhomPaid}
                  onChange={handleChange}
                  type="text"
                  className="p-2.5 border border-slate-200 rounded-3xl outline-none focus:border-[#988B7B] transition-colors w-full"
                />
              </div>

              <div className="flex flex-col mb-8">
                <label className="text-slate-500 font-bold text-xs uppercase tracking-wider mb-2">Amount Returned</label>
                <input
                  name="amtReturned"
                  value={expCredentials.amtReturned}
                  onChange={handleChange}
                  type="number"
                  className="p-2.5 border border-slate-200 rounded-3xl outline-none focus:border-[#988B7B] transition-colors w-full"
                />
              </div>

              <button className="w-full p-3 bg-black text-white hover:bg-slate-800 transition-colors text-sm font-medium rounded-3xl tracking-wide cursor-pointer uppercase">
                UPDATE
              </button>
            </form>
          </div>
        ) : (
          <button className="p-3 bg-black text-white mt-10 mb-10 rounded-3xl hover:bg-slate-800 transition-colors text-sm uppercase tracking-wider font-semibold cursor-pointer px-6">
            <NavLink to="/groups">Go To Groups</NavLink>
          </button>
        )}
      </div>
    </>
  );
};

export default UpdateExpenses;