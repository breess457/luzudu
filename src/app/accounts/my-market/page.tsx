
"use client";
import React,{ ChangeEvent, FormEvent, useEffect, useState }  from "react";
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCakeCandles, faPhone, faShop,faPenToSquare, faXmark, faCheck, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { useAuth } from "@/untils/AuthProvider";
import { getMyMarket } from "@/untils/SessionProviders";
import { OrtherFunction } from "@/common/orther.fn";
import EditImageMarket from "./_component/edit-market";
import { ToastContainer,toast } from "react-toastify";
import DashbordPage from "./_tabspage/dashboard";
import ProductPage from "./_tabspage/product";
import ListItemBeShipped from "./_tabspage/listitembeshipped";
import ListAlreadtShipped from "./_tabspage/listalreadyshipped";
import ListReturnProduct from "./_tabspage/listreturnproduct";
const Mymarket = ()=>{
    const ortherFunction = new OrtherFunction
    const {getcookie, getprofile,getmymarket,getMarketsImage} = useAuth()
    const [dataImageMarket,setDataImageMarket] = useState(getMarketsImage)
    const [dataMarket, setDataMarket] = useState(getmymarket)
    const [showInputShopName, setShowInputShopName] = useState(false)
    const [showLocation, setShowLocation] = useState(false)
    const [isTab, setIsTab] = useState('tab1')
    const [inputShopName, setInputShopName] = useState(dataMarket?.nameMarket ?? "")
    const [inputShopLocation, setInputShopLocation] = useState({
        address: dataMarket ? dataMarket?.locationMarket[0]?.address:"",
        subdistrict: dataMarket ? dataMarket?.locationMarket[0]?.subdistrict:"",
        district: dataMarket ? dataMarket?.locationMarket[0]?.district:"",
        province: dataMarket ? dataMarket?.locationMarket[0]?.province:"",
        zipcode: dataMarket ? dataMarket?.locationMarket[0]?.zipcode: ""
    })
    
    const [error,setError]:any = useState({
        shopname:false,
        addressshop:false
    })
    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target
        setInputShopLocation({
            ...inputShopLocation,
            [name]:value
        })
    }
    console.log("inputShopLocation : ",inputShopLocation)

    
    const handleSubmitShopName = async (e:FormEvent)=>{
        e.preventDefault()
        if(!inputShopName){
            setError({shopname:true})
        }else{
            setError({shopname:false})
            const postShopName = await fetch('http://localhost:3001/markets/manage',{
                method:"POST",
                body:JSON.stringify({
                    namemarket:inputShopName,
                    locationmarket:inputShopLocation
                }),
                headers:{
                    Authorization: `Bearer ${getcookie}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            if(!postShopName.ok) throw new Error(`Error Post Data:${postShopName.status}`)
            const response = await postShopName.json()
            if(response.statusCode === 200){
                const newData = await getMyMarket()
                setDataMarket(newData)
                setShowInputShopName(false)
                setShowLocation(false)
            }
        }
    }

    const [modelUploadImage, setModelUploadImage] = useState(false)

    const [currentIndex, setCurrentIndex] = useState(0)
    const slideInterval = 3000
    const nextSlide = ()=>setCurrentIndex((prevIndex)=>(prevIndex + 1) % dataImageMarket.picMarket.length)
    // const prevSlide = ()=>{
    //     setCurrentIndex((prevIndex)=>prevIndex === 0 ? dataImageMarket.picMarket.length - 1 : prevIndex -1)
    // }

    useEffect(()=>{
        if(dataImageMarket && dataImageMarket.picMarket.length > 0){
            const interval = setInterval(nextSlide, slideInterval)
            return ()=>clearInterval(interval)
        }
    },[currentIndex])
    

    return(
        <div className="w-full">
            <div className="bg-white rounded-lg shadow-md w-full max-w-full mx-auo overflow-hidden">
                <div 
                    className="flex transition-transform duration-700 relative bg-gray-200 w-full"
                >
                    {dataImageMarket && dataImageMarket.picMarket.length > 0 ?(
                    <div 
                        className="flex w-full transition-transform"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`
                        }}
                    >
                        {dataImageMarket.picMarket.map((image:any, index:number)=>(
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
                    <button 
                        className="absolute bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-800"
                        onClick={()=>setModelUploadImage(true)}
                    >
                      <FontAwesomeIcon icon={faShop}/> เพิ่มรูปหน้าร้าน
                    </button>
                </div>
                <div className="relative flex items-center -mt-10 px-6 w-100">
                    <div style={{width:'200px',height:'170px'}} className="relative rounded-full overflow-hidden border-4 border-white">
                        <Image 
                            alt="profile"
                            src={getprofile.Photo ?  `http://localhost:3001/${getprofile.Photo?.path}` : "/images/default-profile.jpg"}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="ml-4 w-full">
                        <div className="flex w-full">
                            <div className="w-full flex flex-row mx-7 mt-4 gap-2">
                                <span className="text-xl font-semibold">
                                    <FontAwesomeIcon icon={faShop}/>
                                </span>
                                { showInputShopName ? (
                                    <div className="flex w-1/3 mx-2">
                                        <input 
                                            type="text" 
                                            value={inputShopName}
                                            onChange={(e)=>setInputShopName(e.target.value)}
                                            placeholder="ชื่อ ร้านค้า"
                                            className={`block py-2 px-0 w-full font-bold text-xs text-gray-900 bg-transparent border-0 border-b-2 appearance-none ${error.shopname ? "border-red-400" : "border-gray-300"}`}
                                        />
                                    </div>
                                ):(
                                    <span className="w-1/3 text-xl font-semibold mx-2 mb-2">
                                        {dataMarket?.nameMarket != "" ? dataMarket?.nameMarket : "ยังไม่ระบุ"} 
                                    </span>
                                )}
                                <div className="ml-5">
                                    <FontAwesomeIcon 
                                        icon={showInputShopName ? faXmark :faPenToSquare} 
                                        style={{fontSize:'20px',width:'20px'}} 
                                        className={`text-sm mx-4 ${showInputShopName ? "text-dark-400 hover:text-dark-700" : "text-orange-400 hover:text-orange-700"}`}
                                        onClick={()=>setShowInputShopName(!showInputShopName)}
                                    />
                                    {showInputShopName 
                                    ? <FontAwesomeIcon icon={faCheck}
                                            style={{fontSize:'22px',width:'22px'}} 
                                            className="text-sm text-dark-700 ml-auto mx-4 text-green-400 hover:text-green-700"
                                            onClick={handleSubmitShopName}
                                      />
                                    :null}
                                </div>
                            </div>
                            <div className=""></div>
                        </div>
                        <div className="flex w-full">
                            <div className="w-full flex flex-row mx-7">
                                <span className="text-xl font-semibold">
                                    <FontAwesomeIcon icon={faLocationDot} />
                                </span>
                                {
                                    showLocation 
                                    ? (
                                        <div className="flex w-3/4 mx-2">
                                            <input 
                                                type="text" 
                                                name="address"
                                                value={inputShopLocation.address}
                                                onChange={handleChange}
                                                placeholder="address"
                                                className={`mx-2 block py-2 px-0 md:w-full w-1/5 font-bold text-xs text-gray-900 bg-transparent border-0 border-b-2 appearance-none ${error.shopname ? "border-red-400" : "border-gray-300"}`}
                                            />
                                            <input 
                                                type="text" 
                                                name="subdistrict"
                                                value={inputShopLocation.subdistrict}
                                                onChange={handleChange}
                                                placeholder="subdistrict"
                                                className={`mx-2 block py-2 px-0 md:w-1/2 w-1/5 font-bold text-xs text-gray-900 bg-transparent border-0 border-b-2 appearance-none ${error.shopname ? "border-red-400" : "border-gray-300"}`}
                                            />
                                            <input 
                                                type="text" 
                                                name="district"
                                                value={inputShopLocation.district}
                                                onChange={handleChange}
                                                placeholder="district"
                                                className={`mx-2 block py-2 px-0 md:w-1/2 w-1/5 font-bold text-xs text-gray-900 bg-transparent border-0 border-b-2 appearance-none ${error.shopname ? "border-red-400" : "border-gray-300"}`}
                                            />
                                            <input 
                                                type="text" 
                                                name="province"
                                                value={inputShopLocation.province}
                                                onChange={handleChange}
                                                placeholder="province"
                                                className={`mx-2 block py-2 px-0 md:w-1/2 w-1/5 font-bold text-xs text-gray-900 bg-transparent border-0 border-b-2 appearance-none ${error.shopname ? "border-red-400" : "border-gray-300"}`}
                                            />
                                            <input 
                                                type="text"
                                                name="zipcode"
                                                value={inputShopLocation.zipcode}
                                                onChange={handleChange}
                                                placeholder="zipcode"
                                                className={`mx-2 block py-2 px-0 md:w-1/2 w-1/5 font-bold text-xs text-gray-900 bg-transparent border-0 border-b-2 appearance-none ${error.shopname ? "border-red-400" : "border-gray-300"}`}
                                            />
                                        </div>
                                    ):(
                                        getmymarket && getmymarket?.locationMarket[0]?.address !== "" ? (
                                        <>
                                            <span className="text-xl font-semibold ml-4 mr-2">{ dataMarket?.locationMarket[0]?.address}</span>
                                            <span className="text-xl font-semibold mx-2">{ dataMarket?.locationMarket[0]?.subdistrict }</span>
                                            <span className="text-xl font-semibold mx-2">{ dataMarket?.locationMarket[0]?.district}</span>
                                            <span className="text-xl font-semibold mx-2">{ dataMarket?.locationMarket[0]?.province }</span>
                                            <span className="text-xl font-semibold mx-2">{ dataMarket?.locationMarket[0]?.zipcode}</span>
                                        </>
                                        ):<span className="text-xl font-semibold ml-4 mr-2">ยังไม่ระบุ</span>
                                    )
                                }

                                <div className="ml-5 flex">
                                    <FontAwesomeIcon 
                                        icon={showLocation ? faXmark :faPenToSquare} 
                                        style={{fontSize:'20px',width:'20px'}} 
                                        className={`text-sm mx-4 ${showLocation ? "text-dark-400 hover:text-dark-700" : "text-orange-400 hover:text-orange-700"}`}
                                        onClick={()=>setShowLocation(!showLocation)}
                                    />
                                    {showLocation 
                                    ? <FontAwesomeIcon icon={faCheck}
                                            style={{fontSize:'22px',width:'22px'}} 
                                            className="text-sm text-dark-700 ml-auto mx-4 text-green-400 hover:text-green-700"
                                            onClick={handleSubmitShopName}
                                      />
                                    :null}
                                </div>
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

            <div className="bg-white w-full max-w-full mx-auo overflow-hidden mt-4">
                <ul className="grid grid-flow-col text-center border-b border-gray-200 text-gray-500">
                    <li>
                    <a 
                        className={`flex justify-center border-b-4 border-transparent ${isTab === "tab1" && "text-indigo-600 border-indigo-600"} hover:text-indigo-600 hover:border-indigo-600 py-4`}
                        onClick={()=>setIsTab('tab1')}
                    >Dashbord</a>
                  </li>
                  <li>
                    <a 
                        className={`flex justify-center border-b-4 border-transparent ${isTab === "tab2" && "text-indigo-600 border-indigo-600"} hover:text-indigo-600 hover:border-indigo-600 py-4`}
                        onClick={()=>setIsTab('tab2')}
                    >รายการสินค้าที่ขาย</a>
                  </li>
                  <li>
                    <a 
                        className={`flex justify-center border-b-4 border-transparent ${isTab === "tab3" && "text-indigo-600 border-indigo-600"} hover:text-indigo-600 hover:border-indigo-600 py-4`}
                        onClick={()=>setIsTab('tab3')}
                    >รายการสินค้าที่ต้องจัดส่ง</a>
                  </li>
                  <li>
                    <a 
                        className={`flex justify-center border-b-4 border-transparent ${isTab === "tab4" && "text-indigo-600 border-indigo-600"} hover:text-indigo-600 hover:border-indigo-600 py-4`}
                        onClick={()=>setIsTab('tab4')}
                    >สินค้าที่ส่งเรียบร้อย</a>
                  </li>
                  <li>
                    <a 
                        className={`flex justify-center border-b-4 border-transparent ${isTab === "tab5" && "text-indigo-600 border-indigo-600"} hover:text-indigo-600 hover:border-indigo-600 py-4`}
                        onClick={()=>setIsTab('tab5')}
                    >สินค้าที่ถูกตีกลับ</a>
                  </li>
                </ul>

                <div className="relative overflow-x-auto mt-2">
                    {isTab === "tab1" && <DashbordPage />}
                    {isTab === "tab2" && <ProductPage />}
                    {isTab === "tab3" && <ListItemBeShipped/>}
                    {isTab === "tab4" && <ListAlreadtShipped/>}
                    {isTab === "tab5" && <ListReturnProduct/>}
                </div>
            </div>
            {modelUploadImage ? <EditImageMarket setModelUploadImage={setModelUploadImage} setDataImageMarket={setDataImageMarket} dataImageMarket={dataImageMarket} toast={toast} /> : null}
            <ToastContainer position="top-center" />
        </div>
    )
}
export default Mymarket;