"use client"; /*all components are server-side by default, whcih means they dont have access to the frontend*/
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast/headless";
export default function LoginPage() {
  const router= useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const [buttonDisabled, setbuttonDisabled] = useState(false);
const [loading, setloading] = useState(false);

  const onLogin = async () => { 
    try {
      setloading(true);
      const response= await axios.post("/api/users/login",user)
      console.log("Login success",response.data);
      toast.success("Successfully Logged in !");
      router.push("/profile");
      
    } catch (error:any) {
      console.log("Login failed", error.message);
      toast.error("This didn't work.",error.message);
    }
    finally{
      setloading(false)
    }
  };
  useEffect(()=>{
    if(user.email.length > 0 && user.password.length>0){
      setbuttonDisabled(false);
    }
    else{
      setbuttonDisabled(true);
    }
  },[user]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-2">
      <h1 className="text-2xl">{loading?"Please wait !":"Login"}</h1>
      <hr />

      <label htmlFor="email" className="text-lg">
        Email
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter your Email"
      />

      <label htmlFor="password" className="text-lg">
        Password
      </label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter your Password"
      />
      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:bg-white hover:text-black"
        onClick={onLogin}
      >
         {buttonDisabled?"Enter correct info !":"Login"}
      </button>
      <p>OR</p>
      <hr />
      <Link
        href={"/signup"}
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:bg-white hover:text-black"
      >
        Signup
      </Link>
    </div>
  );
}
