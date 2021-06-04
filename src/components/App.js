import React from "react"
import { Router, Route, Switch, Link, NavLink } from "react-router-dom"

import history from "../history"
import Mainpage from "./Mainpage"
import SignIn from "./SignIn"
import Test from "./Test"
import PatientDetails from "./Patient/PatientDetails"
import CreateModule from "./Module/Create"
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

const headerlinks = [{ name: "Home", path: "/" }]
const footerlinks = [{ name: "About", path: "/about" }]

const App = () => {
    return (
        <Wrapper>
            <Router history={history}>
                <header>
                    {""}
                    <NavUnlisted>
                        {headerlinks.map((link, index) => (
                            <NavLink
                                key={index}
                                to={link.path}
                                exact
                                activeClassName="current"
                            >
                                <li>{link.name}</li>
                            </NavLink>
                        ))}
                        <li>
                            <Link to="/createModule">Create...</Link>
                            <ul>
                                <li>
                                    <Link to="/createModule">
                                        Create Module
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/">Test</Link>
                                </li>
                                <li>
                                    <Link to="/">Test</Link>
                                </li>
                            </ul>
                        </li>
                    </NavUnlisted>
                </header>

                <Switch>
                    <Route path="/" exact>
                        <Mainpage />
                    </Route>
                    <Route path="/createModule">
                        <CreateModule />
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

                <footer>
                    <NavUnlisted>
                        {footerlinks.map((link, index) => (
                            <NavLink
                                key={index}
                                to={link.path}
                                exact
                                activeClassName="current"
                            >
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
