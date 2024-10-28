import MyStorage from "@/misc/MyStorage";
export class Validator {
    static validateName(name) {
        if (!name || name.trim() === "") {
            return "Name is required.";
        }
        if (name.length < 2) {
            return "Name must be at least 2 characters long.";
        }
        return "";
    }
    static validateDateOfBirth(dateOfBirth, today) {
        if (!dateOfBirth) {
            return "Date of birth is required.";
        }
        if (new Date(dateOfBirth) > new Date(today)) {
            return "Date of birth cannot be in the future.";
        }
        return "";
    }
    static validateEmail(email, isUpdate) {
        if (!email) {
            return "Email is required.";
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return "Invalid email format.";
        }
        if (!isUpdate) {
            const participants = MyStorage.getParticipants();
            for (const participant of participants) {
                if (participant.email === email) {
                    return "email already exists";
                }
            }
        }
        return "";
    }
    static validatePhoneNumber(phoneNumber) {
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
//# sourceMappingURL=Validator.js.map