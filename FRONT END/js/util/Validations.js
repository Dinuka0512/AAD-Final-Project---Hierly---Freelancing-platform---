export default class Validation {

    // Check if value is not null/empty
    static isNotNull(value) {
        return value !== null && value !== undefined && value.trim().length > 0;
    }

    // Validate email format
    static isValidEmail(value) {
        if (!this.isNotNull(value)) return false;
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
    }

    // Validate strong password
    static isStrongPassword(value) {
        if (!this.isNotNull(value)) return false;
        const regex =  /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
        return regex.test(value);
    }

    // Validate username (letters, numbers, underscore, 3–20 chars)
    static isValidUserName(value) {
        if (!this.isNotNull(value)) return false;
        const regex = /^[A-Za-z]+$/;
        return regex.test(value);
    }

    // Validate mobile number (7–15 digits, optional + at start)
    static isValidMobileNumber(value) {
        if (!this.isNotNull(value)) return false;
        const regex = /^\+?[0-9]{7,15}$/;
        return regex.test(value);
    }
}
