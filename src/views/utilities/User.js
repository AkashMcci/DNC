import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Edit from './Edit';
import CaptchaDialog from 'views/CaptchaDialog';
export default function DataTable() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <div>
                    <Button variant="text" size="small" startIcon={<EditIcon />} onClick={() => handleEditClick(params.row)}>
                        Edit
                    </Button>
                    <Button variant="text" size="small" startIcon={<DeleteIcon />} onClick={() => handleDeleteClick(params.row.id)}>
                        Delete
                    </Button>
                </div>
            )
        }
    ];

    const initialRows = [
        { id: 1, lastName: 'Shankar', firstName: 'Athi', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Akash', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
    ];

    const [rows, setRows] = useState(initialRows);
    const [openDownloadDialog, setOpenDownloadDialog] = useState(false);
    const [csvFileName, setCsvFileName] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [openCaptchaDialog, setOpenCaptchaDialog] = React.useState(false);
    const [id, setId] = React.useState();

    const handleEditClick = (selectedRow) => {
        setSelectedRow(selectedRow);
    };
    const handleSpotUpdate = (updatedData) => {
        const updatedRows = rows.map((row) => (row.id === updatedData.id ? updatedData : row));
        setRows(updatedRows);
    };

    const handleDeleteClick = (id) => {
        setId(id);
        setOpenCaptchaDialog(true);
    };

    const handleCsvFileNameChange = (event) => {
        setCsvFileName(event.target.value);
    };

    const handleOpenDownloadDialog = () => {
        setOpenDownloadDialog(true);
    };

    const handleCloseDownloadDialog = () => {
        setOpenDownloadDialog(false);
    };

    const handleDownloadCsv = () => {
        handleCloseDownloadDialog();
        handleExportCsv(csvFileName);
    };

    const handleCaptchaDialogConfirm = () => {
        setOpenCaptchaDialog(false);
        // Proceed with user deletion using the selectedUserIdForDeletion
        handleConfirmDelete(id);
    };

    const handleConfirmDelete = (id) => {
        const updatedRows = rows.filter((row) => row.id !== id);
        setRows(updatedRows);
    };

    const handleExportCsv = (fileName) => {
        const csvData = rows.map((row) => Object.values(row).join(',')).join('\n');
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    function CustomToolbar() {
        return (
            <GridToolbar
                toolbarButtons={[
                    <Button
                        key="export-csv"
                        style={{ fontSize: '13px' }}
                        variant="text"
                        startIcon={<DownloadIcon />}
                        onClick={handleOpenDownloadDialog}
                    >
                        Export CSV
                    </Button>
                ]}
            />
        );
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                density="compact"
                components={{
                    Toolbar: CustomToolbar
                }}
            />
            {selectedRow && (
                <Edit
                    mydata={{
                        sdata: selectedRow,
                        hcb: () => setSelectedRow(null),
                        handleSpotUpdate: handleSpotUpdate
                    }}
                />
            )}
            <Dialog open={openDownloadDialog} onClose={handleCloseDownloadDialog}>
                <DialogTitle>Enter CSV File Name</DialogTitle>
                <DialogContent>
                    <TextField id="csv-file-name" label="Enter Name" fullWidth value={csvFileName} onChange={handleCsvFileNameChange} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDownloadDialog}>Cancel</Button>
                    <Button onClick={handleDownloadCsv} color="primary">
                        Download
                    </Button>
                </DialogActions>
            </Dialog>

            <CaptchaDialog open={openCaptchaDialog} onClose={() => setOpenCaptchaDialog(false)} onDelete={handleCaptchaDialogConfirm} />
        </div>
    );
}
