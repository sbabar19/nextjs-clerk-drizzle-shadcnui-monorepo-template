export const getCleanedEmail = (email: string) => {
  // remove all spaces and make it lowercase
  return email.replace(/\s+/g, "").toLowerCase().trim();
};

export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
