
import emailjs from 'emailjs-com';

// Initialize EmailJS with your user ID
export const initializeEmailJS = () => {
  const USER_ID = 'lcoIppQEnR3Y1wMdM'; // Changed from placeholder to actual ID
  emailjs.init(USER_ID);
};
