import React, { useState } from 'react';


const MoCategories = () => {

    const [active, setActive] = useState("All")
    const categories = ["All", "Laptops", "Iphones"]


    return (
        <div className='min-h-screen bg-white px-4 sm:px-6 md:hidden mt-3 border-b border-gray-100'>
            {categories.map((category) => (
                <button
                key={category}
                onClick={() => setActive(category)}
                className={` py-2 px-5 text-sm font-semibold transition-colors duration-600 
                    cursor-pointer border-b-2
                    ${active === category
                        ? 'border-[#5E0202] text-[#5E0202]' 
                        : 'border-transparent text-gray-500 hover:text-black'}`
                }
                >{category}</button>

            ))}
            

        </div>
    )
}

export default MoCategories