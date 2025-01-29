import React from "react";
import { Link } from "react-router-dom";
import Upload from "../Components/PostImg/Jewellary.webp";
import { useState, useEffect } from "react";

function Posts() {
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:9000/viewCategory");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("http://localhost:9000/viewPostData");
        const data = await response.json();
        setPosts(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching Post:", error);
      }
    };
    fetchPost();
  }, []);

  const [formData, setformData] = useState({
    Category: "",
    Title: "",
    Content: "",
  });

  const handleData = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataSend = new FormData();
    dataSend.append("Category", formData.Category);
    dataSend.append("Title", formData.Title);
    dataSend.append("Content", formData.Content);

    if (file) {
      dataSend.append("Images", file);
    }

    const response = await fetch("http://localhost:9000/addPostData", {
      method: "POST",
      body: dataSend,
    });

    // Check if the response is valid
    if (!response.ok) {
      console.log("Failed to create post");
    }

    const postData = await response.json();
    setformData({
      Category: "",
      Title: "",
      Content: "",
    });
    setFile(null);
    console.log(postData);
    alert("Post Created Successfully");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-600">
          Create New Post
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Share your thoughts with the world.
        </p>
      </div>

      <form
        enctype="multipart/form-data"
        method="post"
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto space-y-6"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            name="Title"
            value={formData.Title}
            onChange={handleData}
            required
            placeholder="Enter Your Post Title"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Content
          </label>
          <textarea
            name="Content"
            value={formData.Content}
            onChange={handleData}
            placeholder="Enter Your Content Here"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            rows={6}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category
          </label>
          <select
            name="Category"
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

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Images
          </label>
          <input
            name="Images"
            type="file"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Submit Post
          </button>
        </div>
      </form>

  
      <div className="text-center mt-12 mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Recent Blog Posts</h2>
      </div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {Posts?.map((item) => {
          return (
            <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg">
              <Link to="/">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.Title}
                </h3>
              </Link>
              <h4 className="text-sm text-gray-600 mb-4 text-center">
                {item.Content}
              </h4>

              <h4 className="text-sm text-gray-600 mb-4 text-center">
                {item.Category}
              </h4>
              <img
                src={`http://localhost:9000/Upload/${item.Image}`}
                alt="Jewellery"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Posts;
