import React from "react";
import { FaMapMarkerAlt } from 'react-icons/fa';

import { useLocation } from "react-router-dom";

export default function ViewTrip() {
    const location = useLocation();
    const trips = location.state?.trip;

    const trip = trips.tripDetails
    const hotels = trips.hotelOptions
    const dailyPlan = trips.dailyPlan

    if (!trips) {
        return <div className="text-white p-10">Trip not found.</div>;
    }
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trip.location)}`;


    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto my-12 text-white rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-indigo-400">{trip.title}</h1>
                    <a
                        href={mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-500 hover:text-red-400 transition"
                    >
                        <FaMapMarkerAlt className="inline mr-1" size={22} />
                        <span className="hidden sm:inline">{trip.location}</span>
                    </a>
                </div>

                <img
                    src='/place.png'
                    alt="place"
                    className="w-full h-72 object-cover rounded-lg"
                   
                />

                <div className="p-4 mt-4 space-y-4">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        {[
                            { label: 'Duration', icon: '🗓️', value: `${trip.durationInDays} Days` },
                            // { label: 'Travelers', icon: '🧍', value: noOfTravellers },
                            { label: 'Budget', icon: '💰', value: trip.budget },
                            { label: 'Trip Type', icon: '🏝️', value: trip.tripType },
                            { label: 'Best Time', icon: '📆', value: trip.recommendedTravelPeriod },
                        ].map((item, idx) => (
                            <p key={idx} className={`bg-white/10 text-gray-300 px-4 py-2 rounded-full flex items-center gap-2 ${item.label === 'Trip Type' ? 'max-w-[200px]' : ''}`}>
                                <span>{item.icon}</span>
                                <span className="text-white font-medium">{item.label}:</span> {item.value}
                            </p>
                        ))}
                    </div>
                </div>
            </div>


            <div className="max-w-6xl mx-auto text-white my-12">
                <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">🏨 Hotel Recommendations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {hotels.map((hotel, index) => (
                        <div key={index} className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 shadow-lg">
                            <img
                                src='/hotel.png'
                                alt={hotel.hotelName}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://via.placeholder.com/400x200?text=Hotel+Image+Not+Found";
                                }}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 space-y-2 text-sm">
                                <a
                                    href={`https://www.google.com/maps?q=${hotel.geoCoordinates.latitude},${hotel.geoCoordinates.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-lg font-semibold text-indigo-300 hover:underline"
                                >
                                    📍 {hotel.hotelName}
                                </a>
                                <p className="text-gray-400">{hotel.hotelAddress}</p>
                                <p className="text-gray-300">{hotel.description}</p>
                                <p><span className="font-medium text-white">Price:</span> {hotel.pricePerNight}/night</p>
                                <p><span className="font-medium text-white">Rating:</span> {hotel.rating} ⭐</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div className="max-w-6xl mx-auto text-white my-16 px-4">
                <h2 className="text-3xl font-bold text-center mb-10 text-indigo-400">🗓️ Daily Plan</h2>

                {dailyPlan.map((day, dayIdx) => (
                    <div key={dayIdx} className="mb-12">
                        <h3 className="text-2xl font-semibold text-center border py-2 rounded-full w-40 mx-auto mb-6">
                            Day {day.dayNumber}
                        </h3>

                        <div className="grid md:grid-cols-2 gap-8">
                            {day.activities.map((activity, actIdx) => {
                                const mapUrl = `https://www.google.com/maps/search/?api=1&query=${activity.geoCoordinates.latitude},${activity.geoCoordinates.longitude}`;
                                return (
                                    <div key={actIdx} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow">
                                        <div className="bg-indigo-600 px-4 py-1 text-sm text-white font-medium w-fit rounded-br-2xl">
                                            ⏰ {activity.time}
                                        </div>
                                        <div className="flex flex-col sm:flex-row">
                                            <img
                                                src="/activity.png"
                                                alt={activity.nameOfPlace}
                                                className="sm:w-2/5 w-full h-40 object-cover"
                                            />
                                            <div className="p-4 space-y-2 flex-1 text-sm">
                                                <h4 className="text-lg font-bold text-indigo-300">{activity.nameOfPlace}</h4>
                                                <p className="text-gray-300">{activity.description}</p>
                                                <p className="text-gray-400">
                                                    🕒 <span className="text-white">{activity.totalTimeRequired}</span>
                                                </p>
                                                <a
                                                    href={mapUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-red-400 hover:text-red-300"
                                                >
                                                    <FaMapMarkerAlt className="mr-1" /> View on Map
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
