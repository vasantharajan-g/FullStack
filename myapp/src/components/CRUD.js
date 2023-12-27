import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, AppBar, Toolbar, Box } from '@mui/material';
// import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import "../App.css";
import AddEdit from './AddEdit';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

//task task
let gridApi;
const CRUD = () => {

  const [open, setOpen] = useState(false); // Add this line
  const [open3, setOpen3] = useState(false);
  const [rowData, setRowData] = useState([]);

  const columnDefs = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true, checkboxSelection: true, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true },
    { headerName: 'Employee Name', field: 'username', sortable: true, filter: true },
    { headerName: 'Email', field: 'email', sortable: true, filter: true },
  ];
  const [addEditOpen, setAddEditOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  // const addEditRef = useRef(null);

  const handleAddEditClose = () => {
    setAddEditOpen(false);
    fetchEmployeeData();
  };
  const handleBackClick = () => {
    window.history.back();
  };
  const handleAddEditSave = (formData) => {
    setAddEditOpen(false);
   };

  const handleEditClick = () => {
    if (gridApi && gridApi.selectionService) {
      const selectedRows = gridApi.selectionService.getSelectedRows();
      if (selectedRows.length === 1) {
        setIsEdit(true);
        setSelectedRowData(selectedRows[0]);
        setAddEditOpen(true);
      } else {
        console.error("Grid API or selectionService is undefined");
        alert('No Row is selected,Please Select the row to Edit the data');

      }
    };
  }


  const fetchEmployeeData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/get_all_users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data, "emp_data_getall")
      // Handle the data here
      setRowData(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle the error here
    }
  };


  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const handleDeleteClick = () => {
    const selectedRows = gridApi?.selectionService?.getSelectedRows();
    if (selectedRows && selectedRows.length > 0) {
      setDeleteConfirmationOpen(true);
    } else {
      alert('No row selected. Please select a row to delete.');
    }
  };

  const handleDeleteConfirm = async () => {
    const selectedRows = gridApi?.selectionService?.getSelectedRows();
    if (selectedRows && selectedRows.length > 0) {
      const userId = selectedRows[0].id;
      try {
        const response = await fetch(`http://127.0.0.1:5000/delete_user/${userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          setOpen(true); // Show success Snackbar
          fetchEmployeeData();
          setTimeout(() => {
            setOpen(false);
          }, 1000);
        } else {
          setOpen3(true);
          setTimeout(() => {
            setOpen3(false);
          }, 1000);
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        setOpen3(true); // Show error Snackbar
      } finally {
        setDeleteConfirmationOpen(false); // Close the confirmation dialog
      }
    }
  };

  useEffect(() => {
    // This effect runs when the component mounts
    fetchEmployeeData();
  }, []); // The empty dependency array ensures the effect runs only once

  const onGridReady = (params) => {
    gridApi = params.api;
    // Other logic...
  };
  return (
    <div className="ag-theme-alpine" style={{ height: "100vh", margin: "5vh" }}>
      <AppBar position="static" class="appbar_color" style={{ width: "100%" }}>
        <Toolbar>
          <Box display='flex' flexGrow={1}>
            <h3 className='band1'> Employee Records </h3>
          </Box>

          {/* <div className="employeetooltip">
            <Button variant="text" id="addtaskbutton" onClick={handleAddClick}>
              <AddBoxRoundedIcon className="band1"></AddBoxRoundedIcon>
            </Button>
            <span className="tooltiptext" >Add</span>
          </div> */}


          <div className="employeetooltip">
            <Button variant="text" id="edittask" onClick={handleEditClick} >
              <EditRoundedIcon className="band1"></EditRoundedIcon>
            </Button>
            <span className="tooltiptext">Edit</span>
          </div>


          <div className="employeetooltip">
            <Button variant="text" id="deletetask" onClick={handleDeleteClick}>
              <DeleteRoundedIcon className="band1" />
            </Button>
            <span className="tooltiptext">Delete</span>
          </div>
          <div className="employeetooltip">
            <Button variant="text" id="back button" onClick={handleBackClick }>
              <ArrowBackRoundedIcon className="band1"></ArrowBackRoundedIcon>
            </Button>
            <span className="tooltiptext" >Back</span>
          </div>
          <Snackbar open={open} autoHideDuration={4000}>
            <Alert severity="success">
              <strong>Deleted Successfully!</strong>
            </Alert>
          </Snackbar>
          <Snackbar open={open3} autoHideDuration={4000}>
            <Alert severity="error">
              <strong>Deletion Unsuccessful!</strong>
            </Alert>
          </Snackbar>

          <Dialog open={deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete the selected employee?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteConfirmationOpen(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDeleteConfirm} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
         
        </Toolbar>
      </AppBar>
      <br></br>
      <div style={{ width: "100%", height: "70%" }} >
        <AgGridReact style={{
          boxSizing: "border-box",
          height: "100%",
          width: "100%",
          textAlign: 'center'
        }}
          rowData={rowData}
          columnDefs={columnDefs}
          enableFilter={true}
          pagination={true}
          rowSelection="multiple"
          paginationPageSize={20}
          rowMultiSelectWithClick={true}
          onGridReady={onGridReady}
          defaultColDef={{ sortable: false, lockVisible: true, resizable: true, editable: false, filter: true, floatingFilter: true, resizabl: false, enableBrowserTooltips: true }}
        >
        </AgGridReact>

      </div>
      <AddEdit
        open={addEditOpen}
        handleClose={handleAddEditClose}
        isEdit={isEdit}
        rowData={selectedRowData}
        handleSave={handleAddEditSave}
        getall={fetchEmployeeData}
      />
    </div>
  );
};

export default CRUD;
