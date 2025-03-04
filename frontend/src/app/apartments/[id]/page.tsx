"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getApartmentById } from "@/api/apartments";
import Image from "next/image";
import { Apartment } from "@/types/apartment.type";

export default function ApartmentDetails() {
  const { id } = useParams() as { id: string };
  const [apartment, setApartment] = useState<Apartment>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchApartment = async () => {
      try {
        const res = await getApartmentById(id);
        console.log(res.data)
        setApartment(res.data.data);
      } catch (err) {
        setError("Failed to load apartment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchApartment();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!apartment) return <p className="text-center">Apartment not found.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{apartment.name}</h1>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
                <p className="text-gray-700 mt-4"><strong>Unit Number:</strong> {apartment.unitNumber}</p>
                <p className="text-gray-700"><strong>Project:</strong> {apartment.project}</p>
                <p className="text-gray-700"><strong>Location:</strong> {apartment.location}</p>
                <p className="text-gray-900 font-bold text-lg mt-2">${apartment.price}</p>
            </div>
            {apartment.imageUrl && (
            <div className="h-64 relative w-full lg:w-1/2">
                <Image 
                src={apartment.imageUrl} 
                alt={apartment.name}
                fill 
                className="rounded-lg object-cover"
                />
            </div>
            )}
        </div>
      </div>
    </div>
  );
}
