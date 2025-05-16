
import emailjs from 'emailjs-com';

// Initialize EmailJS with your user ID
export const initializeEmailJS = () => {
  const USER_ID = 'lcoIppQEnR3Y1wMdM'; // Your EmailJS User ID
  emailjs.init(USER_ID);
  
  // Additional verification to make sure EmailJS is initialized correctly
  console.log('EmailJS initialized with user ID:', USER_ID);
};
