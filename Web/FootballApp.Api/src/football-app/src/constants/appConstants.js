export const appConstants = {
    apiUrl: 'https://localhost:44332/api',
    usernameMinLength: 4,
    passwordMinLength: 4,
    emailRegex: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    errors: {
        username: 'Username minimum length is 4 characters',
        password: 'Password minimum length is 4 characters',
        firstName: 'First Name is required',
        lastName: 'Last Name is required',
        email: 'Invalid email address'
    },
    changedPassword: 'Password changed successfully'
};