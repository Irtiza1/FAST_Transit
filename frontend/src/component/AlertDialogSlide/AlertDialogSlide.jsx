import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {/* Custom-styled Button */}
      <button
      variant="outlined"    
        onClick={handleClickOpen}
        // className="px-6 py-2  text-yellow-600 border-2 border-yellow-600  font-base  hover:bg-gray-700 rounded-md shadow-md"
        className='transition-all duration-200 border-2 border-yellow-700 rounded-lg p-2 text-yellow-600 hover:bg-yellow-700 hover:bg-opacity-20 hover:border-yellow-500 hover:shadow-yellow-600 '
      >
        Allow Location Access
      </button>

      {/* Dialog with Custom Styles */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            borderRadius: '1rem', // Optional for rounded corners
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)', // Material-UI styling
          },
        }}
      >
        <div className="p-6 bg-yellow-700 bg-opacity-70 border-2 border-yellow-600 rounded-2xl">
          <DialogTitle >
            Allow FastTransit to access your location
          </DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-slide-description"
            //   className="text-gray-700 font-semibold"
            >
              By accessing your current location we will try to show you routes which have stops nearest to your current location.
            </DialogContentText>
          </DialogContent>
          <DialogActions className="flex justify-end">
            <button
              onClick={handleClose}
              className="transition-all duration-200 px-4 py-2 text-sm font-medium text-gray-800 bg-red-500 hover:bg-red-600 rounded-md"
            >
              Deny
            </button>
            <button
              onClick={handleClose}
              className="transition-all duration-200 px-4 py-2 ml-2 text-sm font-medium text-white bg-gray-600 hover:bg-green-700 rounded-md"
            >
              Allow
            </button>
          </DialogActions>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
