import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Backend URL

export const getProviderBookings = async (providerId) => {
  return axios.get(`${API_URL}/provider/bookings/${providerId}`, { withCredentials: true });
};

export const respondToBooking = async (bookingId, status) => {
  try {
    console.log("🔹 Sending request to respond to booking:", bookingId, status);
    
    const response = await axios.post(`${API_URL}/booking/respond`, 
      { bookingId, status }, 
      { withCredentials: true }
    );

    console.log("✅ Booking response successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error responding to booking:", error.response?.data || error.message);
    throw error;
  }
};


export const getNotifications = async (providerId) => {
  return axios.get(`${API_URL}/provider/notifications/${providerId}`, { withCredentials: true });
};
