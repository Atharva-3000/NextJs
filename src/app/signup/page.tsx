"use client"  /*all components are server-side by default, whcih means they dont have access to the frontend*/
import Link from "next/link";
import {useState, useEffect} from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";


export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email:"",
    password:"",
    username:"",
  })

const [buttonDisabled, setbuttonDisabled] = useState(false);
const [loading, setloading] = useState(false)
  const onSignup=async()=>{
    try {
      setloading(true);
      const response= await axios.post("/api/users/signup",user)
      console.log("Signup success",response.data);
      toast.success("Successfully signed up !");
      router.push("/login");
      
    } catch (error:any) {
      console.log("Signup failed", error.message);
      toast.error("This didn't work.",error.message);
    }
    finally{
      setloading(false)
    }
  }
  useEffect(() => {
    if(user.email.length > 0 && user.password.length>0 && user.username.length>0){
      setbuttonDisabled(false);
    }
    else{
      setbuttonDisabled(true);
    }
  }, [user])
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-2">
      <h1 className="text-2xl">{loading?"Please wait":"Signup"}</h1>
      <hr />
      <label htmlFor="username" className="text-lg">Username</label>
      <input
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" 
      id="username" type="text" value={user.username}
      onChange={(e)=>setUser({...user,username:e.target.value})}
      placeholder="Enter your Username"
      />

      <label htmlFor="email" className="text-lg">Email</label>
      <input
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" 
      id="email" type="email" value={user.email}
      onChange={(e)=>setUser({...user,email:e.target.value})}
      placeholder="Enter your Email"
      />

      <label htmlFor="password" className="text-lg">Password</label>
      <input
      className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black" 
      id="password" type="password" value={user.password}
      onChange={(e)=>setUser({...user,password:e.target.value})}
      placeholder="Enter your Password"
      />
      <button className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:bg-white hover:text-black" onClick={onSignup}>
          {buttonDisabled?"Enter correct info !":"Signup"}
          <Toaster position="top-center"/>
      </button>
      <p>OR</p>
      <hr />
      <Link href={"/login"} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 hover:bg-white hover:text-black">Login</Link>
    </div>
  );
}
