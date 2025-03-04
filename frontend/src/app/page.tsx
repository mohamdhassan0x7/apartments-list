"use client";
import { useState, useEffect } from "react";
import { fetchApartments } from "@/api/apartments";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [apartments, setApartments] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ name: "", price: "", location: "" });
  const limit = 5

  useEffect(() => {
    loadApartments();
  }, [page, filters]);

  const loadApartments = async () => {
    try {
      const {data} = await fetchApartments(page, limit, {...filters, price: parseInt(filters.price)});
      setApartments(data.data);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-blue-800">Apartments</h1>
     
      <div className="bg-white p-4 shadow-md rounded-md flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={filters.name}
          onChange={handleFilterChange}
          className="p-2 border rounded w-full md:w-1/3 text-gray-400"
        />
        <input
          type="number"
          name="price"
          placeholder="Max Price"
          value={filters.price}
          onChange={handleFilterChange}
          className="p-2 border rounded w-full md:w-1/3 text-gray-400"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
          className="p-2 border rounded w-full md:w-1/3 text-gray-400"
        />
      </div>

      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {apartments?.map((apartment: any) => (
          <div key={apartment.id} className="bg-white p-4 shadow-md rounded-md flex flex-col gap-4 lg:flex-row">
            {
              apartment.imageUrl  && (
                <div className="flex-1">
                  <Image src={apartment.imageUrl} layout="responsive"
                    width={16} 
                    height={9} 
                    alt="Apartment" className="rounded-md" />
                </div>
              )
            }
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-800">{apartment.name}</h2>
              <p className="text-gray-600">Unit: {apartment.unitNumber}</p>
              <p className="text-gray-600">Project: {apartment.project}</p>
              <p className="text-gray-600">Location: {apartment.location}</p>
              <p className="text-blue-600 font-bold">${apartment.price}</p>
            </div>
            <Link href={`/apartments/${apartment.id}`}>
              <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-6 gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-600">Page {page}</span>
        <button
          onClick={() => setPage((prev) => (prev * limit < total ? prev + 1 : prev))}
          disabled={page * limit >= total}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
