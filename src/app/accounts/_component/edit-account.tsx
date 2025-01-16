"use client";
import React,{useState,ChangeEvent, FormEvent} from "react"
import PreviewImage from "@/components/previewImg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import Select from "react-select"
import { useAuth } from "@/untils/AuthProvider";
import { OrtherFunction } from "@/common/orther.fn";


export function loopDay(){
    let pushDay:any = [];
    for(let i=1; i < 32;i++){
         pushDay.push({value:i,label:i})
    }
    return pushDay;
}
export interface selectOption {
    readonly value:string;
    readonly label:string;
}

export const Gender:readonly selectOption[] = [
    {value:"male",label:"male"},
    {value:"famale",label:"famale"},
    {value:"orther",label:"orther"}
]
export const Days:readonly selectOption[] = loopDay();
export const Month:readonly selectOption[] = [
    {value:"1",label:"มกราคม"},
    {value:"2",label:"กุมภาพันธ์"},
    {value:"3",label:"มีนาคม"},
    {value:"4",label:"เมษายน"},
    {value:"5",label:"พฤษภาคม"},
    {value:"6",label:"มิถุนายน"},
    {value:"7",label:"กรกฎาคม"},
    {value:"8",label:"สิงหาคม"},
    {value:"9",label:"กันยายน"},
    {value:"10",label:"ตุลาคม"},
    {value:"11",label:"พฤศจิกายน"},
    {value:"12",label:"ธันวาคม"},
]

export default function EditAccount({...prop}){
    const ortherFunction = new OrtherFunction
    const {getcookie,getprofile} = useAuth()
    const [image, setImage]:any = useState<File | null>(null)
    const [forms, setForms]:any = useState({
        firstname:getprofile.Profile?.firstname ?? '',
        lastname:getprofile.Profile?.lastname ?? '',
    })
    const [day,setDay]:any = useState(getprofile.Account?.day ?? null)
    const [month, setMonth]:any = useState(getprofile.Account?.month ?? null)
    const [year, setYear]:any = useState(getprofile.Account?.year ?? "")
    const [gender, setGender]:any = useState(getprofile.Account?.gender ?? null)
    const [loading,setLoading] = useState(false)
    const [test,setTest] = useState(getprofile)
    const [error,setError] = useState({
        firstname:false,
        lastname:false
    })
       const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
            const {name, value} = e.target
            setForms({
                ...forms,
                [name]:value
            })
        }
    const handleEditAccount = async (e:FormEvent)=>{
        e.preventDefault()
        setLoading(true)
        try{
            let formData = new FormData();
            formData.append('file',image)
            formData.append('firstname',forms.firstname)
            formData.append('lastname',forms.lastname)
            formData.append('gender',gender)
            formData.append('day',day)
            formData.append('month',month)
            formData.append('year',year)

            for (const [key, value] of formData.entries()) {
                console.log(`x :${key}:`, value);
            }
            const response = await fetch('http://localhost:3001/users/manage-account',{
                method:"POST",
                body:formData,
                headers:{
                    Authorization: `Bearer ${getcookie}`,
                    //"Content-Type": "multipart/form-data"
                },
                credentials: 'include'
            })
            if(!response.ok) throw new Error(`Fetch Data Is Not Ok : ${response.status}`)
            const responseJson = await response.json()
            if(responseJson.statusCode === 201){
                prop.setModelEditAccount(false)
            }else{
                ortherFunction.showToastMessage("error","Failed Is Not Update Account")
            }

        }catch(e){
            throw new Error(`Is Error:${e}`)
        }finally{
            setLoading(false)
        }
    }

    return (
        <div 
            tabIndex={-1}
            className="fixed left-0 right-0 top-0 z-50 h-[calc(90%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden flex items-center justify-center p-4 md:inset-0"
        >
            <div className="relative p-4 w-full max-w-3xl max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="p-4 md:p-5 space-y-4">
                        <div className="w-full flex flex-row">
                            <span className="">Edit Account</span>
                            <button 
                                type="button" 
                                className="ml-auto end-2.5 text-dark-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                onClick={()=>prop.setModelEditAccount(false)}
                            >
                                <FontAwesomeIcon icon={faXmark} className="h-5 w-5 text-dark-500"/>
                            </button>
                        </div>
                        <form className="flex flex-row w-full gap-2" noValidate onSubmit={handleEditAccount}>
                            <div className="w-1/4 items-center flex">
                                <PreviewImage setImageState={setImage} isImage={image} setHight={'180px'} imageProfile={getprofile.Photo}/>
                            </div>
                            <div className="w-3/4">
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div className="">
                                        <label htmlFor="firstname" className="text-xs">ชื่อ</label>
                                        <input 
                                            id="firstname"
                                            type="text" 
                                            name="firstname"
                                            placeholder="กรอก ชื่อ" 
                                            className={`bg-gray-50 border ${error.firstname ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2`}
                                            value={forms.firstname}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="">
                                        <label htmlFor="lastname" className="text-xs">นามสกุล</label>
                                        <input 
                                            id="lastname"
                                            type="text"
                                            name="lastname"
                                            placeholder="กรอก นามสกุล"
                                            className={`bg-gray-50 border ${error.lastname ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2`}
                                            value={forms.lastname}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label htmlFor="birthday" className="text-xs">วันเกิด</label>
                                    <div className="flex gap-2">
                                        <Select  
                                            className="basic-single rounded w-1/4"
                                            classNamePrefix="select"
                                            defaultValue={{value:day ?? "",label:day ?? "วันที่"}}
                                            options={Days}
                                            onChange={(e)=>{
                                                setDay(e?.value)
                                            }}name="day"
                                            id="birthday"
                                            isClearable
                                        />
                                         <Select  
                                            className="basic-single rounded w-2/4"
                                            classNamePrefix="select"
                                            defaultValue={{value:month ?? "",label:month ? ortherFunction.getMonth(month) : "เดือน"}}
                                            options={Month} 
                                            onChange={(e)=>{
                                                setMonth(e?.value)
                                            }}
                                            name="month"
                                            isClearable
                                        />
                                        <input 
                                            type="number" name="year" 
                                            placeholder="ปี" 
                                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2 w-1/4`} 
                                            value={year}
                                            onChange={(e)=>setYear(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="w-full flex">
                                    <div className="w-1/3">
                                        <label htmlFor="gender" className="text-xs">เพศ</label>
                                        <Select 
                                            options={Gender}
                                            defaultValue={{value:gender ?? "",label:gender ?? "เลือก"}}
                                            className="basic-single rounded"
                                            classNamePrefix="select"
                                            id="gender"
                                            onChange={(e)=>{
                                                setGender(e?.value)
                                            }}
                                            name="gender"
                                            isClearable
                                        />
                                    </div>
                                    <div className="w-2/3 p-3 mt-4 flex justify-center">
                                        <span className="font-bold text-sm w-full mr-auto mt-2">email : {ortherFunction.formatEmail(getprofile.Profile?.email)}</span>
                                        {/* <span className="font-bold text-sm w-full ml-auto mt-2">phone :  {getprofile?.phone}</span> */}
                                    </div>
                                </div>
                                <div className="w-full flex">
                                    <button type="submit" className="ml-auto px-4 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                        แก้ไข
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}