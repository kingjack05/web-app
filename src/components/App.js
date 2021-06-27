import React from "react"
import { Router, Route, Switch, Link, NavLink } from "react-router-dom"

import history from "../history"
//Components
import Mainpage from "./Mainpage"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
import Test from "./Test"
import PatientDetails from "./Patient/PatientDetails"
import MyModules from "./Module/MyModules"
import ModuleDetails from "./Module/ModuleDetails"
import CreateModule from "./Module/Create"
import Settings from "./Settings/Settings"
import RequestAdminRights from "./Settings/RequestAdminRights"
import BrowseDatapoint from "./Browse/BrowseDatapoint"
import DatapointDetails from "./Browse/DatapointDetails"
import CreateDatapoint from "./Admin/CreateDatapoint"

import styled from "styled-components"

const Wrapper = styled.div`
    display: grid;
    place-items: center;
    grid-template-rows: auto 1fr auto;
    height: 100%;
`
const NavUnlisted = styled.ul`
    display: flex;
    a {
        text-decoration: none;
    }
    li {
        color: blueviolet;
        margin: 0 0.8rem;
        font-size: 1.2rem;
        position: relative;
        list-style: none;
    }
    li ul {
        visibility: hidden;
        opacity: 0;
        position: absolute;
        padding: 1rem 0rem;
        left: 0;
        display: none;
    }
    li:hover > ul,
    li ul:hover {
        visibility: visible;
        opacity: 1;
        display: block;
    }
    li ul li {
        clear: both;
        margin: 0px;
        width: 100%;
        min-width: 10rem;
        font-size: 1rem;
        list-style: none;
    }
    .current {
        li {
            border-bottom: 2px solid black;
        }
    }
`

const headerlinks = [
    { name: "Home", path: "/" },
    { name: "Settings", path: "/settings" },
]
const footerlinks = [{ name: "About", path: "/about" }]

const App = () => {
    return (
        <Wrapper>
            <Router history={history}>
                <header>
                    {""}
                    <NavUnlisted>
                        {headerlinks.map((link, index) => (
                            <NavLink key={index} to={link.path} exact activeClassName="current">
                                <li>{link.name}</li>
                            </NavLink>
                        ))}
                        <li>
                            <Link to="/browse">Browse</Link>
                            <ul>
                                <li>
                                    <Link to="/browse/datapoint">Datapoint</Link>
                                </li>
                                <li>
                                    <Link to="/browse/diagnosis">Diagnosis</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link to="/myModules">Modules</Link>
                            <ul>
                                <li>
                                    <Link to="/createModule">New</Link>
                                </li>
                                <li>
                                    <Link to="/test">Test</Link>
                                </li>
                            </ul>
                        </li>
                    </NavUnlisted>
                </header>

                <Switch>
                    {/* Routes ordered alphabetically */}
                    <Route path="/" exact>
                        <Mainpage />
                    </Route>
                    <Route path="/admin/create/datapoint">
                        <CreateDatapoint />
                    </Route>
                    <Route
                        path="/browse/datapoint/:id"
                        render={({ match }) => {
                            return <DatapointDetails id={match.params.id} />
                        }}
                    />
                    <Route path="/browse/datapoint">
                        <BrowseDatapoint />
                    </Route>
                    <Route path="/createModule">
                        <CreateModule />
                    </Route>
                    <Route
                        path="/module/:public/:category/:id"
                        render={({ match }) => {
                            return (
                                <ModuleDetails
                                    id={match.params.id}
                                    category={match.params.category}
                                    public={match.params.public}
                                />
                            )
                        }}
                    ></Route>
                    <Route path="/myModules">
                        <MyModules />
                    </Route>
                    <Route
                        path="/patient/:id"
                        render={({ match }) => {
                            return <PatientDetails id={match.params.id} />
                        }}
                    ></Route>
                    <Route path="/requestadminrights">
                        <RequestAdminRights />
                    </Route>
                    <Route path="/settings">
                        <Settings />
                    </Route>
                    <Route path="/signIn">
                        <SignIn />
                    </Route>
                    <Route path="/signUp">
                        <SignUp />
                    </Route>
                    <Route path="/test">
                        <Test />
                    </Route>
                </Switch>

                <footer>
                    <NavUnlisted>
                        {footerlinks.map((link, index) => (
                            <NavLink key={index} to={link.path} exact activeClassName="current">
                                <li>{link.name}</li>
                            </NavLink>
                        ))}
                    </NavUnlisted>
                </footer>
            </Router>
        </Wrapper>
    )
}

export default App
