export interface Registrant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerfied: boolean;
  phoneNumber: string;
  school: string;
  major: string;
  gender: string;
  ethnicity: string;
  howYouHeard: string;
  hackathons: number;
  shirtSize: string;
  githubUsername: string;
  dateOfBirth: string;
  allergens: string[];
  confirmedAttendance1: string;
  otherAllergens: string;
  educationLevel: string;
  checkedIn: boolean;
  acceptedWaiver: boolean;
  isWaitlisted: boolean;
  emailsReceived: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface RegistrantLite {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  emailVerfied: boolean;
  checkedIn: boolean;
}