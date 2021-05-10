import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@material-ui/core";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        margin: "0.5rem"
    },
    checkboxGroup: {
        flexDirection: "row",
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column",
            paddingLeft: "0.5rem"
        },
        justifyContent: "center"
    }
}));

export const CheckboxGroup = ({label, options, value, onChange}) => {
    const classes = useStyles();

    const handleChange = ({target}, shouldAdd) => {
        onChange(
            shouldAdd
                ? [...value, target.value]
                : value.filter(v => v !== target.value)
        );
    }

    return <FormControl component="fieldset" fullWidth className={classes.container}>
        <FormLabel component="legend">{label}</FormLabel>
        <FormGroup className={classes.checkboxGroup}>
            {options.map(option =>
                <FormControlLabel
                    control={<Checkbox color="primary"
                                       checked={value.includes(option.value)}
                                       onChange={handleChange}
                                       name={option.value}/>}
                    label={option.label} value={option.value} key={option.value}
                />
            )}
        </FormGroup>
    </FormControl>
}

CheckboxGroup.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    })).isRequired,
    value: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
}
