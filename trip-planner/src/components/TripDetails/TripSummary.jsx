import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function TripSummary({ trip }) {
    const {
        imageUrl,
        location,
        durationInDays,
        noOfTravellers,
        budget,
        recommendedTravelPeriod,
        tripType,
        title
    } = trip;

    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

    return (
        <div className="max-w-4xl mx-auto my-12 text-white rounded-2xl">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-indigo-400">{title}</h1>
                <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:text-red-400 transition"
                >
                    <FaMapMarkerAlt className="inline mr-1" size={22} />
                    <span className="hidden sm:inline">{location}</span>
                </a>
            </div>

            <img
                src='./place.png'
                className="w-full h-72 object-cover rounded-lg"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/1280x400?text=Image+Unavailable"; }}
            />

            <div className="p-4 mt-4 space-y-4">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    {[
                        { label: 'Duration', icon: '🗓️', value: `${durationInDays} Days` },
                        // { label: 'Travelers', icon: '🧍', value: noOfTravellers },
                        { label: 'Budget', icon: '💰', value: budget },
                        { label: 'Trip Type', icon: '🏝️', value: tripType },
                        { label: 'Best Time', icon: '📆', value: recommendedTravelPeriod },
                    ].map((item, idx) => (
                        <p key={idx} className={`bg-white/10 text-gray-300 px-4 py-2 rounded-full flex items-center gap-2 ${item.label === 'Trip Type' ? 'max-w-[200px]' : ''}`}>
                            <span>{item.icon}</span>
                            <span className="text-white font-medium">{item.label}:</span> {item.value}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}
