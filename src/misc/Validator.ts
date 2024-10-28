import { Participant } from "@/models/Participant";
import MyStorage from "@/misc/MyStorage";

export class Validator {
  static validateName(name: string): string {
    if (!name || name.trim() === "") {
      return "Name is required.";
    }
    if (name.length < 2) {
      return "Name must be at least 2 characters long.";
    }
    return "";
  }

  static validateDateOfBirth(dateOfBirth: string, today: string): string {
    if (!dateOfBirth) {
      return "Date of birth is required.";
    }
    if (new Date(dateOfBirth) > new Date(today)) {
      return "Date of birth cannot be in the future.";
    }
    return "";
  }

  static validateEmail(email: string, isUpdate: boolean): string {
    if (!email) {
      return "Email is required.";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return "Invalid email format.";
    }
    if (!isUpdate) {
      const participants: Participant[] = MyStorage.getParticipants();
      for (const participant of participants) {
        if (participant.email === email) {
          return "email already exists";
        }
      }
    }
    return "";
  }

  static validatePhoneNumber(phoneNumber: string): string {
    if (!phoneNumber) {
      return "Phone number is required.";
    }
    const phonePattern = /^\+?\d{10,15}$/;
    if (!phonePattern.test(phoneNumber)) {
      return "Invalid phone number format.";
    }
    return "";
  }
}
