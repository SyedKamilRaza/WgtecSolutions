// Validation functions for application form

export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  idType?: string;
  idNumber?: string;
  dateOfBirth?: string;
  streetName?: string;
  city?: string;
  postalCode?: string;
  phoneNumber?: string;
  landlineNumber?: string;
  highSchoolName?: string;
  highSchoolCity?: string;
  universityName?: string;
  universityCity?: string;
  cvResume?: string;
  picture?: string;
  skills?: string;
  [key: string]: string | undefined;
}

export const validateForm = (formData: FormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  // ===== PERSONAL INFO VALIDATION =====
  
  // First Name validation
  const firstName = (formData.get("firstName") as string)?.trim() || "";
  if (!firstName) {
    errors.firstName = "First name is required";
  } else if (firstName.length < 2) {
    errors.firstName = "First name must be at least 2 characters";
  } else if (firstName.length > 50) {
    errors.firstName = "First name must not exceed 50 characters";
  } else if (!/^[a-zA-Z\s'-]+$/.test(firstName)) {
    errors.firstName = "First name can only contain letters, spaces, hyphens and apostrophes";
  }

  // Last Name validation
  const lastName = (formData.get("lastName") as string)?.trim() || "";
  if (!lastName) {
    errors.lastName = "Last name is required";
  } else if (lastName.length < 2) {
    errors.lastName = "Last name must be at least 2 characters";
  } else if (lastName.length > 50) {
    errors.lastName = "Last name must not exceed 50 characters";
  } else if (!/^[a-zA-Z\s'-]+$/.test(lastName)) {
    errors.lastName = "Last name can only contain letters, spaces, hyphens and apostrophes";
  }

  // Email validation
  const email = (formData.get("email") as string)?.trim() || "";
  if (!email) {
    errors.email = "Email is required";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address";
    } else if (email.length > 100) {
      errors.email = "Email must not exceed 100 characters";
    }
  }

  // ID Type validation
  const idType = formData.get("idType") as string;
  if (!idType || (idType !== "govt_id" && idType !== "passport")) {
    errors.idType = "Please select an ID type";
  }

  // ID Number validation
  const idNumber = (formData.get("idNumber") as string)?.trim() || "";
  if (!idNumber) {
    errors.idNumber = "ID number is required";
  } else if (idNumber.length < 5) {
    errors.idNumber = "ID number must be at least 5 characters";
  } else if (idNumber.length > 20) {
    errors.idNumber = "ID number must not exceed 20 characters";
  }

  // Date of Birth validation
  const dateOfBirth = formData.get("dateOfBirth") as string;
  if (dateOfBirth) {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    const minAge = new Date();
    minAge.setFullYear(today.getFullYear() - 18); // Must be at least 18 years old
    const maxAge = new Date();
    maxAge.setFullYear(today.getFullYear() - 100); // Must be less than 100 years old
    
    if (dob > today) {
      errors.dateOfBirth = "Date of birth cannot be in the future";
    } else if (dob > minAge) {
      errors.dateOfBirth = "You must be at least 18 years old";
    } else if (dob < maxAge) {
      errors.dateOfBirth = "Please enter a valid date of birth";
    }
  }

  // ===== ADDRESS VALIDATION =====
  
  // Street Name validation (Required)
  const streetName = (formData.get("streetName") as string)?.trim() || "";
  if (!streetName) {
    errors.streetName = "Street name is required";
  } else if (streetName.length > 100) {
    errors.streetName = "Street name must not exceed 100 characters";
  }

  // City validation (Required)
  const city = (formData.get("city") as string)?.trim() || "";
  if (!city) {
    errors.city = "City is required";
  } else {
    if (city.length < 2) {
      errors.city = "City must be at least 2 characters";
    } else if (city.length > 50) {
      errors.city = "City must not exceed 50 characters";
    } else if (!/^[a-zA-Z\s'-]+$/.test(city)) {
      errors.city = "City can only contain letters, spaces, hyphens and apostrophes";
    }
  }

  // Postal Code validation (Required)
  const postalCode = (formData.get("postalCode") as string)?.trim() || "";
  if (!postalCode) {
    errors.postalCode = "Postal code is required";
  } else {
    if (postalCode.length < 4) {
      errors.postalCode = "Postal code must be at least 4 characters";
    } else if (postalCode.length > 10) {
      errors.postalCode = "Postal code must not exceed 10 characters";
    } else if (!/^[a-zA-Z0-9\s-]+$/.test(postalCode)) {
      errors.postalCode = "Postal code can only contain letters, numbers, spaces and hyphens";
    }
  }

  // ===== PHONE VALIDATION =====
  
  // Phone Number validation (Required)
  const phoneNumber = (formData.get("phoneNumber") as string)?.trim() || "";
  if (!phoneNumber) {
    errors.phoneNumber = "Phone number is required";
  } else {
    // Remove all spaces, hyphens, and parentheses for validation
    const cleanPhone = phoneNumber.replace(/[\s\-()]/g, "");
    if (!/^\+?[0-9]+$/.test(cleanPhone)) {
      errors.phoneNumber = "Phone number can only contain digits, +, spaces, hyphens and parentheses";
    } else if (cleanPhone.length < 10) {
      errors.phoneNumber = "Phone number must be at least 10 digits";
    } else if (cleanPhone.length > 15) {
      errors.phoneNumber = "Phone number must not exceed 15 digits";
    }
  }

  // Landline Number validation (Optional but if provided should be valid)
  const landlineNumber = (formData.get("landlineNumber") as string)?.trim() || "";
  if (landlineNumber) {
    const cleanLandline = landlineNumber.replace(/[\s\-()]/g, "");
    if (!/^\+?[0-9]+$/.test(cleanLandline)) {
      errors.landlineNumber = "Landline number can only contain digits, +, spaces, hyphens and parentheses";
    } else if (cleanLandline.length < 10) {
      errors.landlineNumber = "Landline number must be at least 10 digits";
    } else if (cleanLandline.length > 15) {
      errors.landlineNumber = "Landline number must not exceed 15 digits";
    }
  }

  // ===== EDUCATION VALIDATION =====
  
  // High School Name validation (Required)
  const highSchoolName = (formData.get("highSchoolName") as string)?.trim() || "";
  if (!highSchoolName) {
    errors.highSchoolName = "High school name is required";
  } else {
    if (highSchoolName.length < 2) {
      errors.highSchoolName = "High school name must be at least 2 characters";
    } else if (highSchoolName.length > 100) {
      errors.highSchoolName = "High school name must not exceed 100 characters";
    }
  }

  // High School City validation (Required)
  const highSchoolCity = (formData.get("highSchoolCity") as string)?.trim() || "";
  if (!highSchoolCity) {
    errors.highSchoolCity = "High school city is required";
  } else {
    if (highSchoolCity.length < 2) {
      errors.highSchoolCity = "High school city must be at least 2 characters";
    } else if (highSchoolCity.length > 50) {
      errors.highSchoolCity = "High school city must not exceed 50 characters";
    } else if (!/^[a-zA-Z\s'-]+$/.test(highSchoolCity)) {
      errors.highSchoolCity = "High school city can only contain letters, spaces, hyphens and apostrophes";
    }
  }

  // University Name validation (Optional, but if provided should be valid)
  const universityName = (formData.get("universityName") as string)?.trim() || "";
  if (universityName) {
    if (universityName.length < 2) {
      errors.universityName = "University name must be at least 2 characters";
    } else if (universityName.length > 100) {
      errors.universityName = "University name must not exceed 100 characters";
    }
  }

  // University City validation (Optional, but if provided should be valid)
  const universityCity = (formData.get("universityCity") as string)?.trim() || "";
  if (universityCity) {
    if (universityCity.length < 2) {
      errors.universityCity = "University city must be at least 2 characters";
    } else if (universityCity.length > 50) {
      errors.universityCity = "University city must not exceed 50 characters";
    } else if (!/^[a-zA-Z\s'-]+$/.test(universityCity)) {
      errors.universityCity = "University city can only contain letters, spaces, hyphens and apostrophes";
    }
  }

  // Ensure University Name and City are paired
  if (universityName && !universityCity) {
    errors.universityCity = "University city is required when university name is provided";
  }
  if (!universityName && universityCity) {
    errors.universityName = "University name is required when university city is provided";
  }

  // ===== SKILLS VALIDATION =====
  
  const skillsJson = formData.get("skills") as string;
  if (!skillsJson) {
    errors.skills = "At least one skill is required";
  } else {
    try {
      const skills = JSON.parse(skillsJson);
      if (!Array.isArray(skills)) {
        errors.skills = "Skills must be an array";
      } else if (skills.length === 0) {
        errors.skills = "At least one skill is required";
      } else if (skills.length > 20) {
        errors.skills = "You can add a maximum of 20 skills";
      } 
    } catch {
      errors.skills = "Invalid skills format";
    }
  }

  // ===== FILE VALIDATION =====
  
  // CV/Resume validation (Required)
  const cvResumeUrl = (formData.get("cvResumeUrl") as string)?.trim() || "";
  if (!cvResumeUrl) {
    errors.cvResume = "CV/Resume upload is required";
  } else {
    try {
      new URL(cvResumeUrl);
    } catch {
      errors.cvResume = "Invalid CV/Resume URL";
    }
  }

  // Picture validation (Required)
  const pictureUrl = (formData.get("pictureUrl") as string)?.trim() || "";
  if (!pictureUrl) {
    errors.picture = "Picture upload is required";
  } else {
    try {
      new URL(pictureUrl);
    } catch {
      errors.picture = "Invalid picture URL";
    }
  }

  return errors;
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};

// Helper function to validate a single field (useful for real-time validation)
export const validateField = (fieldName: string, value: unknown, formData?: FormData): string | undefined => {
  const tempFormData = formData || new FormData();
  if (typeof value === 'string') {
      tempFormData.set(fieldName, value);
  } else if (value instanceof Blob) {
      tempFormData.set(fieldName, value);
  } else {
       tempFormData.set(fieldName, String(value));
  }
  
  const errors = validateForm(tempFormData);
  return errors[fieldName];
};