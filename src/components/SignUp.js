import React, { Component } from "react"
import { connect } from "react-redux"
import { Form, Field } from "react-final-form"
import styled from "styled-components"
// Actions
import { signUp } from "../actions/user"

const Wrapper = styled.div`
    border: medium solid grey;
    border-radius: 30px;
    padding: 30px;
    min-width: 270px;
`
const ErrorWrapper = styled.div`
    display: block;
    color: red;
`

export class SignUp extends Component {
    onSubmit = async (formValues) => {
        await this.props.signUp(formValues)
    }
    validatePassword = (value) => (!value || value.length >= 8 ? undefined : "Password needs to be over 8 characters")
    render() {
        return (
            <Wrapper>
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
                                <Field name="password" validate={this.validatePassword}>
                                    {({ input, meta }) => (
                                        <div>
                                            <label>Password</label>
                                            <br />
                                            <input {...input} type="password" placeholder="Password" />
                                            {meta.error && meta.touched && <ErrorWrapper>{meta.error}</ErrorWrapper>}
                                        </div>
                                    )}
                                </Field>
                            </div>
                            <div>
                                <button type="submit" disabled={submitting || pristine}>
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    )}
                </Form>
            </Wrapper>
        )
    }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = { signUp }

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
