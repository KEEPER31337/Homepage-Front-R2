export const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export const validateEmail = (input: string): boolean => {
  if (input) {
    return emailRegex.test(input);
  }
  return false;
};
