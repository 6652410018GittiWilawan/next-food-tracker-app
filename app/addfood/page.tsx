'use client';
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AddFoodPage() {
  const [foodName, setFoodName] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [foodDate, setFoodDate] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImagePreviewUrl(null);
    }
  }, [selectedImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving food item:", {
      foodName,
      mealType,
      foodDate,
      selectedImage,
    });
    // Add logic to save data to the database
    alert("Food item saved successfully!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50 p-6">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-amber-800">Add New Food</h1>
          <p className="mt-2 text-stone-600">Enter the details of your meal below.</p>
        </div>
        <form onSubmit={handleSave} className="mt-8 space-y-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="foodName">
              Food Name
            </label>
            <input
              type="text"
              id="foodName"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
              className="w-full rounded-lg border-2 border-amber-200 bg-amber-50 p-3 text-stone-800 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="mealType">
              Meal
            </label>
            <select
              id="mealType"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              required
              className="w-full rounded-lg border-2 border-amber-200 bg-amber-50 p-3 text-stone-800 focus:border-amber-500 focus:outline-none"
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="foodDate">
              Date
            </label>
            <input
              type="date"
              id="foodDate"
              value={foodDate}
              onChange={(e) => setFoodDate(e.target.value)}
              required
              className="w-full rounded-lg border-2 border-amber-200 bg-amber-50 p-3 text-stone-800 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Food Image
            </label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-full bg-amber-800 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:bg-amber-900"
              >
                Choose Image
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              {imagePreviewUrl && (
                <div className="relative h-24 w-24 overflow-hidden rounded-full">
                  <Image
                    src={imagePreviewUrl}
                    alt="Image Preview"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
              <button
              type="submit"
              className="rounded-full bg-amber-800 px-8 py-3 font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:bg-amber-900"
            >
              Save
            </button>
            <Link href="/dashboard" passHref>
              <button
                type="button"
                className="rounded-full border-2 border-amber-800 bg-transparent px-8 py-3 font-semibold text-amber-800 shadow-lg transition duration-300 ease-in-out hover:bg-amber-100"
              >
                Back to Dashboard
              </button>
            </Link>
          
          </div>
        </form>
      </div>
    </div>
  );
}
