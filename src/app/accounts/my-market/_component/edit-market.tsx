"use client";
import React,{FormEvent, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import MultipleImage from "@/components/multipleImg";
import { useAuth } from "@/untils/AuthProvider";
export default function EditImageMarket({...prop}){
    const {getcookie,getmymarket,getImageMarket} = useAuth()
    //let numImgdefult:number = getImageMarket.picMarket.length
    const [picMarket, setPicMarket] = useState<File[]>([]);
    const [fileMarket, setFileMarket] = useState<[]>(getImageMarket.picMarket ?? [])
    const [getImageNameMarket, setGetImageNameMarket] = useState<[]>([])
    console.log({getImageNameMarket})
    const onUploadImageMarket = async (e:FormEvent)=>{
        e.preventDefault()
        
            const formData = new FormData();
            for(let i = 0; i < picMarket.length; i++){
                formData.append('marketimages',picMarket[i])
            }
            for(let x=0; x < getImageNameMarket.length;x++){
                formData.append('datawilltrash',getImageNameMarket[x])
            }
            for (const [key, value] of formData.entries()) {
                console.log(`x :${key}:`, value);
            }
        try{
            const response = await fetch('http://localhost:3001/markets/uploadimagemarket',{
                method:"POST",
                headers:{
                    Authorization: `Bearer ${getcookie}`,
                    //"Content-Type": "multipart/form-data"
                },
                credentials: 'include',
                body:formData
            })
            if(!response.ok) throw new Error(`Fetch Error Status:${response.status}`)
            console.log("status : ",response.status)
            const resultdata = await response.json()
            console.log(resultdata)
        }catch(e){
            console.log(`Is Error : ${e}`)
        }

    }
    return(
        <div 
        tabIndex={-1}
        className="fixed left-0 right-0 top-0 z-50 h-[calc(90%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden flex items-center justify-center p-4 md:inset-0"
    >
        <div className="relative p-4 w-full max-w-xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
                <div className="p-4 md:p-5 space-y-4">
                    <div className="w-full flex flex-row">
                        <span className="">Edit Account</span>
                        <button 
                            type="button" 
                            className="ml-auto end-2.5 text-dark-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            onClick={()=>prop.setModelUploadImage(false)}
                        >
                            <FontAwesomeIcon icon={faXmark} className="h-5 w-5 text-dark-500"/>
                        </button>
                    </div>
                    <div className="w-full">
                         <MultipleImage
                            count={5 - fileMarket.length}
                            formats={["jpg", "jpeg", "png"]}
                            setPicMarket={setPicMarket}
                            picMarket={picMarket}
                            getPicMarket={getImageMarket.picMarket}
                            fileMarket={fileMarket} 
                            setFileMarket={setFileMarket}
                            getImageNameMarket={getImageNameMarket} 
                            setGetImageNameMarket={setGetImageNameMarket}
                        />
                    </div>
                    <div className="w-full flex flex-col mt-4">
                        <button 
                            className="ml-auto px-4 py-2 text-md font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300"
                            type="button"
                            onClick={onUploadImageMarket}
                        >
                            upload image market
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}