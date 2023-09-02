const validateEmail = (input: string): boolean => {
  if (input) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(input);
  }
  return false;
};
export default validateEmail;
