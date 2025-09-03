"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Define a type for the form data
interface FormData {
  name: string;
  email: string;
  password: string;
  gender: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    gender: "male",
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data:", formData);
    console.log("Image Preview URL:", imagePreviewUrl);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50 p-6">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl md:p-12">
        <h1 className="mb-8 text-center font-serif text-4xl font-bold text-amber-800">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-stone-700">
              Name - Last Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-full border-2 border-amber-300 bg-amber-50 px-4 py-2 text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-stone-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-full border-2 border-amber-300 bg-amber-50 px-4 py-2 text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-stone-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-full border-2 border-amber-300 bg-amber-50 px-4 py-2 text-stone-800 placeholder-stone-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Gender Select */}
          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-stone-700">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-full border-2 border-amber-300 bg-amber-50 px-4 py-2 text-stone-800 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Image Upload and Preview */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {imagePreviewUrl ? (
                <Image
                  src={imagePreviewUrl}
                  alt="Image Preview"
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-full border-4 border-amber-300 object-cover shadow-md"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-dashed border-amber-300 bg-amber-100 text-stone-500">
                  <span className="text-center text-sm">Image Preview</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="image" className="block text-sm font-medium text-stone-700">
                Profile Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-stone-500 file:mr-4 file:rounded-full file:border-0 file:bg-amber-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-amber-700 file:transition-colors file:duration-200 hover:file:bg-amber-200"
              />
            </div>
          </div>

          {/* Register Button */}
          <div>
            <button
              type="submit"
              className="w-full rounded-full bg-amber-800 px-4 py-3 font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:bg-amber-900"
            >
              Register
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="mt-8 text-center text-sm text-stone-600">
          Already have an account?{" "}
          <Link href="/login" passHref>
            <span className="font-semibold text-amber-800 transition duration-300 ease-in-out hover:text-amber-900">
              Login here
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
