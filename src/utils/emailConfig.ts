
import emailjs from 'emailjs-com';

// Initialize EmailJS with your user ID
export const initializeEmailJS = () => {
  const USER_ID = 'YOUR_USER_ID'; // Replace with your actual EmailJS User ID
  emailjs.init(USER_ID);
};
