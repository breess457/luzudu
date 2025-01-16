import { faList, faRightFromBracket, faShop, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { deleteCookie } from "@/untils/SessionProviders";

export default function Sidebar({...props}){
    return (
        <aside 
            id="cta-button-sidebar"
            className=" top-0 left-0 z-40 w-80 h-screen overflow-hidden transition-transform -translate-x-full sm:translate-x-0"
            aria-label="Sidebar"
        >
            <div className="h-full px-3 py-4 overflow-y-auto">
                <ul className="space-y-2 font-medium">
                    <li className="my-4"></li>
                </ul>
                <ul className="space-y-2 font-medium">
                    <li>
                        <Link href={"/accounts/"} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                            <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"/>
                            <span className="ms-3">{props.user.Profile?.firstname}</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={"#"} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                            <FontAwesomeIcon icon={faList} className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"/>
                            <span className="ms-3 uppercase">List Order</span>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/accounts/my-market"} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                            <FontAwesomeIcon icon={faShop} className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"/>
                            <span className="ms-3 uppercase">my market</span>
                        </Link>
                    </li>
                    <li>
                        <button onClick={deleteCookie} className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group">
                            <FontAwesomeIcon icon={faRightFromBracket} className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"/>
                            <span className="ms-3 uppercase">logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    )
}