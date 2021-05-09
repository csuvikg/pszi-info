import {useAnalytics} from "reactfire";
import {useEffect} from "react";

export const PageViewLogger = (location) => {
    const analytics = useAnalytics();

    useEffect(() => {
        analytics.logEvent('page-view', {path_name: location.pathname});
    }, [location.pathname, analytics]);

    return null;
}
