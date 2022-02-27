import * as React from 'react'
import { Routes, Route} from "react-router-dom";
import { RequireAuth } from "@Components/auth/RequireAuth";
import Login from "@Pages/login/Login.component";
import { MatchList } from "@Pages/matchlist/MatchList.component";
import AddMatch from "@Pages/addmatch/AddMatch.component";

const AppRoutes = () => (
        <Routes>
            <Route path="/listing" element={<MatchList />} />
            <Route path="/login" element={<Login />} />
            <Route
                path="/protected"
                element={
                <RequireAuth>
                    <AddMatch />
                </RequireAuth>
                }
            />
      </Routes>
)

export {
    AppRoutes
}