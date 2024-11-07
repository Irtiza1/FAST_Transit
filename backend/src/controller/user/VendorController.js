export const someVendorRoute = (req, res) => {
    /*temporary  formed will update it later */
    res.status(200).json({ message: 'Welcome Vendor!', user: req.user });
};