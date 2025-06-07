import React from 'react';

export default function HotelRecommendation({ hotels }) {
    return (
        <div className="max-w-6xl mx-auto text-white my-12">
            <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">🏨 Hotel Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.map((hotel, index) => (
                    <div key={index} className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 shadow-lg">
                        <img
                            src='./hotel.png'
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
    );
}
