"use client";
import React, { ChangeEvent, useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloudUpload,faTimes } from "@fortawesome/free-solid-svg-icons"

export default function PreviewImage({...prop}){
    const [img,setImg] = useState(false)

    const setPreview = ()=>{
        let setWrapper:HTMLElement = document.querySelector('.wrapper') as HTMLElement 
        let setImageName:any = document.querySelector('.file-name')
        let cancle:HTMLElement = document.querySelector('.btn-cancle') as HTMLElement
        let Image:HTMLImageElement = document.querySelector('.me-image') as HTMLImageElement
        let defultInput:any = document.querySelector('.set-default-image')
        let setExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
        defultInput.click()

        defultInput.addEventListener("change", (event:ChangeEvent<HTMLInputElement>)=>{
            event.preventDefault()
            const file:any = event.target.files[0]
            if(file){
                const reader = new FileReader()
                reader.onload = ()=>{
                    setImg(true)
                    const result:string = reader.result as string
                    console.log(result)
                    Image.src = result
                    setWrapper?.classList.add('active')
                    
                }
                cancle.addEventListener('click',()=>{
                    setImg(false)
                    Image.src = ""
                    prop.setImageState(null)
                    setWrapper.classList.remove("active")
                    
                })
                reader.readAsDataURL(file)
            }
            if(event.target.value){
                let valueStore = event.target.value.match(setExp);
                setImageName.textContent = valueStore
            }
        })
    }
    useEffect(()=>{
        let UrlImgage:HTMLImageElement = document.querySelector('.me-image') as HTMLImageElement
        let Wrapper:any = document.querySelector('.wrapper') as HTMLElement | null
        let ImageName:any = document.querySelector('.file-name')
        if(prop.imageProfile?.filename){
            setImg(true)
                const url_file:string = `http://localhost:3001/upload/profile/${prop.imageProfile?.filename}`
                console.log(url_file)
                UrlImgage.src = url_file
                Wrapper?.classList.add('active')
                ImageName.textContent = prop.imageProfile?.filename
   
        }
   },[prop.imageProfile?.filename])
    return (
        <div className='w-full'>
            <div className="wrapper" id='buttonCustom' onClick={setPreview} style={{
                height:prop.setHight
            }}>
                 <div className="s-image" style={{display:img ? "block" : "none"}}>
                    <img alt="img" className="me-image" />
                </div>
                <div className="m-content">
                    <div className="icons">
                        <FontAwesomeIcon icon={faCloudUpload} />
                    </div>
                    <div className="text-m">อัปโหลดโปรไฟล์</div>
                </div>
                <div className="btn-cancle">
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                <div className="file-name">File name hear</div>
            </div>
            <input type="file" name="" id="" className='set-default-image' accept='image/*'
                 onChange={(e:any) => prop.setImageState(e.target.files[0])} hidden
            />
        </div>

    )
}