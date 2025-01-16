"use client";
import React,{useState,useEffect} from 'react';
import Image from 'next/image';
import { ChevronLeft,ChevronRight } from 'lucide-react';

interface ImageData{
    src:string;
}
const images:ImageData[]=[
    { src:"/images/img-1.avif" },
    { src:"/images/img-2.avif" },
    { src:"/images/img-3.avif" },
    { src:"/images/img-4.avif" },
    { src:"/images/img-5.avif" },
]

export default function Carousel(){
    const [currentIndex,setCurrentIndex] = useState<number>(0)
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const prevSlide = (): void => {
        setCurrentIndex(
          (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };
    const nextSlide = (): void => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    useEffect(()=>{
        if(!isHovered){
            return ()=>{
                    clearInterval(setInterval(()=>{
                    nextSlide();
                },3000))
            }
        }
    },[isHovered])
    const handleMouseOver = ():void=>{
        setIsHovered(true)
    }
    const handleMouseLeave = ():void=>{
        setIsHovered(false)
    }
    return (
        <div className='relative w-full mx-auto mt-4'>
            <div 
                className='relative h-[200px] md:h-[360px] group'
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
            >
                
                <Image 
                    src={images[currentIndex].src} 
                    alt={`Slider Image ${currentIndex + 1}`}
                    layout='fill'
                    objectFit='cover'
                    className="-translate-x ease-in-out w-full cursor-pointer object-cover"
                />
                
            </div>
            <button
                className="absolute left-0 top-1/2 transform h-auto rounded-xl mx-1 -mt-[10px] -translate-y-1/2 bg-none text-white p-2 group"
                onClick={prevSlide}
            >
                <ChevronLeft className="text-black-400 hover:text-black" />
            </button>
            <button
              className="absolute right-0 top-1/2 transform h-auto rounded-xl mx-1 -mt-[10px] -translate-y-1/2 bg-none text-white p-2 group"
              onClick={nextSlide}
            >
              <ChevronRight className="text-black-400 group-hover:text-black" />
            </button>
            <div className="relative flex justify-center top-3">
                {images.map((_,index)=>(
                    <div key={index}
                        className={`
                            h-1 w-10 mx-1 
                            ${index === currentIndex ? "bg-[#beff46] rounded-xl" : "bg-gray-300 rounded-xl"}
                            transition-all duration-500 ease-in-out
                        `}
                    ></div>
                ))}
            </div>
        </div>
    )
}