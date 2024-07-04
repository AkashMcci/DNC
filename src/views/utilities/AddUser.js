import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function HelperTextMisaligned() {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                '& > :not(style)': { m: 1 }
            }}
        >
            <TextField id="demo-helper-text-misaligned-no-helper" label="Email" />
            <Button variant="contained">Submit</Button>
        </Box>
    );
}
