import {useEffect, useState} from 'react';
import Page from "./Page";

const App = () => {
    const [isGeolocationEnabled, setGeolocationEnabled] = useState(false);
    useEffect(() => {
        (async () => await getGeolocationStatus())()
    }, []);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(console.log);
        }
    }

    const getGeolocationStatus = async () => {
        if (navigator.permissions) {
            const result = await navigator.permissions.query({name: 'geolocation'});
            setGeolocationEnabled(result.state === 'granted');
            result.onchange = e => setGeolocationEnabled(e.target.state === 'granted');
        }
    }

    return (
        <Page title="Intézménykereső"/>
        // <Grid container justify='center'>
        //     <Grid direction='column'>
        //         <Typography variant="h4">
        //             Geolocation is {isGeolocationEnabled ? 'enabled' : 'disabled'}
        //         </Typography>
        //         <Grid container justify='center'>
        //             <Button variant='contained' color='primary' onClick={getLocation}>Get position</Button>
        //         </Grid>
        //     </Grid>
        // </Grid>
    );
}

export default App;
