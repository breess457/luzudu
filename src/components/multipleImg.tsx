"use client";
import { faFile, faFileImage, faUpload, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react"
import Swal from "sweetalert2";

export const RenderUPloadImage = ({...prop})=>{
  function deleteFile(indexImg:any) {
    const updatedList = prop.ownerLicense.filter((ele:any, index:number) => index !== indexImg);
    prop.setOwnerLicense(updatedList);
  }
  return (
    <>
    {prop.ownerLicense.map((img:any, index:number) => (
        <div className="w-full px-3 py-1 rounded-md bg-slate-200 space-y-3" key={index}>
          <div className="flex justify-between">
            <div className="w-[70%] flex justify-start items-center space-x-2">
              <div
                className="text-[#5E62FF] text-[37px] cursor-pointer"
                onClick={() => prop.showImages(img.photo)}
              >
                {img.type.match(/image.*/i) ? (
                  <>
                      {/* <FontAwesomeIcon icon={faFileImage} /> */}
                      <Image 
                          src={img.photo} width={100} height={100}
                          alt={`Index : ${index}`} 
                          style={{
                              backgroundSize:"cover",
                              width:"70px",
                              height:"70px",
                              backgroundAttachment:"fixed",
                              backgroundRepeat:"no-repeat",
                              objectFit:"cover"
                          }}
                      />
                  </>
                ) : (
                  <FontAwesomeIcon icon={faFile} />
                )}
              </div>
              <div className=" space-y-1">
                <div className="text-xs font-medium text-gray-500">
                  {img.name.slice(0,10)}
                </div>
                <div className="text-[10px] font-medium text-gray-400">{`${Math.floor(
                  img.size / 1024
                )} KB`}</div>
              </div>
            </div>
            <div className="flex-1 flex justify-end">
              <div className="space-y-1">
                <div
                  className="text-gray-500 text-[17px] cursor-pointer"
                  onClick={() => deleteFile(index)}
                >
                  <FontAwesomeIcon icon={faXmark} className="ml-auto"/>
                </div>
                <div className="text-[10px] font-medium text-gray-400">
                  Done
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export const RenderImageDefault = ({...props})=>{
  function deleteDefaultFile(imagename:string){
    const updateData = props.getPicMarket.filter((item:any)=>item.filename !== imagename)
    props.setFileMarkets(updateData)
    props.setGetImageNameMarkets((prew:any)=>[...prew,imagename])
  }
  return(
  <>
      {props.getPicMarket.map((img:any,i:number)=>(
          <div className="w-full px-3 py-1 rounded-md bg-slate-200 space-y-3" key={i}>
            <div className="flex justify-between">
              <div className="w-[70%] flex justify-start items-center space-x-2">
                <div
                  className="text-[#5E62FF] text-[37px] cursor-pointer"
                  onClick={() => props.showImages(`http://localhost:3001/upload/photomarket/${img.filename}`)}
                >
                  <Image
                    src={`http://localhost:3001/upload/photomarket/${img.filename}`}
                    width={100} height={100}
                    alt={"default Img "+i}
                    style={{
                      backgroundSize:"cover",
                      width:"70px",
                      height:"70px",
                      backgroundAttachment:"fixed",
                      backgroundRepeat:"no-repeat",
                      objectFit:"cover"
                  }}
                  />
                </div>
                <div className=" space-y-1">
                  <div className="text-xs font-medium text-gray-500">
                    {img.filename.slice(0,10)}
                  </div>
                  <div className="text-[10px] font-medium text-gray-400">
                      รูปปัจจุบัน
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-end">
                 <div className="space-y-1">
                   <div
                     className="text-gray-500 text-[17px] cursor-pointer"
                     onClick={() => deleteDefaultFile(img.filename)}
                   >
                     <FontAwesomeIcon icon={faXmark} className="ml-auto"/>
                   </div>
                   <div className="text-[10px] font-medium text-gray-400">
                     Done
                   </div>
                 </div>
               </div>
            </div>
          </div>
      ))}
  </>)
}

export default function MultipleImage({
    count,formats,setPicMarket,picMarket,getPicMarket,fileMarket,setFileMarket,getImageNameMarket,setGetImageNameMarket
}:any){
        const [ownerLicense, setOwnerLicense] = useState<File[]>([]);
        function uploadFiles(f:any) {
          setOwnerLicense([...ownerLicense, ...f]);
        }
      
        
    const dropContainer:any = useRef(null)
    const [dragging, setDragging] = useState(false)
    const fileRef:any = useRef(null)
    const handleDrop = (e:any,type:any)=>{
        let files;
        if(type === "inputFile"){
            files = [...e.target.files];
            setPicMarket([...picMarket,...e.target.files])
        }else{
            e.preventDefault()
            e.stopPropagation();
            setDragging(false);
            files = [...e.dataTransfer.files];
        }
        const allFilesValid = files.every((file) => {
            return formats.some((format:any) => file.type.endsWith(`/${format}`));
        });
        if (ownerLicense.length >= count) {
          showAlert(
            "warning",
            "Maximum Files",
            `Only ${count} files can be uploaded`
          );
          return;
        }
        if (!allFilesValid) {
            showAlert(
              "warning",
              "Invalid Media",
              `Invalid file format. Please only upload ${formats
                .join(", ")
                .toUpperCase()}`
            );
            return;
        }
        if (count && count < files.length) {
            showAlert(
              "error",
              "Error",
              `Only ${count} file${count !== 1 ? "s" : ""} can be uploaded at a time`
            );
            return;
        }
        if (files && files.length) {
            const nFiles = files.map(async (file) => {
              const base64String = await convertFileBase64(file);
              return {
                name: file.name,
                photo: base64String,
                type: file.type,
                size: file.size
              };
            });
      
            Promise.all(nFiles).then((newFiles) => {
              uploadFiles(newFiles);
              TopNotification.fire({
                icon: "success",
                title: "Image(s) uploaded"
              });
            });
        }
    }
    async function convertFileBase64(file:any) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.onerror = (error) => {
            reject(error);
          };
        });
    }
    useEffect(()=>{
        function handleDragOver(e:any) {
            e.preventDefault();
            e.stopPropagation();
            setDragging(true);
        }
        function handleDragLeave(e:any) {
            e.preventDefault();
            e.stopPropagation();
            setDragging(false);
        }
        dropContainer.current.addEventListener("dragover", handleDragOver);
        dropContainer.current.addEventListener("drop", handleDrop);
        dropContainer.current.addEventListener("dragleave", handleDragLeave);

        return () => {
            if (dropContainer.current) {
              dropContainer.current.removeEventListener("dragover", handleDragOver);
              dropContainer.current.removeEventListener("drop", handleDrop);
              dropContainer.current.removeEventListener("dragleave", handleDragLeave);
            }
        };
    },[ownerLicense])

    const TopNotification = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        }
    });
    function showAlert(icon:any, title:string, text:string) {
        Swal.fire({
          icon: icon,
          title: title,
          text: text,
          showConfirmButton: false,
          width: 500,
          timer: 1500
        });
    }
    function showImage(image:any) {
      Swal.fire({
        imageUrl: image,
        showCloseButton: true,
        showConfirmButton: false,
        width: 450
      });
    }

    return (
        <>
          <div
          className={`${
            dragging
              ? "border border-[#2B92EC] bg-[#EDF2FF]"
              : "border-dashed border-[#e0e0e0]"
          } flex items-center justify-center mx-auto text-center border-2 rounded-md mt-4 py-5`}
          ref={dropContainer}
        >
          <div className="flex-1 flex flex-col">
            <div className="mx-auto text-gray-400 mb-2">
              <FontAwesomeIcon icon={faUpload} style={{fontSize:"18px"}}/>
            </div>
            <div className="text-[12px] font-normal text-gray-500">
              <input
                className="opacity-0 hidden"
                type="file"
                multiple
                accept="image/*"
                ref={fileRef}
                onChange={(e) => handleDrop(e, "inputFile")}
              />
              <span
                className="text-[#4070f4] cursor-pointer"
                onClick={() => {
                  fileRef.current.click();
                }}
              >
                Click to upload
              </span>{" "}
              or drag and drop
            </div>
            <div className="text-[10px] font-normal text-gray-500">
              Only two files PNG, JPG or JPEG
            </div>
          </div>
        </div>
        
        
          <div className="mt-4 grid grid-cols-2 gap-y-4 gap-x-4">
            {fileMarket.length > 0 && (
              <RenderImageDefault 
                  getPicMarket={fileMarket} 
                  setFileMarkets={setFileMarket}
                  showImages={showImage}
                  getImageNameMarkets={getImageNameMarket}
                  setGetImageNameMarkets={setGetImageNameMarket}
              />
            )}
            {ownerLicense.length > 0 && (
              <RenderUPloadImage 
                  ownerLicense={ownerLicense} 
                  setOwnerLicense={setOwnerLicense} 
                  showImages={showImage}
              />
            )}
          </div>
      </>
    )
}