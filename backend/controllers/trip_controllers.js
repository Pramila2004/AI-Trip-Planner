

import Trip from "../models/trips.js";

export const saveUserTrips = async (req, res) => {
  try {
    const { user, trip } = req.body; 

     console.log("Received user:", user._id);
    console.log("Received trip:", trip);


   
    // Check if a Trip document already exists for this user
    let userTripDoc = await Trip.findOne({ userId: user._id });

    if (!userTripDoc) {
      // If no document exists, create a new one with the trip in array
      userTripDoc = new Trip({
        userId: user._id,
        trips: [trip], // store as array
      });
    } else {
      // Push new trip into trips array
      userTripDoc.trips.push(trip);
    }

    await userTripDoc.save();

    return res.status(200).json({ message: "Trip saved successfully" });
  } catch (error) {
    console.error("Error saving trip:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserTrips = async (req, res) => {
  try {
    const userId = req.query.userId;
    const userTrips = await Trip.findOne({ userId });

    if (!userTrips) {
      return res.status(404).json({ message: "No trips found for this user" });
    }

    res.status(200).json(userTrips.trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteTripByIndex = async (req, res) => {
  const { userId, index } = req.body;

  if (userId === undefined || index === undefined) {
    return res.status(400).json({ message: "userId and index are required" });
  }

  try {
    const user = await Trip.findOne({ userId });

    if (!user || !Array.isArray(user.trips) || index < 0 || index >= user.trips.length) {
      return res.status(404).json({ message: "Trip not found at given index" });
    }

    // Remove the trip at the specified index
    user.trips.splice(index, 1);
    await user.save();

    res.status(200).json({ message: "Trip deleted successfully" });
  } catch (error) {
    console.error("Delete trip error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


