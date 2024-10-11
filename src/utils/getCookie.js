const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
    if (parts.length === 2) {
      return parts.pop().split(';').shift(); // Return the cookie value
    }
    return null; // Return null if cookie not found
  };

  export default getCookie;
  