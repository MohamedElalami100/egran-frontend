function formatDuration(startTime, endTime) {
    if (!endTime) {
      return "---"; // Return '-' when endTime is undefined
    }
  
    // Parse time strings (format "HH:MM:SS")
    const [startHours, startMinutes, startSeconds] = startTime.split(":").map(Number);
    const [endHours, endMinutes, endSeconds] = endTime.split(":").map(Number);
  
    // Convert startTime and endTime to seconds since start of the day
    const startInSeconds = startHours * 3600 + startMinutes * 60 + startSeconds;
    const endInSeconds = endHours * 3600 + endMinutes * 60 + endSeconds;
  
    // Calculate the duration in seconds
    const durationInSeconds = endInSeconds - startInSeconds;
  
    // Handle negative duration (if endTime is earlier in the day)
    if (durationInSeconds < 0) {
      return "---"; // You can adjust this behavior if needed
    }
  
    // Convert the duration back to hours, minutes, and seconds
    const durationHours = Math.floor(durationInSeconds / 3600);
    const durationMinutes = Math.floor((durationInSeconds % 3600) / 60);
    const durationSeconds = durationInSeconds % 60;
  
    // Return the formatted duration string
    return `${durationHours}h ${durationMinutes}m ${durationSeconds}s`;
  }

  export default formatDuration;