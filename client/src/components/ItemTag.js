import React from "react";
import { Form } from "react-bootstrap";

const Tag = ({ label, checked, onChange }) => {
    return (
        <Form.Check 
            type="checkbox"
            id={`checkbox-${label}`}
            label={label}
            checked={checked}
            onChange={onChange}
            custom // This prop makes it use the Bootstrap custom checkbox style
            size="sm" // React-Bootstrap doesn't support direct size control in Form.Check, handled via CSS if needed
        />
    );
};

export default Tag;
