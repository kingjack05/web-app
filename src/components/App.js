import React from "react"
import { Router, Route, Switch, NavLink, Link } from "react-router-dom"

import history from "../history"
import Mainpage from "./Mainpage"
import SignIn from "./SignIn"
import PatientDetails from "./Patient/PatientDetails"

const App = () => {
    return (
        <div>
            <Router history={history}>
                <Switch>
                    <Route path="/" exact>
                        <Mainpage />
                    </Route>
                    <Route path="/signIn">
                        <SignIn />
                    </Route>
                    <Route
                        path="/patient/:id"
                        render={(match) => {
                            return <PatientDetails />
                        }}
                    ></Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App
