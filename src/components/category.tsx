
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faShirt } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"

interface ImageData{
    src:string
    name:string
}
const images:ImageData[]=[
    {src:"/images/bag.webp",name:"กระเป๋า"},
    {src:"/images/fya3wi.png",name:"เครื่องใช้"},
    {src:"/images/game.webp",name:"เกมส์"},
    {src:"/images/phone.jpg",name:"โทรสับมือถือ"},
    {src:"/images/t-cook.png",name:"เครื่องครัว"},
    {src:"/images/trousers.png",name:"กางเกง"},
    {src:"/images/t-shirt.png",name:"เสื้อผ้า"},
    {src:"/images/sneaker.webp",name:"รองเท้า"}
]

export default function Category(){
    return (
        <>
            {images.map((img,i)=>(
            <div className="min-w-[170px] flex p-3 m-1 bg-white border text-center border-gray-200 rounded-lg shadow" key={i}>
                <Image width={100} height={100} alt={img.name} src={img.src} style={{
                        width:"55px",
                        height:"40px"
                    }} 
                    className="object-cover"
                />
                <span className=" flex-1 h-full flex items-center justify-center text-center font-semibold">{img.name}</span>
            </div>
            ))}
        </>
    )
}