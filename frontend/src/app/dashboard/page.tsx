"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";
import { createApartment } from "@/api/apartments";

export default function Dashboard() {
  const { userRole } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    unitNumber: "",
    project: "",
    price: "",
    location: "",
    image: null,
  });
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string[]>([]);

  useEffect(() => {
    if (userRole !== "admin") {
      router.push("/");
    }
  }, [userRole, router]);
  if (userRole !== "admin") {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    try {
      setError([]);
      const res = await createApartment({
        name: formData.name,
        unitNumber: formData.unitNumber,
        project: formData.project,
        price: Number(formData.price),
        location: formData.location,
        image: formData.image,
      });
      if(res.statusCode !== 201) {
        const errors = Array.isArray(res.data.message) ? res.data.message : [res.data.message];
        setError(errors);
        return;
      }
      router.push("/");
    } catch (error) {
      console.error("Error creating apartment", error);
    } finally {
      setUploading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded w-full max-w-lg text-gray-600">
        <h2 className="text-xl font-bold mb-4">Add New Apartment</h2>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-2 border mb-2 rounded text-gray-400" required />
        <input type="text" name="unitNumber" placeholder="Unit Number" value={formData.unitNumber} onChange={handleChange} className="w-full p-2 border mb-2 rounded text-gray-400" required />
        <input type="text" name="project" placeholder="Project" value={formData.project} onChange={handleChange} className="w-full p-2 border mb-2 rounded text-gray-400" required />
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full p-2 border mb-2 rounded text-gray-400" required />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="w-full p-2 border mb-2 rounded text-gray-400" required />
        <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border mb-2 rounded" required />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded" disabled={uploading}>
          {uploading ? "Uploading..." : "Add Apartment"}
        </button>
      {error?.map((err, index: number) => <p key={index} className="text-red-500">{err}</p> )}
      </form>
    </div>
  );
}
