// Utility functions for room management
export const generateRoomId = () => {
  // Generate a random room ID (6 characters)
  return Math.random().toString(36).substring(2, 8);
};