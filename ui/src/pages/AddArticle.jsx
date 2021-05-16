import {Button, Grid, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useMemo, useRef, useState} from "react";
import {useDebouncedCallback} from "use-debounce";
import JoditEditor from "jodit-react";
import {useDispatch} from "react-redux";
import {createArticle} from "../services";

const useStyles = makeStyles((theme) => ({
    buttonGroup: {
        textAlign: "right",
        padding: "1rem 0"
    },
    container: {
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto"
    },
    titleInput: {
        margin: "1rem 0"
    }
}));

export const AddArticle = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const editor = useRef(null)
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const setContentDebounced = useDebouncedCallback((value) => {
        setContent(value);
    }, 2000);

    // todo: redirect to articles
    const handleSave = () => dispatch(createArticle({
        title,
        content
    }));

    const config = useMemo(() => {
        return {
            readonly: false, // all options from https://xdsoft.net/jodit/doc/
            language: "hu",
            uploader: {
                insertImageAsBase64URI: true
            }
        }
    }, []);

    return <Grid container className={classes.container}>
        <Grid item xs={12} md={10} lg={8}>
            <TextField required
                       className={classes.titleInput}
                       fullWidth
                       id="title"
                       variant="outlined"
                       size="small"
                       label="Cím"
                       value={title}
                       onChange={({target: {value}}) => setTitle(value)}
            />
        </Grid>
        <Grid item xs={12} md={10} lg={8}>
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1}
                onChange={setContentDebounced}
            />
        </Grid>
        <Grid item xs={12} md={10} lg={8} className={classes.buttonGroup}>
            <Button color="primary" variant="contained" onClick={handleSave}>Mentés</Button>
        </Grid>
    </Grid>
}
