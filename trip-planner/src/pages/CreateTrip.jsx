import React, { useState } from 'react';
import Header from '../components/Header/Header';
import Options from '../data/Options';
import { toast } from 'react-hot-toast';
import { callGemini } from '../services/AIModel';
import { useNavigate } from 'react-router-dom';


export default function CreateTrip() {
    const navigate = useNavigate();
    const { budgetOptions, travelGroupOptions } = Options;
    const [currentuser] = useState(JSON.parse(localStorage.getItem("user")));
    

    const [formData, setFormData] = useState({
        location: '',
        noOfDays: '',
        selectedBudget: '',
        selectedGroup: '',
    });

    const [loading, setLoading] = useState(false);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBudgetSelect = (id) => {
        setFormData((prev) => ({ ...prev, selectedBudget: id }));
    };

    const handleGroupSelect = (id) => {
        setFormData((prev) => ({ ...prev, selectedGroup: id }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentuser) {
            toast.error("Login first to Generate Trip plan.");
            return navigate("/login");
        }
        const { location, noOfDays, selectedBudget, selectedGroup } = formData;

        if (!location.trim() || !noOfDays || !selectedBudget || !selectedGroup) {
            toast.error('Please fill in all the fields before submitting.');
            return;
        }
        const PROMPT = `Generate a travel summary for a trip to {location} for {noOfDays} days with a {travelwith} and a {budget} budget.

Return the result strictly in JSON format with the following structure:

{
  "tripDetails": {
    "title": "",
    "imageUrl": "",
    "location": "",
    "durationInDays": "",
    "budget": "",
    "noOfTravellers": "",
    "recommendedTravelPeriod": "",
    "tripType": ""
  },
  "hotelOptions": [
    {
      "hotelName": "",
      "hotelAddress": "",
      "pricePerNight": "",
      "hotelImageUrl": "", // Must be a working, publicly accessible image URL (preferably a generic hotel/building image)
      "geoCoordinates": {
        "latitude": 0.0,
        "longitude": 0.0
      },
      "rating": "",
      "description": ""
    }
  ],
  "dailyPlan": [
    {
      "dayNumber": 1,
      "activities": [
        {
          "time": "",
          "nameOfPlace": "",
          "imageURL":"",
          "description": "",
          "totalTimeRequired": "",
          "geoCoordinates": {
            "latitude": 0.0,
            "longitude": 0.0
          }
        }
      ]
    }
  ]
}

Important Instructions:
- Strictly return only the JSON data and nothing else.
- Use real or believable coordinates.
- Do not use images from TripAdvisor or any site with hotlink restrictions.
- Hotel image URLs should be publicly accessible.`;

        const FINAL_PROMPT = PROMPT
            .replace('{location}', location)
            .replace('{noOfDays}', noOfDays)
            .replace('{travelwith}', selectedGroup)
            .replace('{budget}', selectedBudget);


        setLoading(true);

        try {
            const geminiResponse = await callGemini(FINAL_PROMPT);
            navigate('/trip-details', { state: { geminiResponse, userInput: formData } });
        } catch (err) {
            toast.error('Failed to plan your trip. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    return (

        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen">
            <Header />

            {/* Hero Section */}
            <section className="flex justify-center text-white px-6 py-20">
                <div className="max-w-3xl text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
                        Tell Us Your <span className="text-indigo-400">Travel Preferences</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
                        Just provide some basic information, and our AI Trip Planner will create a{' '}
                        <span className="text-green-400 font-medium">customized itinerary</span> based on your
                        preferences. It’s fast, easy, and personalized for your dream adventure.
                    </p>
                </div>
            </section>

            <div className="px-6 max-w-5xl mx-auto text-white">
                {/* Destination */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">What is Destination of Your Choice?</h3>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Enter destination"
                        className="w-full px-4 py-3 rounded-lg text-white bg-transparent border border-gray-600 focus:outline-none focus:border-indigo-400"
                    />
                </div>

                {/* Number of Days */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-2">How many days are you planning your trip?</h3>
                    <input
                        type="number"
                        name="noOfDays"
                        value={formData.noOfDays}
                        onChange={handleInputChange}
                        placeholder="e.g., 5"
                        className="w-full px-4 py-3 rounded-lg text-white bg-transparent border border-gray-600 focus:outline-none focus:border-indigo-400"
                    />
                </div>

                {/* Budget Options */}
                <div className="mb-10">
                    <h3 className="text-xl font-semibold mb-4">What is your Budget?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {budgetOptions.map((option) => (
                            <div
                                key={option.id}
                                onClick={() => handleBudgetSelect(option.id)}
                                className={`rounded-xl p-6 text-center shadow-md transition duration-300 cursor-pointer border 
                ${formData.selectedBudget === option.id
                                        ? 'border-indigo-500 bg-gray-800'
                                        : 'border-transparent hover:border-indigo-500'
                                    }`}
                            >
                                <div className="text-4xl mb-3">{option.icon}</div>
                                <h4 className="text-lg font-bold mb-2 text-indigo-400">{option.title}</h4>
                                <p className="text-gray-300 text-sm">{option.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Travel Group Options */}
                <div className="mb-10">
                    <h3 className="text-xl font-semibold mb-4">Who are you traveling with?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {travelGroupOptions.map((option) => (
                            <div
                                key={option.id}
                                onClick={() => handleGroupSelect(option.id)}
                                className={`rounded-xl p-6 text-center shadow-md transition duration-300 cursor-pointer border 
                ${formData.selectedGroup === option.id
                                        ? 'border-indigo-500 bg-gray-800'
                                        : 'border-transparent hover:border-indigo-500'
                                    }`}
                            >
                                <div className="text-4xl mb-3">{option.icon}</div>
                                <h4 className="text-lg font-bold mb-2 text-indigo-400">{option.title}</h4>
                                <p className="text-gray-300 text-sm">{option.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white font-semibold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl"
                >
                    {loading ? 'Planning Your Trip...' : 'Generate My Trip Plan'}
                </button>

            </div>

        </div>
    );
}
