package com.dem.expense.constant;

public enum Constant {
    VERIFICATION_FAILED_MSG("Sorry, we could not verify account. It maybe already verified, or verification code is incorrect"),
    VERIFICATION_SUCCESS_MSG("verification success"),
    REGISTRATION_SUCCESS_MSG("register success"),
    DB_CONNECTION_FAILED("Database connection failed"),
    WRONG_EMAIL_FORMAT("email: Email is invalid"),
    USER_DOES_NOT_EXIST("User does not exist"),
    ACCOUNT_ALREADY_EXISTS_MSG("Account already exists"),
    VERIFICATION_LINK_RESENT_MSG("verification link resent successfully"),
    VERIFCATION_PENDING_MSG("Verification pending"),

    EMAIL_SUCCESS_MESSAGE("Email has been successfully sent to your Mailbox"),
    NO_ACCOUNT_MESSAGE("No account has been found associated with this email"),
    EMAIL_FAILURE_MESSAGE("Error in sending Email, please try later"),
    PASSWORD_RESET_SUBJECT("Password Reset Link"),
    PASSWORD_RESET_BODY("Hi, please find attached the password reset link : "),
    INVALID_TOKEN("Invalid access token"),

    INVALID_ACCESS_TOKEN("Invalid access token"),

    INVALID_REFRESH_TOKEN("Invalid refresh token"),
    INVALID_CREDENTIALS("Invalid email or password"),

    VALID_CREDENTIALS("Login Successful"),
    ALREADY_VERIFIED_MSG("Already verified"),
    LINK_EXPIRED_SENT_ANOTHER_EMAIL("link expired sent another email"),
    EMAIL_NOT_VERIFIED("Email Not Verified"),
    INVALID_RESET_CODE_MESSAGE("Invalid reset password code."),
    RESET_PASSWORD_CODE_EXPIRED_MESSAGE("Verification code for reset password expired"),
    RESET_PASSWORD_CODE_VALID_MESSAGE("Reset password code is valid"),
    RESET_PASSWORD_SUCCESS_MESSAGE("Password reset successful"),
    RESET_PASSWORD_CODE_INVALID_RESPONSE_MESSAGE("The code is either expired or the user no longer exists"),
    BAD_CREDENTIALS_MESSAGE("Bad credentials was received"),
    WEAK_CREDENTIALS_MESSAGE("Weak Credentials received"),
    WEAK_CREDENTIALS_RESPONSE_MESSAGE("The credentials are too weak. Try  stronger credentials"),
    BAD_FIELDS_RESPONSE_MESSAGE("password: Password is not valid Wrong format"),
    SERVER_ERROR_MESSAGE("Internal Server Error. contact the admin."),
    WRONG_PASSWORD_EXCEPTION("Incorrect Password Exception Occurred : {}"),
    USER_NOT_FOUND_EXCEPTION("User Not Found Exception Occurred : {}");


    private String message;

    private Constant(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return message;
    }
}
