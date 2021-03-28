import {FormControl, InputBase, MenuItem, Select, Typography, withStyles} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from "prop-types";


const SelectInputField = withStyles((theme) => ({
    root: {
        flex: 1,
        "label + &": {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        textAlign: "left",
        borderRadius: 4,
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        border: "1px solid #ced4da",
        fontSize: 16,
        padding: "10px 26px 10px 12px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        "&:focus": {
            borderRadius: 4,
            borderColor: "#80bdff",
            boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
        },
    },
}))(InputBase);

const useStyles = makeStyles(() => ({
    selectContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: "12px 0"
    },
    selectLabel: {
        paddingRight: "0.5rem",
        textAlign: "right",
        minWidth: "25%"
    }
}));

export const SelectInput = ({id, label, options, value, onChange}) => {
    const classes = useStyles();
    const handleChange = ({target: {value}}) => {
        onChange(value);
    }

    return <FormControl className={classes.selectContainer}>
        <Typography className={classes.selectLabel} color="textSecondary">{label}</Typography>
        <Select
            value={value}
            onChange={handleChange}
            input={<SelectInputField/>}
        >
            {options.map(({value, label}) => <MenuItem key={`${id}-${value}`} value={value}>{label}</MenuItem>)}
        </Select>
    </FormControl>
}

SelectInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    })).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}
