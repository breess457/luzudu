"use client";
// import { cookies } from "next/headers";
import React,{ChangeEvent, FormEvent, useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { setAuthCookie } from "@/untils/SessionProviders";

const Alert = ({...props})=>{
    return (
        <div className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50">
            <div className="sr-only">Info</div>
            <div className="ms-3 text-sm font-medium">
                {props.text}
            </div>
            <button 
                type="button" 
                className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8"
                onClick={()=>props.setClose(false)}
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    )
}

const FormLogin = ({setCloseModel}:any)=>{
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword,setShowPassword] = useState(false)
    const [close,setClose] = useState(false)

    const [error, setError] = useState({
        email:false,
        password:false
    })
    const handleFormSignup = async (e:any)=>{
        e.preventDefault()
        try{
            setError({
                email: !email,
                password:!password
            })
            const response = await fetch('http://localhost:3001/users/login',{
                method:"POST",
                body:JSON.stringify({
                   email:email,
                   password:password
                }),
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'        
                },
            })
            if(!response.ok) throw new Error(`Error status: ${response.status}`)
            const result = await response.json()
            if(result.statusCode === 201){
                await setAuthCookie(result)
                 console.log("success")
                 setClose(false)
                 setCloseModel(false)
            }else{
                 setClose(true)
                 console.log("false")
            }
        }catch(e){
            console.log(e)
        }
    }
    return (
        <form noValidate className="space-y-4 mx-4" onSubmit={handleFormSignup}>
            {close ? <Alert text={"email หรือ password ไม่ถูกต้อง"} setClose={setClose} /> : null}
            <div className="">
                <input 
                    type="email" 
                    placeholder="Please enter your email" 
                    className={`bg-gray-50 border ${error.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required 
                />
            </div>
            <div className="">
                <div className="relative">
                <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Please enter your password" 
                    className={`bg-gray-50 border ${error.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required 
                />
                <button 
                    type="button" onClick={()=>setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </button>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input type="checkbox" name="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" id="" />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900">Remember me</label>
                </div>
                <Link href={"#"} className="text-sm text-blue-700 hover:underline">Lost Password?</Link>
            </div>
            <button type="submit" className="uppercase w-full text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-bold rounded-lg text-lg px-5 py-2 text-center">Login</button>
        </form>
    )
}

const FormRegister = ({setCloseModel}:any)=>{
    const [formSignup, setFormSignup] = useState({
        firstName:'',
        lastName:'',
        phone:'',
        email:'',
        password:''
    })

    const [error, setError] = useState({
        firstName:false,
        lastName:false,
        phone:false,
        email:false,
        password:false,
    })
 
    const [errorConfirm, setErrorConfirm] = useState({status:false,style:""})

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target
        setFormSignup({
            ...formSignup,
            [name]:value
        })
    }


    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const [close,setClose] = useState(false)

    const handleFormSignup = async (e:FormEvent)=>{
        e.preventDefault()
        try{
            setError({
                firstName:!formSignup.firstName,
                lastName:!formSignup.lastName,
                phone:!formSignup.phone,
                email:!formSignup.email,
                password:!formSignup.password
            })
            if(formSignup.password === confirmPassword){
                setErrorConfirm({status:false,style:"border-gray-500"})
                 const responseFetch = await fetch(`http://localhost:3001/users/signup`,{
                     method:"POST",
                     body:JSON.stringify({
                        firstname:formSignup.firstName,
                        lastname:formSignup.lastName,
                        phone:formSignup.phone,
                        email:formSignup.email,
                        password:formSignup.password
                     }),
                     credentials: 'include',
                     headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'        
                    },
                 })
                 if(!responseFetch.ok) throw new Error(`Response status: ${responseFetch.status}`)
                 
                 const resJson = await responseFetch.json()
                 if(resJson.statusCode === 201){
                    await setAuthCookie(resJson)
                    setClose(false)
                    setCloseModel(false)
                 }else{
                     setClose(true)
                 }
            }else{
                setErrorConfirm({status:true,style:"border-red-500"})
            }
        }catch(e){
            console.log("err : ",e)
        }
    
    }
    return (
        <form noValidate onSubmit={handleFormSignup} className="space-y-4 mx-4">
            {close ? <Alert text={"user have"} setClose={setClose} /> : null}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input 
                    type="text" 
                    name="firstName"
                    placeholder="กรอก ชื่อ" 
                    className={`bg-gray-50 border ${error.firstName ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                    value={formSignup.firstName}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="text"
                    name="lastName"
                    placeholder="กรอก นามสกุล"
                    className={`bg-gray-50 border ${error.lastName ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                    value={formSignup.lastName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="">
                <input 
                    type="text" 
                    name="phone"
                    placeholder="กรอก เบอร์โทร" 
                    className={`bg-gray-50 border ${error.phone ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                    value={formSignup.phone}
                    onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                        const inputValue = e.target.value;
                        if(/^\d*$/.test(inputValue)){
                            setFormSignup({
                                ...formSignup,
                                ['phone']:inputValue
                            })
                        }
                    }}
                    required 
                />
            </div>
            <div className="">
                <input 
                    type="email" 
                    name="email"
                    placeholder="Please enter your email" 
                    className={`bg-gray-50 border ${error.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                    value={formSignup.email}
                    onChange={handleChange}
                    required 
                />
            </div>
            <div className="">
                <div className="relative">
                <input 
                    type={showPassword ? "text" : "password"} 
                    name="password"
                    placeholder="Please enter your password" 
                    className={`bg-gray-50 border ${error.password ? 'border-red-500' : `border-gray-300 ${errorConfirm.style}`} text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-3`}
                    value={formSignup.password}
                    onChange={handleChange}
                    required 
                />
                <button 
                    type="button" onClick={()=>setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                >
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </button>
                </div>
            </div>
            <div className="">
                <div className="relative">
                    <label htmlFor="confirm password" className={`flex w-full text-sm mt-0`}>confirm password {errorConfirm.status ? <span className="ml-auto mx-4 text-red-600 font-bold">รหัสผ่านไม่ตรง</span> : null}</label>
                    <input 
                        type={showConfirmPassword ? "text" : "password"} 
                        placeholder="Please Confirm Password" 
                        className={`bg-gray-50 border border-gray-300 text-sm ${errorConfirm.style} focus:ring-blue-500 focus:border-blue-500 block w-full p-3`} 
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        required 
                    />
                    <button 
                        type="button" onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 top-2/3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
                    >
                        <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                    </button>
                </div>
            </div>
            <button type="submit" className="uppercase w-full text-white bg-orange-500 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-bold rounded-lg text-lg px-5 py-2 text-center">signup</button>
        </form>
    )
}

export default function Login({...props}){

    return (
    <div 
        id="default-modal" tabIndex={-1}
        className="fixed left-0 right-0 top-0 z-50 h-[calc(90%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden flex items-center justify-center p-4 md:inset-0"
    >
        <div className="relative p-4 w-full max-w-xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="p-4 md:p-5 space-y-4">
                        <div className="w-full flex flex-row">
                            <div className="flex mx-4">
                                <p 
                                    className={`font-bold uppercase hover:text-blue-800 ${props.typeForm === "login" ? "text-blue-700" : null}`}
                                    onClick={()=>props.setTypeForm("login")}
                                >Login</p>
                                <p className="font-bold uppercase mx-4">/</p>
                                <p 
                                    className={`font-bold uppercase hover:text-blue-800 ${props.typeForm === "signup" ? "text-blue-700" : null}`}
                                    onClick={()=>props.setTypeForm("signup")}
                                >signup</p>
                            </div>
                            <button 
                                type="button" 
                                className="ml-auto end-2.5 text-dark-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                onClick={()=>props.handleForm(false)}
                            >
                                <FontAwesomeIcon icon={faXmark} className="h-5 w-5 text-dark-500"/>
                            </button>
                        </div>
                        <div>
                            {props.typeForm === "login" ? <FormLogin setCloseModel={props.handleForm} /> : <FormRegister setCloseModel={props.handleForm} />}
                        </div>
                        <div className="flex items-center mt-28 mx-4">
                            <div className="border-t border-1 border-gray-400 flex-grow"></div>
                            <div className="px-3 text-gray-800 font-bold text-md">OR</div>
                            <div className="border-t border-1 border-gray-400 flex-grow"></div>
                        </div>
                        <div className="w-full mt-8">
                            <div className="flex flex-row items-center mx-4 gap-2">
                                <button type="button" className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                    <div className="bg-white p-2 rounded-full">
                                        <Image  alt="icon google" width={20} height={20} src={"/images/google-icon.png"} />
                                    </div>
                                    <span className="ml-4">
                                        Google
                                    </span>
                                </button>
                                <button type="button" className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                    <div className="bg-white p-2 rounded-full">
                                        <Image alt="icon google" width={20} height={20} src={"/images/facebook-icon.jpeg"} />
                                    </div>
                                    <span className="ml-4">
                                        Facebook
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}