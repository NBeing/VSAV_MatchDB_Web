import * as React from 'react'
import { Routes, Route} from "react-router-dom";
// import { RequireAuth } from "@Components/auth/RequireAuth";
import Login from "@Pages/login/Login.component";
import { MatchList } from "@Pages/matchlist/MatchList.component";
import { AddMatch } from "@Pages/addmatch/AddMatch.component";
import { ROUTE_NAMES } from '@Routes/RouteNames.const';

const AppRoutes:React.FC = ():React.ReactElement => (
        <Routes>
            <Route path={`/${ROUTE_NAMES.LISTING}`} element={<MatchList />} />
            <Route path={`/${ROUTE_NAMES.LOGIN}`}   element={<Login />} />
            <Route path={`/${ROUTE_NAMES.ADD_MATCH}`}
                element={
                // <RequireAuth>
                    <AddMatch />
                // </RequireAuth>
                }
            />
      </Routes>
)

export {
    AppRoutes
}