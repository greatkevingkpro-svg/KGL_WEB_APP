const authRolesForSales = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // roles comes from protected middleware
      const userRole = req.user?.role

      // checks if the user is not found or user input is empty
      if (!userRole) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      //  checks if roles provided are allowed
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: "Access denied" });
      }

      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = {authRolesForSales};