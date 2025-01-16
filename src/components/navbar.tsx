"use client";
import React,{useEffect, useState} from "react";
import Image from "next/image"
import { MagnifyingGlassIcon,ShoppingCartIcon } from "@heroicons/react/16/solid"
import Login from "@/components/login";
import Basket from "@/components/basket";
import Swal from "sweetalert2";
import { deleteCookie } from "@/untils/SessionProviders";
import { useAuth } from "@/untils/AuthProvider";
import Link from "next/link";

function Logout(){
    deleteCookie()
    Swal.fire({
      icon:"success",
      title:"logout success",
      showConfirmButton:false,
      timer:1500
    }).then(()=>{
      window.location.href = "/"
    })
}
export default function Navbar({...prop}) {
    const {getcookie,getprofile} = useAuth()
    const [modalLogin,setModelLogin] = useState(false)
    const [typeForm, setTypeForm] = useState("login")
    const [isShowBasket, setIsShowBasket] = useState(false)

    function handleForm(status:boolean,typeform:string){
      setModelLogin(status)
      setTypeForm(typeform)
    }
    return (
        <>
          <div className="flex items-center justify-between mx-auto p-4 bg-gray-100">
            
              <ul className="flex items-center h-0 gap-4 ml-auto">
                <li className="p-0 m-0 h-auto"><Link href={"/"} className="text-xs font-bold uppercase">HOME</Link></li>
                {!prop.getcookie?.value ? (
                  <>
                    <li className="p-0 m-0 h-auto">
                      <button className="text-xs font-bold uppercase" onClick={()=>handleForm(true,"login")}>LOGIN</button>
                    </li>
                    <li className="p-0 m-0 h-auto">
                      <a className="text-xs font-bold uppercase" onClick={()=>handleForm(true,"signup")}>SIGNUP</a>
                    </li>
                  </>
                ):(
                    <li className="p-0 m-0 h-auto text-center">
                      <Link href={"/accounts"}>
                        <span className="text-xs font-bold uppercase text-dark-900 underline">
                          {getprofile.Profile?.firstname}'s &nbsp; Account
                        </span>
                       </Link>
                    </li>
                )}
                <li className="p-0 m-0 h-auto"><a className="text-xs font-bold">เปลี่ยนภาษา</a></li>
              </ul>
              <div className="w-20"></div>
          </div>
          <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
            <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <Image src="/images/luzudu.png" width={140} height={130} className="h-8" alt="Flowbite Logo" />
            </a>
            <div className="flex items-center w-full">
                <div className="ml-auto items-center justify-between w-full lg:w-1/2 px-4" id="navbar-search">
                  <div className="relative mt-3">
                    <input type="text" id="search-navbar" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-0 border" placeholder="Search..." />
                    <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-orange-500 rounded-0 border border-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300">
                        <MagnifyingGlassIcon className="h-6 w-6 text-white-800"/>
                    </button>
                  </div>
                </div>
                <div className="items-center justify-between pt-3 hover:pt-1 pb-0">
                    <ShoppingCartIcon className="h-10 w-10 hover:h-12 hover:w-12 text-blue-500 underline cursor-pointer" onClick={()=>setIsShowBasket(true)}/>
                </div>
            </div>
          </div>
          {modalLogin ? <Login handleForm={handleForm} setTypeForm={setTypeForm} typeForm={typeForm} /> : null}
          {isShowBasket ? <Basket setIsShowBasket={setIsShowBasket} isShowBasket={isShowBasket}/> : null}
        </>
    )
}
