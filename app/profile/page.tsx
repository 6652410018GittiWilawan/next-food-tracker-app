'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const defaultProfileImage = 'https://placehold.co/150x150/8B4513/FFF?text=Profile';

export default function ProfilePage() {
  const [profileName, setProfileName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [gender, setGender] = useState('Male');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(defaultProfileImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedImage);
    }
  }, [selectedImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving profile data:', {
      profileName,
      email,
      gender,
      selectedImage,
    });
    // Add logic to save data to the database
    alert('Profile saved successfully!');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50 p-6">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-amber-800">Your Profile</h1>
          <p className="mt-2 text-stone-600">Edit your personal information below.</p>
        </div>
        <form onSubmit={handleSave} className="mt-8 space-y-6">
          <div className="flex flex-col items-center">
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-amber-800 shadow-lg">
              {/* <Image
                src={imagePreviewUrl || defaultProfileImage}
                alt="Profile Preview"
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
            <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              required
              className="w-full rounded-lg border-2 border-amber-200 bg-amber-50 p-3 text-stone-800 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border-2 border-amber-200 bg-amber-50 p-3 text-stone-800 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              className="w-full rounded-lg border-2 border-amber-200 bg-amber-50 p-3 text-stone-800 focus:border-amber-500 focus:outline-none"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
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
