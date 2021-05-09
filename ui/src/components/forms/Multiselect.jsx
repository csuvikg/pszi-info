import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import {Checkbox, FormControl, Input, InputLabel, ListItemText, MenuItem, Select} from "@material-ui/core";

const useStyles = makeStyles(() => ({
    container: {
        margin: "0.5rem",
        width: "calc(100% - 1rem)"
    }
}));

export const Multiselect = ({id, label, options, value, onChange}) => {
    const classes = useStyles();

    return <FormControl className={classes.container}>
        <InputLabel id={`${id}-label`}>{label}</InputLabel>
        <Select
            labelId={`${id}-label`}
            id={`${id}-select`}
            multiple
            value={value}
            onChange={({target: {value}}) => onChange(value)}
            input={<Input/>}
            renderValue={(selected) => selected.map(v => options.find(opt => opt.value === v).label).join(', ')}
        >
            {options.map(({label, value: _value}) => (
                <MenuItem key={_value} value={_value}>
                    <Checkbox color="primary" checked={value.includes(_value)}/>
                    <ListItemText primary={label}/>
                </MenuItem>
            ))}
        </Select>
    </FormControl>
}

Multiselect.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    })).isRequired,
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired
}
