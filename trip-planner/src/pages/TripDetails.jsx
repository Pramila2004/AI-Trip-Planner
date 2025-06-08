import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import TripSummary from '../components/TripDetails/TripSummary';
import HotelRecommendation from '../components/Hotels/HotelRecommendation';
import DailyPlan from '../components/DailyPlan/DailyPlan';
import { post } from '../services/ApiEndpoint';
import toast from 'react-hot-toast';

export default function TripDetails() {
    const location = useLocation();
    const { geminiResponse } = location.state || {};
    const { tripDetails: trip, hotelOptions: hotels, dailyPlan } = geminiResponse;
    const [currentuser] = useState(JSON.parse(localStorage.getItem("user")));

   

    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            const tripPayload = {
                tripDetails: trip,
                hotelOptions: hotels,
                dailyPlan: dailyPlan,
            };


            const response = await post('/api/trip/addTrip', { user: currentuser, trip: tripPayload })
            if (response.status === 200) {
                toast.success(response.data.message || "Saved successfully!");

            }

        } catch (error) {
            console.error("Submit Error:", error);
            toast.error(error.response?.data?.message || "An error occurred while saving Trip.");
        }
    }

    return (
        <>
            <Header />
            <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen text-white px-4 md:px-8 py-12">
                <div className="mt-10 flex justify-end">
                    <button
                        onClick={handlesubmit}
                        className="inline-flex items-center gap-2 border border-gray-600 text-sm text-gray-200 hover:bg-gray-800 hover:border-gray-500 px-4 py-2 rounded-md transition-all duration-200"
                    >
                        <span className="text-green-400">💾</span> Save Trip
                    </button>
                </div>


                <TripSummary trip={trip} />
                <HotelRecommendation hotels={hotels} />
                <DailyPlan dailyPlan={dailyPlan} />
            </div>
        </>
    );
}
