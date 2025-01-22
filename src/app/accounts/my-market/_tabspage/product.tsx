import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProductPage({...props}){
    return (
        <div className="mx-2 flex flex-row">
            <form className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 mx-1 ml-auto mt-3">
                <label htmlFor="" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
                <div className="relative">
                    {/* <div className="absolute inset-y-0 start-0 flex py-0 items-center ps-3 pointer-events-none">
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4 text-gray-500"/>
                    </div> */}
                    <input 
                        type="search" 
                        className="block w-full py-2 px-3 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" 
                        placeholder="search..."
                    />
                    <button 
                        className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300" 
                        type="submit"
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4 text-white"/>
                    </button>
                </div>
            </form>
            <div className="w-auto flex mt-3">
                <button className="ml-auto px-3 py-2 text-sm font-medium text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">เพิ่มสินค้า</button>
            </div>
        </div>
    )
}