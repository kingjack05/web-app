import React from "react"
import { Router, Route, Switch } from "react-router-dom"

import history from "../history"
import Mainpage from "./Mainpage"
import SignIn from "./SignIn"
import Test from "./Test"
import PatientDetails from "./Patient/PatientDetails"

const App = () => {
    return (
        <div>
            <Router history={history}>
                <Switch>
                    <Route path="/" exact>
                        <Mainpage />
                    </Route>
                    <Route path="/test">
                        <Test />
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
