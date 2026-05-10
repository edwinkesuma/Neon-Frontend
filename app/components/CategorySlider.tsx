import React, {useRef} from 'react';
import CategoryItem from "~/components/CategoryItem";
import type {Category} from "~/routes/home/types";

const CategorySlider = ({categories}: { categories: Category[] }) => {
    const sliderRef = useRef<HTMLDivElement | null>(null);

    const scrollLeft = () => {
        if (!sliderRef.current) return;

        sliderRef.current.scrollBy({
            left: -300,
            behavior: "smooth",
        });
    };

    const scrollRight = () => {
        if (!sliderRef.current) return;

        sliderRef.current.scrollBy({
            left: 300,
            behavior: "smooth",
        });
    };

    return (
        <section>
            <div className="relative w-full bg-white py-6">
                {/*Button Left*/}
                <button
                    onClick={scrollLeft}
                    className="h-10 w-10 absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow"
                >
                    ❮
                </button>

                {/*Slider*/}
                <div
                    ref={sliderRef}
                    className="scrollbar-hide flex gap-8 overflow-x-auto scroll-smooth px-12 scrollbar-hide"
                >
                    {/*Item*/}
                    {categories.map((category) => <CategoryItem key={category.id} category={category}/>)}
                </div>

                {/*Button Right*/}
                <button
                    onClick={scrollRight}
                    className="h-10 w-10 absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow"
                >
                    ❯
                </button>
            </div>
        </section>
    );
};

export default CategorySlider;