"use client";
import MultipleImage from "@/components/multipleImg";
import { useState } from "react";


export default function CreateOrderPage({...props}){
    const [getImageProduct, setGetImageProduct] = useState<[]>([])
    const [picProduct, setPicProduct] = useState<File[]>([]);
    const [fileProduct,setFileProduct] = useState<[]>([])
    return (
        <div className="flex">
            <div className="w-full lg:w-1/3">
                <MultipleImage 
                    count={10}
                    formats={["jpg", "jpeg", "png", "webp", "avif"]}
                    setGetImageName={setGetImageProduct}
                    getImageName={getImageProduct}
                    fileMarket={fileProduct}
                    setFileMarket={setFileProduct}
                    getPic={[]}
                    setPic={setPicProduct}
                    pic={picProduct}
                />
            </div>
            <div className="w-full lg:w-2/3">
                
            </div>
        </div>
    )
}