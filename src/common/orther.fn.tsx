import React from "react"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export class OrtherFunction {
    showToastMessage(type:any,message:string){
        console.log({type,message})
        switch(type){
            case "success":
                return toast.success(message,{
                    position:"top-center"
                })
            case "warning":
                return toast.warning(message,{
                    position:"top-center"
                })
            case "error":
                return toast.error(message,{
                    position:"top-center"
                })
            case "info":
                return toast.info(message,{
                    position:"top-center"
                })
            default:
                return toast(message,{
                    position:"top-center"
                })
        }
    }
    getMonth(month:string):string{
        switch (month) {
            case "1":
              return "มกราคม"
            case "2":
              return "กุมภาพันธ์"
            case "3":
              return "มีนาคม"
            case "4":
              return "เมษายน"
            case "5":
              return "พฤษภาคม"
            case "6":
              return "มิถุนายน"
            case "7":
              return "กรกฎาคม"
            case "8":
              return "สิงหาคม"
            case "9":
              return "กันยายน"
            case "10":
              return "ตุลาคม"
            case "11":
              return "พฤศจิกายน"
            case "12":
              return "ธันวาคม"
            default:
              return `${month}`
        }
    }

    formatEmail(email:string){
        const [localPath, domain] = email.split('@')
        const makeLocalPath = localPath.substring(0,2) + "***********"
        return `${makeLocalPath}@${domain}`
    }
}