import React, { Component } from "react"
import { connect } from "react-redux"
import { Form, Field } from "react-final-form"

import history from "../history"
// Actions
import { signIn } from "../actions/user"
// Components
import styled from "styled-components"

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`
const Centered = styled.div`
    border: medium solid grey;
    border-radius: 30px;
    padding: 30px;
`
export class SignIn extends Component {
    onSubmit = (formValues) => {
        this.props.signIn(formValues)
    }
    render() {
        return (
            <Wrapper>
                <Centered>
                    <Form onSubmit={this.onSubmit}>
                        {({ handleSubmit, submitting, pristine }) => (
                            <form onSubmit={handleSubmit}>
                                {" "}
                                <div>
                                    <label>Email</label>
                                    <br />
                                    <Field name="email" component="input" type="email" placeholder="Email"></Field>
                                </div>
                                <div>
                                    <label>Password</label>
                                    <br />
                                    <Field
                                        name="password"
                                        component="input"
                                        type="password"
                                        placeholder="Password"
                                    ></Field>
                                </div>
                                <ButtonWrapper>
                                    <button type="submit" disabled={submitting || pristine}>
                                        Sign In
                                    </button>
                                    <button
                                        onClick={() => {
                                            history.push("/signUp")
                                        }}
                                    >
                                        Sign Up
                                    </button>
                                </ButtonWrapper>
                            </form>
                        )}
                    </Form>
                </Centered>
            </Wrapper>
        )
    }
}

const mapStateToProps = (state) => ({ auth: state.auth })

const mapDispatchToProps = { signIn }

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
