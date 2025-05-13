import { NextAuthOptions } from "next-auth";
import { LoginResponse } from "./lib/Types/auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/Constants/api.constant";
import { AuthenticationError } from "./lib/utils/app-errors";

export const authOptions: NextAuthOptions={
providers:[
    Credentials({
        name:"Credentials",
        credentials:{
          email:{},
          password:{},
        }
      ,
        authorize:async(credentials)=>{
        const response=await fetch(`${process.env.API}/auth/signin`,{
        method:'POST',
        cache:'no-store',
        body:JSON.stringify({
            email:credentials?.email,
            password:credentials?.password,
        }),
        headers:{
        ...JSON_HEADER
        }
        })
        const payload: APIResponse<LoginResponse> = await response.json();
        if('code'in payload){
         throw new AuthenticationError(payload.message)
        }
        return {
        id:payload.user._id,
        user:payload.user,
        token:payload.token,
        role:payload.role
        }
    }
})

   
],
callbacks:{
    jwt:({token,user})=>{
        if(user){
            token.user=user.user;
            token.token=user.token;
            // token.role = "admin";
        }
        console.log("Token:", token);

        return token
    },
    session:({session,token})=>{
        session.user=token.user;
        return session
    }
},
pages:{
    signIn:"/en/auth/Login"
}
}
