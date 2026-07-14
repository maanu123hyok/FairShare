import { useEffect, useState } from "react";
import api from "../api/PreApi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate();

    async function getUserDetails() {
        try {
            const data = await api.get("/dashboard");
            setEmail(data.data.email);
        } catch (err) {
            const errMsg=err.response?.data.message||err||"";
            navigate("/error", errMsg);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center mt-12 mb-20 px-4 font-lato">
            <div className="w-full max-w-md bg-white border border-[#BCB3B1]/40 p-8 rounded-2xl shadow-sm flex flex-col items-center">
                
                {/* Profile Visual/Icon Avatar */}
                <div className="w-16 h-16 rounded-full bg-[#988B7B]/10 border border-[#988B7B]/20 flex items-center justify-center mb-6">
                    <span className="text-[#988B7B] text-2xl font-asul font-bold">
                        {email ? email.charAt(0).toUpperCase() : "U"}
                    </span>
                </div>

                <h2 className="text-2xl font-asul font-bold text-center text-[#988B7B] tracking-wide mb-2">
                    Welcome Back
                </h2>
                
                <p className="text-slate-400 text-xs text-center uppercase tracking-wider font-semibold mb-6">
                    User Account Overview
                </p>

                <div className="w-full bg-[#f9f3ea]/30 rounded-xl p-4 border border-slate-100 mb-2">
                    <span className="text-slate-400 font-bold text-xs uppercase tracking-wider block mb-1 text-center md:text-left">
                        Registered Email
                    </span>
                    <p className="text-slate-800 font-semibold text-sm text-center md:text-left break-all">
                        {loading ? (
                            <span className="inline-block w-24 h-4 bg-slate-200 animate-pulse rounded"></span>
                        ) : (
                            email || "No email found"
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;