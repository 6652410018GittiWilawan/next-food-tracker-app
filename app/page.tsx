import Link from "next/link";
import Image from "next/image";
import foodtracker from './images/foodtracker.jpg'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-amber-50 p-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-amber-800">Welcome to Food Tracker</h1>
        <p className="mt-4 text-xl text-stone-600">Track your meal!!!</p>
        <div className="mt-8 flex justify-center">
          <Image
            src={foodtracker}
            alt="Food Tracker Logo"
            width={300}
            height={350}
            className="rounded-full shadow-lg"
          />
        </div>
        <div className="mt-12 flex justify-center space-x-4">
          <Link href="/login" passHref>
            <button className="rounded-full border border-amber-800 bg-transparent px-8 py-3 font-semibold text-amber-800 shadow-lg transition duration-300 ease-in-out hover:bg-amber-100">
              Login
            </button>
          </Link>
          <Link href="/register" passHref>
            <button className="rounded-full bg-amber-800 px-8 py-3 font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:bg-amber-900">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
