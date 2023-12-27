import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Snackbar,
} from '@mui/material';
import Alert from "@mui/material/Alert";

const AddEdit = ({ open, handleClose, isEdit, rowData, handleSave ,getall}) => {
    const [formData, setFormData] = useState({});
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);

    useEffect(() => {
        // Set initial form data when the dialog opens or rowData changes
        setFormData(rowData);
    }, [open, rowData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    useEffect(() => {
        let timeoutId;

        if (success || failure) {
            timeoutId = setTimeout(() => {
                setSuccess(false);
                setFailure(false);
            }, 1000);
        }
        getall()
        return () => clearTimeout(timeoutId);
    }, [success, failure]);

    const handleSaveClick = async () => {
        try {
            // Define the API endpoint and method based on whether it's an edit or add
            const apiEndpoint = isEdit
                ? `http://127.0.0.1:5000/update_user/${formData.id}`
                : 'http://127.0.0.1:5000/signup';
            const method = isEdit ? 'PUT' : 'POST';

            const response = await fetch(apiEndpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Handle success, e.g., show a success message or trigger a refresh
                handleSave(formData);
                setSuccess(true);
               
            } else {
                // Handle error, e.g., show an error message
                console.error('Error saving data:', response.statusText);
                setFailure(true);
              
            }
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };
 

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{isEdit ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
            <DialogContent>
                <TextField
                    label="Employee Name"
                    name="username"
                    value={formData.username || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                {/* Add more fields as needed */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSaveClick} color="primary">
                    Update
                </Button>
            </DialogActions>
            <Snackbar open={success} autoHideDuration={40000}  >
                <Alert severity="success">
                    <strong>Updated Successfully!</strong>
                </Alert>
            </Snackbar>
            <Snackbar open={failure} autoHideDuration={40000}  >
                <Alert severity="error">
                    <strong>Updation Failed</strong>
                </Alert>
            </Snackbar>
        </Dialog>
    );
};

export default AddEdit;
