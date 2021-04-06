import {makeStyles} from "@material-ui/core/styles";
import {Card, CardContent, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    card: {
        height: "152px",
        [theme.breakpoints.up("xl")]: {
            height: "calc(100vh - 96px)",
        },
        transition: theme.transitions.create("height", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    }
}));

export const ProviderFilters = () => {
    const classes = useStyles();

    return <Card className={classes.card}>
        <CardContent>
            <Typography>
                Filter placeholder
                Switch to hide map below sm
            </Typography>
        </CardContent>
    </Card>
}
