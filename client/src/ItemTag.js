import React from "react";
import { FormControlLabel, Checkbox } from "@mui/material";

const Tag = ({ label, checked, onChange }) => {
    return (
        <FormControlLabel
            control={<Checkbox checked={checked} onChange={onChange} size="small" />}
            label={label}
            sx={{
                fontSize: '12px', // Adjust the font size of the label
                '& .MuiFormControlLabel-label': {
                    fontSize: '14px', // Adjust the font size of the label
                }
            }}
        />
    );
};

export default Tag;
