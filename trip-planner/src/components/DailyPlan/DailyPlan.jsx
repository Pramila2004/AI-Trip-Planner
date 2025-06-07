import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function DailyPlan({ dailyPlan }) {
    return (
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
                                            src="./activity.png"
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
    );
}
