import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const MoCategories = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const filter = searchParams.get("filter");

    // Derive which tab is active from the URL
    const active = !filter ? "All" : filter === "Laptop" ? "Laptops" : "iPhones";

    const handleSelect = (category) => {
        if (category === "All") navigate("/");
        else if (category === "Laptops") navigate("/?filter=Laptop");
        else navigate("/?filter=iPhone");
    };

    const categories = ["All", "Laptops", "iPhones"];

    return (
        <div className='bg-white px-7 md:hidden border-b border-gray-100'>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => handleSelect(category)}
                    className={`py-2 px-5 text-base font-semibold transition-colors duration-200
                        cursor-pointer border-b-2
                        ${active === category
                            ? 'border-[#5E0202] text-[#5E0202]'
                            : 'border-transparent text-gray-500 hover:text-black'}`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};

export default MoCategories;