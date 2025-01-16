"use client";
import React from "react";

export default function Basket({...props}){
    return(
        <main className={
            "fixed duration-900 overflow-hidden top-0 z-50 bg-gray-900 bg-opacity-25 inset-0 -translate-x-full overflow-y-auto " 
            + (props.isShowBasket
                ? "translate-x-0 opacity-100"
                : "delay-500 opacity-0"
            )
        }>
            <section className={
                "w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl transform "
                + (props.isShowBasket
                    ? "translate-x-0"
                    : "translate-x-full"
                ) 
                + " transition-transform duration-900 ease-in-out"
            }>
                <article className="transform transition-transform relative w-screen max-w-lg flex flex-col space-y-6 overflow-y-scroll h-full">
                    <header className="px-2 pt-2">
                        <span className='font-bold text-lg mb-2'>จำนวนหนังในตะกร้า  เรื่อง</span>
                    </header>
                    <div style={{listStyle:"none",width:"100%",height:"590px",overflow:"auto",borderBottom:"1px solid gray"}}>
                        <span>x</span>
                    </div>
                </article>
            </section>
            <section
                className=" w-screen h-full cursor-pointer transition-opacity"
                onClick={()=> props.setIsShowBasket(false)}
            >
            </section>
        </main>
    )
}