export function convertTo12HourFormat(time) {
    // Validate the input time format
    const timePattern = /^(\d{2}):(\d{2}):(\d{2})$/;

    const match = time.match(timePattern);
    if (!match) {
        return "Invalid time format"; // Return a message if the format is incorrect
    }

    let hours = parseInt(match[1], 10); // Get hours
    const minutes = match[2]; // Get minutes

    // Determine AM or PM suffix
    const period = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12 || 12; // Convert to 12-hour format and handle midnight (0 hours)

    // Return formatted time
    return `${hours.toString().padStart(2, '0')}:${minutes} ${period}`;
}