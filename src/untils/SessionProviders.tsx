"use server"
import { cookies,headers } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";

const getHeaders = () => ({
    Cookie: cookies().toString(),
});

const setAuthCookie = async (respose:any)=>{
    console.log(respose)
    const cookieStore = await cookies()
     if(respose.token){
        cookieStore.set({
             name:"Authentication",
             value: respose.token,
             secure: true,
             httpOnly: true,
             expires: new Date(jwtDecode(respose.token).exp! * 1000),
         })
     }else{
         console.log("not cookie")
     }
     return cookieStore.get('Authentication')
  }

const deleteCookie = async ()=>{
   (await cookies()).delete('Authentication')
   redirect('/')
}

const getProfile = async ()=>{
    const cookieStore = await cookies()
    const getcookie = cookieStore.get('Authentication')
    if(getcookie?.value){
        const fetchData = await fetch('http://localhost:3001/users/profile/',{
            method:"GET",
            headers:{
              Authorization: `Bearer ${getcookie?.value}`
            },
            credentials: 'include'
        })
        const responseData = await fetchData.json()
        return responseData;
    }
    return null
}

const getMyMarket = async ()=>{
    const cookieStore = await cookies()
    const getCookie = cookieStore.get('Authentication')
    if(getCookie?.value){
        try{
            const fetchData = await fetch('http://localhost:3001/markets/',{
                method:"GET",
                headers:{
                  Authorization: `Bearer ${getCookie?.value}`
                },
                credentials: 'include'
            })
            if(!fetchData.ok) throw new Error(`Is Error(${fetchData.status})`)
            const responseData = await fetchData.json()
            return responseData;
        }catch(e){
            console.log(e)
            return null
        }
    }

}

const getImageMarket = async ()=>{
    const cookieStore = await cookies()
    const getCookie = cookieStore.get('Authentication')
    if(getCookie?.value){
        const fetchData = await fetch('http://localhost:3001/markets/getpicmarket/',{
            method:"GET",
            headers:{
              Authorization: `Bearer ${getCookie?.value}`
            },
            credentials: 'include'
        })
        if(!fetchData.ok) throw new Error(`Is Error(${fetchData.status})`)
        const responseData = await fetchData.json()
        return responseData;
    }
    return null  
}
const getCookie = async ()=>{
    const cookieStore = await cookies()
    const getcookie = cookieStore.get('Authentication')
    return getcookie;
}
export {deleteCookie,setAuthCookie,getHeaders,getProfile,getCookie,getMyMarket,getImageMarket}