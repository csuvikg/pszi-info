import {render, screen} from "@testing-library/react";
import {DrawerItemList} from "./DrawerItemList";
import {ITEM_TYPE} from "./DrawerItem";
import {HashRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "../../services/store";

test("renders items passed", () => {
    render(<HashRouter>
        <Provider store={store}>
            <DrawerItemList items={[
                {label: "Test1", type: ITEM_TYPE.ADMIN, path: "/test/1"},
                {label: "Test2", type: ITEM_TYPE.MAP, path: "/test/2"},
            ]}/>
        </Provider>
    </HashRouter>);

    expect(screen.getByText("Test1")).toBeInTheDocument();
    expect(screen.getByText("Test2")).toBeInTheDocument();
});
