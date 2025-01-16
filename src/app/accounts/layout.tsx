
//import { useEffect,useState } from "react";
import Sidebar from "./_component/sidebar";
import { cookies } from "next/headers";
import { getProfile } from "@/untils/SessionProviders";
import { redirect } from "next/navigation";


export default async function RootAccountLayout({ children }:Readonly<{children:React.ReactNode}>){
    const cookieStore = await cookies()
      const getcookie = cookieStore.get('Authentication')
      const getDataProfile = await getProfile()
      if(!getcookie){
            redirect('/')
      }
    return (
        <div className="w-full flex bg-white">
            <Sidebar user={getDataProfile?.data}/>
            <div className="w-full">
                {children}
            </div>
        </div>
    )
}