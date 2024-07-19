export const checkValidDataSignin = (email, password) => {
    // Perform validation here using regular expressions
    const isEmailValid = /^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(email)
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password)

    if (!isEmailValid) {
        return "Invalid Email";
    } 
    if (!isPasswordValid) {
        return "Invalid Password";
    } 

    return null;
}

export const checkValidDataSignup = (fullname, email, password) => {
    // Perform validation here using regular expressions
    const isFullnameValid = /^[a-zA-Z]+ [a-zA-Z]+$/.test(fullname)
    const isEmailValid = /^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/.test(email)
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password)

    if (!isFullnameValid) {
        return "Invalid Fullname. It consists of first and last name only!!";
    } 
    if (!isEmailValid) {
        return "Invalid Email";
    } 
    if (!isPasswordValid) {
        return "Invalid Password";
    }

    return null;
}