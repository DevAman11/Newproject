import React from "react";
import Post1Img from '../Components/PostImg/Jewellary.webp';
import Post2Img from '../Components/PostImg/Clothes.webp';
import Post3Img from '../Components/PostImg/Mobile.webp';
import Post4Img from '../Components/PostImg/Skincare.webp';
import Post5Img from '../Components/PostImg/Boooks.webp';
import Post6Img from '../Components/PostImg/Computer.webp';
import Post7Img from '../Components/PostImg/Grocery.webp';
import Post8Img from '../Components/PostImg/Fashion.webp';

function Blog() {
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <div className="flex flex-col items-center bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Jewellery Post 1</h2>
          <h3 className="text-sm mb-4 text-center">Alloy Gold-plated Silver Jewel Set (Pack of 1)</h3>
          <img src={Post1Img} alt="Jewellery" className="w-full h-64 object-cover rounded-lg mb-4" />
        </div>

        <div className="flex flex-col items-center bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Clothes Post 2</h2>
          <h3 className="text-sm mb-4 text-center">Men Printed Round Neck Pure Cotton White T-Shirt</h3>
          <img src={Post2Img} alt="Clothes" className="w-full h-64 object-cover rounded-lg mb-4" />
        </div>

        <div className="flex flex-col items-center bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Mobile Post 3</h2>
          <h3 className="text-sm mb-4 text-center">Apple iPhone 16 Pro Max (Black Titanium, 512 GB)</h3>
          <img src={Post3Img} alt="Mobile" className="w-full h-64 object-cover rounded-lg mb-4" />
        </div>

        <div className="flex flex-col items-center bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Skincare Post 4</h2>
          <h3 className="text-sm mb-4 text-center">Mantra Impex 3 In 1 Anti Wrinkles Face Neck Eyes Massager</h3>
          <img src={Post4Img} alt="Skincare" className="w-full h-64 object-cover rounded-lg mb-4" />
        </div>

        <div className="flex flex-col items-center bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Books Post 5</h2>
          <h3 className="text-sm mb-4 text-center">The Power of Your Subconscious Mind</h3>
          <img src={Post5Img} alt="Books" className="w-full h-64 object-cover rounded-lg mb-4" />
        </div>

        <div className="flex flex-col items-center bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Computer Post 6</h2>
          <h3 className="text-sm mb-4 text-center">HP Victus 15 Gaming Laptop (15.6 inch, Performance Blue)</h3>
          <img src={Post6Img} alt="Computer" className="w-full h-64 object-cover rounded-lg mb-4" />
        </div>

        <div className="flex flex-col items-center bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Grocery Post 7</h2>
          <h3 className="text-sm mb-4 text-center">Get Fresh Dry Fruits Nut Mix (500 g)</h3>
          <img src={Post7Img} alt="Grocery" className="w-full h-64 object-cover rounded-lg mb-4" />
        </div>

        <div className="flex flex-col items-center bg-white p-4 shadow-lg rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Fashion Post 8</h2>
          <h3 className="text-sm mb-4 text-center">Neo Splash Analog Watch - For Men</h3>
          <img src={Post8Img} alt="Fashion" className="w-full h-64 object-cover rounded-lg mb-4" />
        </div>
      </div>
    </>
  );
}

export default Blog;
