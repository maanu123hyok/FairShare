import api from "../../api/PreApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMembers = ({ setChangeInGroup }) => {
  const navigate = useNavigate();
  const [memberCount, setMemberCount] = useState(1);
  const [groupCredentials, setGroupCredentials] = useState({
    grpName: "",
    grpDescription: "",
    grpMembers: [],
  });

  function handleChange(e, idx) {
    setGroupCredentials((prev) => {
      if (idx != null) {
        const updatedMembers = [...prev.grpMembers];
        updatedMembers[idx] = e.target.value;
        return {
          ...prev,
          grpMembers: updatedMembers,
        };
      }
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await api.post("/groups", groupCredentials);
    } catch (err) {
      navigate("/error", {
        state: {
          message: err.response.data.message,
          status: err.response?.status || 401,
        },
      });
    }
    setGroupCredentials({
      grpName: "",
      grpDescription: "",
      grpMembers: [],
    });
    navigate(-1);
  }

  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center"
        >
          <div className="flex flex-col justify-center items-center mb-5">
            <label>Group Name</label>
            <input
              name="grpName"
              value={groupCredentials.grpName}
              onChange={handleChange}
              type="text"
              className="p-1 border rounded-2xl"
            ></input>
          </div>

          <div className="flex flex-col justify-center items-center mb-5">
            <label>Group Description</label>
            <input
              name="grpDescription"
              value={groupCredentials.grpDescription}
              onChange={handleChange}
              type="text"
              className="p-1 border rounded-2xl "
            ></input>
          </div>

          <div className="flex flex-col justify-center items-center gap-2 mb-5">
            <label>Group Members</label>
            <div className="flex flex-col">
              {Array.from({ length: memberCount }).map((el, idx) => {
                return (
                  <input
                    key={idx}
                    name="grpMembers"
                    value={groupCredentials.grpMembers[idx] || ""}
                    onChange={(el) => handleChange(el, idx)}
                    type="email"
                    className="p-1 border rounded-3xl "
                  ></input>
                );
              })}
            </div>
            <button
              onClick={() => setMemberCount((prev) => prev + 1)}
              type="button"
              className="p-1 bg-yellow-200 cursor-pointer"
            >
              +Add another group member
            </button>
          </div>

          <button className="p-3 bg-black text-white rounded-4xl cursor-pointer">
            CREATE
          </button>
        </form>
      </div>
    </>
  );
};

export default AddMembers;
