// Application Form Types based on Joi Schema

export type IdType = "govt_id" | "passport";

export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";

export interface Address {
  streetName?: string | null;
  city?: string | null;
  postalCode?: string | null;
}

export interface Phone {
  phoneNumber?: string | null;
  landlineNumber?: string | null;
}

export interface HighSchool {
  name?: string | null;
  city?: string | null;
}

export interface University {
  name?: string | null;
  city?: string | null;
}

export interface Education {
  highSchool?: HighSchool;
  university?: University;
}

export interface Skill {
  skill: string;
  level: SkillLevel;
}

export interface CreateApplicationPayload {
  firstName: string;
  lastName: string;
  email: string;
  idType: IdType;
  idNumber: string;
  dateOfBirth?: string | null;
  address?: Address;
  phone?: Phone;
  education?: Education;
  skills?: Skill[];
  cvResume?: string | null;
  picture?: string | null;
  certification: boolean;
}

