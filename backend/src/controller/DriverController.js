export const someDriverRoute = (req, res) => {
    /*temporary  formed will update it later */
    res.status(200).json({ message: 'Welcome Driver!', user: req.user });
};
