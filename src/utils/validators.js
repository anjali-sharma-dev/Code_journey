/**
 * Email validation function
 * 
 * @param {string} email 
 * @returns {boolean} 
 */
export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**

 * @param {string} password - Password to validate
 * @returns {boolean} True if password is valid, false otherwise
 */
export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return re.test(password);
};

/**
 * Form field validation function
 * 
 * @param {string} field - Field name
 * @param {string} value - Field value
 * @param {Object} options - Validation options
 * @returns {string|null} Error message or null if valid
 */
export const validateField = (field, value, options = {}) => {
  // Required field validation
  if (options.required && !value) {
    return `${field} is required`;
  }
  
  // Email validation
  if (field === 'email' && value && !validateEmail(value)) {
    return 'Please enter a valid email address';
  }
  
  // Password validation
  if (field === 'password' && options.validateStrength && value && !validatePassword(value)) {
    return 'Password must be at least 8 characters and contain uppercase, lowercase, and numbers';
  }
  
  // Password confirmation validation
  if (field === 'confirmPassword' && options.password && value !== options.password) {
    return 'Passwords do not match';
  }
  
  // Min length validation
  if (options.minLength && value.length < options.minLength) {
    return `${field} must be at least ${options.minLength} characters`;
  }
  
  // Max length validation
  if (options.maxLength && value.length > options.maxLength) {
    return `${field} must be less than ${options.maxLength} characters`;
  }
  
  return null;
};