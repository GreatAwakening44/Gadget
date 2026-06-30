import React, { useState } from 'react';


const MoCategories = () => {

    const [active, setActive] = useState("All")
    const categories = ["All", "Laptops", "Iphones"]


    return (
        <div className='min-h-screen bg-white px-4 sm:px-6 md:hidden'>
            {categories.map((category) => (
                <button
                key={category}
                onClick={() => setActive(category)}
                className={`rounded-full py-1.5 px-5 text-sm font-medium transition-colors duration-200 
                    cursor-pointer 
                    ${active === category
                        ? 'bg-[#005124] text-white border border-[#005124]' 
                        : 'bg-white text-black border border-black hover:bg-gray-50'}`
                }
                >{category}</button>

            ))}
            

        </div>
    )
}

export default MoCategories