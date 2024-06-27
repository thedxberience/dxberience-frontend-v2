"use server";
// Validator for Full Name
export async function validateFullName(fullName) {
  // Full name must be at least 2 characters long and only contain letters, spaces, or dashes
  const regex = /^[a-zA-Z\s-]{2,}$/;
  return regex.test(fullName);
}

// Validator for Email Address
export async function validateEmailAddress(email) {
  // Simple regex for email validation

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Validator for Phone Number
export async function validatePhoneNumber(phoneNumber) {
  // Simple regex for phone number validation including country code
  const regex = /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})$/;
  return regex.test(phoneNumber);
}

// Validator for Company
export async function validateCompany(company) {
  // Company name must be at least 2 characters long. This is a simple validation.
  return company.length >= 2;
}

// Validator for Message
export async function validateMessage(message) {
  // Message must be at least 1 character long. This is a simple validation.
  return message.length >= 1;
}
