export const getUsers = (req, res) => {
    res.status(200).json({ message: "Users retrieved successfully", users: [] });
  };
  