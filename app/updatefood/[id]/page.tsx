'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define the food item data type
interface FoodItem {
  id: string;
  date: string;
  image: string;
  name: string;
  meal: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
}

// Mock data for demonstration - in a real app, this would be fetched from the database
const MOCK_FOOD_DATA: FoodItem = {
  id: '1',
  date: '2024-05-20',
  image: 'https://placehold.co/150x150/A0522D/FFF?text=Pancakes',
  name: 'Pancakes',
  meal: 'Breakfast',
};

const defaultFoodImage = 'https://placehold.co/150x150/A0522D/FFF?text=Food';

export default function EditFoodPage() {
  const [foodName, setFoodName] = useState(MOCK_FOOD_DATA.name);
  const [mealType, setMealType] = useState(MOCK_FOOD_DATA.meal);
  const [foodDate, setFoodDate] = useState(MOCK_FOOD_DATA.date);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(MOCK_FOOD_DATA.image);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImagePreviewUrl(MOCK_FOOD_DATA.image);
    }
  }, [selectedImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating food data:', {
      foodName,
      mealType,
      foodDate,
      selectedImage,
    });
    // Logic to save updated data to the database
    alert('Food item updated successfully!');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50 p-6">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-amber-800">Edit Food Item</h1>
          <p className="mt-2 text-stone-600">Update your food entry.</p>
        </div>
        <form onSubmit={handleSave} className="mt-8 space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-amber-800 shadow-lg">
              {/* <Image
                src={imagePreviewUrl || defaultFoodImage}
                alt="Food Preview"
                layout="fill"
                objectFit="cover"
              /> */}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 rounded-full bg-amber-800 px-6 py-2 text-sm font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:bg-amber-900"
            >
              Change Photo
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
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
              Meal Type
            </label>
            <select
              id="mealType"
              value={mealType}
              onChange={(e) => setMealType(e.target.value as 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack')}
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
          <div className="flex justify-center space-x-4">
            <Link href="/dashboard" passHref>
              <button
                type="button"
                className="rounded-full border-2 border-amber-800 bg-transparent px-8 py-3 font-semibold text-amber-800 shadow-lg transition duration-300 ease-in-out hover:bg-amber-100"
              >
                Back to Dashboard
              </button>
            </Link>
            <button
              type="submit"
              className="rounded-full bg-amber-800 px-8 py-3 font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:bg-amber-900"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
