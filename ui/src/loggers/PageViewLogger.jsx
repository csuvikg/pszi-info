import {useAnalytics} from "reactfire";
import {useEffect} from "react";
import "firebase/analytics";
import {useLocation} from "react-router";

export const PageViewLogger = () => {
    const {pathname} = useLocation();
    const analytics = useAnalytics();

    useEffect(() => {
        analytics.logEvent('page-view', {path_name: pathname});
    }, [pathname, analytics]);

    return null;
}
