"use client";
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCakeCandles, faPenToSquare, faPhone, faUser, faVenusMars } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import EditAccount from "./_component/edit-account"
import { useAuth } from "@/untils/AuthProvider";
import { OrtherFunction } from "@/common/orther.fn";


export default function Account(){
    const ortherFunction = new OrtherFunction
    const {getcookie, getprofile,getImageMarket} = useAuth()
    const [modelEditAccount, setModelEditAccount] = useState(false)
    console.log("getcookie : ",getcookie)

    const [currentIndex, setCurrentIndex] = useState(0)
        const slideInterval = 3000
        const nextSlide = ()=>setCurrentIndex((prevIndex)=>(prevIndex + 1) % getImageMarket.picMarket.length)
        const prevSlide = ()=>{
            setCurrentIndex((prevIndex)=>prevIndex === 0 ? getImageMarket.picMarket.length - 1 : prevIndex -1)
        }
    
        useEffect(()=>{
            if(getImageMarket && getImageMarket.picMarket.length > 0){
                const interval = setInterval(nextSlide, slideInterval)
                return ()=>clearInterval(interval)
            }
        },[currentIndex])
        console.log({"ll":getImageMarket})
    return (
        
        <div className="w-full">
            <div className="bg-white rounded-lg shadow-md w-full max-w-full mx-auo overflow-hidden">
                <div 
                    className="flex transition-transform duration-700 relative bg-gray-200 w-full"
                >
                    {getImageMarket && getImageMarket?.picMarket.length > 0 ?(
                    <div 
                        className="flex w-full transition-transform"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`
                        }}
                    >
                        {getImageMarket.picMarket.map((image:any, index:number)=>(
                            <div className="min-w-full" key={index}>
                                <img 
                                    alt="banner"
                                    src={`http://localhost:3001/upload/photomarket/${image.filename}`} 
                                    className="h-80 -translate-x ease-in-out w-auto cursor-pointer"
                                />
                            </div>
                        ))}
                    </div>
                    ):(
                    <div className="flex w-full transition-transform">
                        <div className="min-w-full">
                            <img 
                                alt="banner"
                                src={"/images/banner-market.png"} 
                                className="h-80 -translate-x ease-in-out w-full cursor-pointer"
                                style={{
                                    backgroundAttachment:"fixed",
                                    backgroundRepeat:"no-repeat",
                                    objectFit:"cover"
                                }}
                            />
                        </div>
                    </div>
                    )}
                </div>

                <div className="relative flex items-center -mt-10 px-6 w-100">
                    <div style={{width:'200px',height:'170px'}} className="relative rounded-full overflow-hidden border-4 border-white">
                        <Image 
                            alt="profile"
                            src={getprofile.Photo ? `http://localhost:3001/${getprofile.Photo?.path}` : "/images/default-profile.jpg"}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="ml-4 w-full">
                        <div className="flex w-full">
                            <div className="w-full flex flex-row mx-7 gap-2">
                                <span className="text-xl font-semibold">
                                    <FontAwesomeIcon icon={faUser}/> &nbsp; {getprofile.Profile?.firstname}
                                </span>
                                <span className="text-xl font-semibold mx-4">
                                    {getprofile.Profile?.lastname}
                                </span>
                                <span className="text-xl font-semibold ml-7">
                                    <FontAwesomeIcon icon={faVenusMars} /> &nbsp; {getprofile.Account ? getprofile.Account?.gender : "ยังไม่ระบุ"}
                                </span>
                            </div>
                            <div className="flex flex-row mt-2">
                                    <FontAwesomeIcon 
                                        icon={faPenToSquare} 
                                        style={{fontSize:'17px',width:'20px'}} 
                                        className="text-sm text-dark-700 ml-auto"
                                        onClick={()=>setModelEditAccount(true)}
                                    />
                            </div>
                        </div>
                        <div className="flex w-full">
                            <div className="w-full flex flex-row mx-7">
                                <span className="text-xl font-semibold">
                                    <FontAwesomeIcon icon={faPhone} /> &nbsp; {getprofile.Profile?.phone}
                                </span>
                            </div>
                        </div>
                        <div className="flex w-full">
                            <span className="text-xl font-semibold ml-7">
                                <FontAwesomeIcon icon={faCakeCandles} />
                            </span>
                            {getprofile.Account ? (
                              <>
                                <span className="text-xl font-semibold ml-4 mr-2">{getprofile.Account?.day}</span>
                                <span className="text-xl font-semibold mx-2">{ortherFunction.getMonth(getprofile.Account?.month)}</span>
                                <span className="text-xl font-semibold mx-2">{getprofile.Account?.year}</span>
                               </>
                            ):<span className="text-xl font-semibold mx-4">ยังไม่ระบุ</span>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md w-full max-w-full mx-auo overflow-hidden mt-4">
                <ul className="grid grid-flow-col text-center border-b border-gray-200 text-gray-500">
                    <li>
                    <a href="#page4" className="flex justify-center border-b-4 border-transparent hover:text-indigo-600 hover:border-indigo-600 py-4">Dashbord</a>
                  </li>
                  <li>
                    <a href="#page1" className="flex justify-center border-b-4 border-transparent hover:text-indigo-600 hover:border-indigo-600 py-4">สินค้าในตะกร้า</a>
                  </li>
                  <li>
                    <a href="#page2" className="flex justify-center border-b-4 border-transparent hover:text-indigo-600 hover:border-indigo-600 py-4">ประวัติการสั่งซื้อสินค้า</a>
                  </li>
                  <li>
                    <a href="#page3" className="flex justify-center border-b-4 border-transparent hover:text-indigo-600 hover:border-indigo-600 py-4">สินค้าที่ฉันรีวิว</a>
                  </li>
                  <li>
                    <a href="#page5" className="flex justify-center border-b-4 border-transparent hover:text-indigo-600 hover:border-indigo-600 py-4">ที่อยู่ในการจัดส่ง</a>
                  </li>
                </ul>

                <div className="relative overflow-x-auto mt-2">

                </div>

            </div>
            {modelEditAccount ? <EditAccount setModelEditAccount={setModelEditAccount} /> : null}
        </div>
    )
}