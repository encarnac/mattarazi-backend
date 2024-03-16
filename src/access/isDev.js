export const isDev = ({ req: { user } }) => {
  // Scenario #1 - Check if user has the 'developer' role
  if (user && user.role === "developer") {
    return true;
  }
  // Scenario #3 - Disallow all others
  return false;
};
