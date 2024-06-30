function timeUntil(endDate) {
    // Get the current time
    const now = new Date();
    
    // Calculate the difference between the end date and the current time in milliseconds
    const delta = new Date(endDate) - now;
    
    // Calculate days, hours, minutes, and seconds
    const days = Math.floor(delta / (1000 * 60 * 60 * 24));
    const hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((delta % (1000 * 60)) / 1000);
    
    // Return the total time left in seconds
    return days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
}

// Export the function
export default timeUntil;
