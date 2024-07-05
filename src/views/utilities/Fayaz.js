import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MainCard from 'ui-component/cards/MainCard';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import { Link as RouterLink } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import HomeIcon from '@mui/icons-material/Home';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { DataGrid } from '@mui/x-data-grid';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import User from './User';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AddUser from './AddUser';

export default function Fayaz() {
    const [currentTab, setCurrentTab] = React.useState('User');
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (newValue == 1) setCurrentTab('User');
        else setCurrentTab('Add User');
    };

    const breadcrumbs = (
        <>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <RouterLink color="inherit" to="/">
                    {' '}
                    <HomeIcon fontSize="small" />
                </RouterLink>
                <Typography variant="body2" color="text.primary">
                    Organization
                </Typography>
                <Typography variant="body2" color="text.primary">
                    {currentTab}
                </Typography>
            </Breadcrumbs>
        </>
    );
    return (
        <MainCard title="Fayaz" breadcrumbs={breadcrumbs}>
            {/* <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 }
                        }
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div> */}
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="User" icon={<AccountCircleOutlinedIcon />} value="1" />
                            <Tab label="Add user" icon={<AddCircleOutlinedIcon />} value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">{<User />}</TabPanel>
                    <TabPanel value="2">{<AddUser />}</TabPanel>
                </TabContext>
            </Box>
        </MainCard>
    );
}
