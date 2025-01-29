import React from "react";
import { Link } from "react-router-dom";
import Post1Img from "../Components/PostImg/Jewellary.webp";

import { useState , useEffect} from "react";


function Posts() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:9000/viewCategory');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);
     
  const [formData, setformData] = useState({
    Title : '',
    Content : '',
    Category : '',
    Images: '',
  })

  const handleData = (e) => {
     setformData({
      ...formData,
      [e.target.name]:e.target.value
     })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9000/addPostData",{
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const error = await response.json();
        alert(`Error: ${error.msg,'Unknown error'}`);
      }
      else {
        const postData = await response.json();
        setformData({
         Title : '',
         Content : '',
         Category : '',
         Images: ''
        });

        alert("Post Created Successfully" , postData);
      }
    } catch (error) {
      console.log(error);
      alert("Error while Sign up");
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-600">Create New Post</h1>
        <p className="text-lg text-gray-600 mt-2">Share your thoughts with the world.</p>
      </div>

      <form encType='multipart/form-data' onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={formData.Title}
            onChange={handleData}
            required
            placeholder="Enter Your Post Title"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
          <textarea
           value={formData.Content}
            onChange={handleData}
            placeholder='Enter Your Content Here'
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={6}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Select Category</label>
          <select
          value={formData.Category}
            onChange={handleData}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.Name}>
                {category.Name}
              </option>
            ))}
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Image</label>
          <input
            type="file"
            onChange={handleData}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            Submit Post
          </button>
        </div>
      </form>

      {/* Blog posts display */}
      <div className="text-center mt-12 mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Recent Blog Posts</h2>
      </div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg">
          <Link to="/">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Jewellery Post 1</h3>
          </Link>
          <h4 className="text-sm text-gray-600 mb-4 text-center">
            Alloy Gold-plated Silver Jewel Set (Pack of 1)
          </h4>
          <img
            src={Post1Img}
            alt="Jewellery"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        </div>
        {/* Add other posts here similarly */}
      </div>
    </div>
  );
}

export default Posts;

