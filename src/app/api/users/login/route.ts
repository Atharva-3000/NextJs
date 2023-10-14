import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NodeNextResponse } from "next/dist/server/base-http/node";
connect()

export async function POST(request: NextRequest){
    try {
        const reqBody=await request.json();
        const {email, password}=reqBody;
        console.log(reqBody);

        // check if user exist
        const user=await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"User does not exist !"},{status:400})
        }

//  if password correct
        const validPassword=await bcrypt.compare(password,user.password);
        if(!validPassword){
            return NextResponse.json({error:"Invalid password"},{status:500})
        }
        
        // now create a jwt (and payload) and store it in user cookies and not local storage as it is alterable.

        // create token data
        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email,
        }
        // create token
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})
        // set it to cookie
        const response =NextResponse.json({
            message:"Login uccessfult",
            success:true,
        })
        response.cookies.set("token",token,{httpOnly:true})
        return response;
    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:500})
    }
}