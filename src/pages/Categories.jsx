import React, { useState } from 'react';


const MoCategories = () => {

    const [active, setActive] = useState("All")
    const categories = ["All", "Laptops", "Iphones"]


    return (
        <div className='min-h-screen bg-white px-4 sm:px-6 md:hidden mt-3'>
            {categories.map((category) => (
                <button
                key={category}
                onClick={() => setActive(category)}
                className={` py-2 px-5 text-sm font-medium transition-colors duration-200 
                    cursor-pointer border-b-2
                    ${active === category
                        ? 'border-red-600 text-red-600' 
                        : 'border-transparent text-gray-500 hover:text-black'}`
                }
                >{category}</button>

            ))}
            

        </div>
    )
}

export default MoCategories