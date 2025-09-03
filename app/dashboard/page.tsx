'use client';
import { useState, useMemo } from 'react';
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

// Mock data for demonstration
const MOCK_FOOD_DATA: FoodItem[] = [
  { id: '1', date: '2024-05-20', image: 'https://placehold.co/100x100/A0522D/FFF?text=Breakfast', name: 'Pancakes', meal: 'Breakfast' },
  { id: '2', date: '2024-05-20', image: 'https://placehold.co/100x100/A0522D/FFF?text=Lunch', name: 'Grilled Chicken Salad', meal: 'Lunch' },
  { id: '3', date: '2024-05-20', image: 'https://placehold.co/100x100/A0522D/FFF?text=Dinner', name: 'Salmon with Asparagus', meal: 'Dinner' },
  { id: '4', date: '2024-05-19', image: 'https://placehold.co/100x100/A0522D/FFF?text=Snack', name: 'Yogurt with Berries', meal: 'Snack' },
  { id: '5', date: '2024-05-19', image: 'https://placehold.co/100x100/A0522D/FFF?text=Breakfast', name: 'Oatmeal', meal: 'Breakfast' },
  { id: '6', date: '2024-05-19', image: 'https://placehold.co/100x100/A0522D/FFF?text=Lunch', name: 'Vegetable Soup', meal: 'Lunch' },
  { id: '7', date: '2024-05-18', image: 'https://placehold.co/100x100/A0522D/FFF?text=Dinner', name: 'Beef Stir-fry', meal: 'Dinner' },
  { id: '8', date: '2024-05-18', image: 'https://placehold.co/100x100/A0522D/FFF?text=Snack', name: 'Apple Slices', meal: 'Snack' },
  { id: '9', date: '2024-05-17', image: 'https://placehold.co/100x100/A0522D/FFF?text=Breakfast', name: 'Smoothie', meal: 'Breakfast' },
  { id: '10', date: '2024-05-17', image: 'https://placehold.co/100x100/A0522D/FFF?text=Lunch', name: 'Tuna Sandwich', meal: 'Lunch' },
];

const ITEMS_PER_PAGE = 5; // To simulate pagination

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and paginate data based on search term and current page
  const filteredData = useMemo(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return MOCK_FOOD_DATA.filter(item =>
      item.name.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleDelete = (id: string) => {
    // Logic to handle item deletion
    console.log(`Deleting item with ID: ${id}`);
    // You would typically update the state here, e.g., using a state management library or by refetching data
    alert(`Item with ID ${id} deleted.`);
  };

  const handleEdit = (id: string) => {
    // Logic to handle item editing
    console.log(`Editing item with ID: ${id}`);
    // This would likely redirect to an edit page or open a modal
    alert(`Edit functionality for item with ID ${id} will be implemented here.`);
  };

  return (
    <div className="min-h-screen bg-amber-50 p-6">
      <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:justify-between md:space-y-0">
        <h1 className="text-4xl font-bold text-amber-800">Your Food Diary</h1>
        <div className="flex w-full max-w-md items-center rounded-full bg-white p-2 shadow-md md:w-auto">
          <input
            type="text"
            placeholder="Search food..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full flex-grow rounded-full bg-white px-4 py-2 text-stone-700 focus:outline-none"
          />
          <button
            type="button"
            className="rounded-full bg-amber-800 p-2 text-white transition duration-300 hover:bg-amber-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <Link href="/addfood" passHref>
          <button className="w-full rounded-full bg-amber-800 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:bg-amber-900 md:w-auto">
            Add Food
          </button>
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-amber-200">
          <thead className="bg-amber-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-amber-800">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-amber-800">
                Image
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-amber-800">
                Food Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-amber-800">
                Meal
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-amber-800">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-200 bg-white">
            {paginatedData.length > 0 ? (
              paginatedData.map((food) => (
                <tr key={food.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-700">{food.date}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {/* <Image
                      src={food.image}
                      alt={food.name}
                      width={50}
                      height={50}
                      className="rounded-full object-cover"
                    /> */}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-stone-900">{food.name}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-stone-700">{food.meal}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <button
                      onClick={() => handleEdit(food.id)}
                      className="text-amber-600 transition duration-300 hover:text-amber-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(food.id)}
                      className="ml-4 text-red-600 transition duration-300 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-sm text-stone-500">
                  No food items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ease-in-out ${
              currentPage === 1 ? 'cursor-not-allowed text-stone-400' : 'bg-amber-800 text-white hover:bg-amber-900'
            }`}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ease-in-out ${
                currentPage === index + 1 ? 'bg-amber-800 text-white shadow-md' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ease-in-out ${
              currentPage === totalPages ? 'cursor-not-allowed text-stone-400' : 'bg-amber-800 text-white hover:bg-amber-900'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
