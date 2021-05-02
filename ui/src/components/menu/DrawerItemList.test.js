import {render, screen} from "@testing-library/react";
import {DrawerItemList} from "./DrawerItemList";
import {ITEM_TYPE} from "./DrawerItem";
import {HashRouter} from "react-router-dom";

test("renders items passed", () => {
    render(<HashRouter>
        <DrawerItemList items={[
            {label: "Test1", type: ITEM_TYPE.ADMIN, path: "/test/1"},
            {label: "Test2", type: ITEM_TYPE.MAP, path: "/test/2"},
        ]}/>
    </HashRouter>);

    expect(screen.getByText("Test1")).toBeInTheDocument();
    expect(screen.getByText("Test2")).toBeInTheDocument();
});
