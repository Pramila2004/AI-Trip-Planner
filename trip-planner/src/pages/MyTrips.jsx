import React, { useEffect, useState } from "react";
import TripCard from "../components/TripCard/TripCard";
import { get } from "../services/ApiEndpoint";
import Header from "../components/Header/Header";

export default function MyTrips() {
  const [trips, setTrips] = useState([]);
  const currentuser = JSON.parse(localStorage.getItem("user"));

  const fetchTrips = async () => {
    try {
      const response = await get(`/api/trip/getTrips?userId=${currentuser._id}`);
      setTrips(response.data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [currentuser]);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4 md:px-8 py-20">
        <h1 className="text-3xl font-bold text-center mb-10 text-white">My Trips</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {trips.length > 0 ? (
            trips.map((trip, index) => (
              <TripCard key={index} trip={trip} index={index} refreshTrips={fetchTrips} />
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full">No trips found</p>
          )}
        </div>
      </div>
    </>
  );
}
