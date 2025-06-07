import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { post} from "../../services/ApiEndpoint.js";
import toast from "react-hot-toast";

export default function TripCard({ trip, index, refreshTrips }) {
  const navigate = useNavigate();
  const currentuser = JSON.parse(localStorage.getItem("user"));

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const response = await post("/api/trip/deleteTripByIndex", {
        userId: currentuser._id,
        index: index,
      });

      if (response.status === 200) {
        toast.success("Trip deleted successfully");
        refreshTrips(); // Refresh after deletion
      }
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete trip");
    }
  };

  return (
    <div
      className="relative bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl p-4 transition-all duration-300 cursor-pointer"
      onClick={() => navigate(`/view-trip/${index}`, { state: { trip } })}
    >
      <img
        src="./image.png"
        alt="Trip Preview"
        className="w-full h-40 object-cover rounded-xl mb-4"
      />

      <h2 className="text-xl font-bold text-white mb-2">
        📍 {trip?.tripDetails?.location || "Unknown Destination"}
      </h2>

      <div className="space-y-1 text-sm text-gray-300">
        <p>🕒 Duration: <span className="font-medium">{trip?.tripDetails?.durationInDays || "N/A"} days</span></p>
        <p>👥 Travellers: <span className="font-medium">{trip?.tripDetails?.noOfTravellers || "N/A"}</span></p>
        <p>💰 Budget: <span className="font-medium">₹{trip?.tripDetails?.budget || "N/A"}</span></p>
      </div>

      <button
        className="absolute bottom-4 right-4 text-red-500 hover:text-red-700 text-lg z-10 bg-white/20 p-2 rounded-full"
        title="Delete Trip"
        onClick={handleDelete}
      >
        <FaTrashAlt />
      </button>
    </div>
  );
}
