const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({
        message: "Akses ditolak. Hanya admin yang bisa mengakses fitur ini.",
      });
  }
  next();
};

module.exports = { isAdmin };
