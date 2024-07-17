import React from "react";
import { Link } from "react-router-dom";


function ProfilePage() {    
   

    return (
        <div className="w-full h-full flex justify-center  ">
            <div className="w-[80%] font-[Roboto] ">
                <div className="my-[20px]">
                    <Link to="/">
                        <Link  to="/" className="text-[#9D9D9D]">Home /</Link>
                    </Link>
                    <span>Profile</span>
                </div>
                <div className="ml-[50px]">
                    <h1 className="text-[#0A0102] text-xl font-semibold">Personal Details</h1>
                    <div className="w-[50%] flex flex-col gap-2">
                        <div className="w-full flex flex-col">
                            <label>Full Name</label>
                            <input className="px-5 py-2 h-[45px] border-2 rounded">
                               
                            </input>
                        </div>
                        <div className="w-full flex flex-col">
                            <label>Email Id</label>
                            <input className="px-5 py-2 h-[45px] border-2 rounded">
                             
                            </input>
                        </div>
                        <div className="w-full flex flex-col">
                            <label>Mobile Number</label>
                            <input className="px-5 py-2 h-[45px] border-2 rounded">
                                
                            </input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
