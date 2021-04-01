import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    container: {
        textAlign: "center",
        justifyContent: "center"
    }
}));

export const ListProviders = () => {
    const classes = useStyles();

    return <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12} md={8} lg={6}>
            Test
        </Grid>
    </Grid>
}
