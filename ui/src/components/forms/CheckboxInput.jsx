import {Checkbox, FormControlLabel} from "@material-ui/core";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down("xs")]: {
            width: "100%"
        }
    }
}));

export const CheckboxInput = ({label, value, onChange}) => {
    const classes = useStyles();

    return <FormControlLabel
        className={classes.container}
        label={label}
        control={<Checkbox color="primary"
                           checked={value}
                           onChange={({target: {checked}}) => onChange(checked)}
        />}
    />
}

CheckboxInput.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired
}
