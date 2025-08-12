import React from "react";
import Image from "next/image";
import Link from "next/link";  // Import Link
import { ShoppingCart } from "lucide-react";

const MenuCard = ({ item }) => {
  return (
    <Link
      href={`/menu/${item.id}`}
      className="
        bg-white rounded-3xl shadow-sm hover:shadow-lg 
        transition-all duration-300 p-4 flex flex-col sm:flex-row gap-4
        cursor-pointer
        no-underline
        text-inherit
      "
    >
      {/* Image */}
      <div className="flex-shrink-0 relative w-full sm:w-28 h-40 sm:h-28 rounded-2xl overflow-hidden border border-gray-100">
        <Image
          src={item.image_url || "/default-food.jpg"}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, 200px"
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
            {item.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {item.description || "Delicious food you’ll love!"}
          </p>
        </div>

        {/* Price + Button */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-amber-600 font-extrabold text-lg sm:text-xl">
            ${item.price}
          </span>
          <button
            className="
              flex items-center gap-2 bg-amber-600 hover:bg-amber-700
              text-white text-sm sm:text-base font-medium px-4 py-2 rounded-full
              shadow-md transition-colors duration-300
            "
            onClick={(e) => e.preventDefault()} // prevent navigation when clicking add button
          >
            <ShoppingCart size={16} /> Add
          </button>
        </div>
      </div>
    </Link>
  );
};

export default MenuCard;
