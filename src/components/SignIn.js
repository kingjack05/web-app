import React, { Component } from "react"
import { connect } from "react-redux"
import { Form, Field } from "react-final-form"

import { signIn } from "../actions/user"

export class SignIn extends Component {
    onSubmit = (formValues) => {
        this.props.signIn(formValues)
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    {({ handleSubmit, submitting, pristine }) => (
                        <form onSubmit={handleSubmit}>
                            {" "}
                            <div>
                                <label>Email</label>
                                <Field
                                    name="email"
                                    component="input"
                                    type="email"
                                    placeholder="Email"
                                ></Field>
                            </div>
                            <div>
                                <label>Password</label>
                                <Field
                                    name="password"
                                    component="input"
                                    type="password"
                                    placeholder="Password"
                                ></Field>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={submitting || pristine}
                                >
                                    Sign In
                                </button>
                            </div>
                        </form>
                    )}
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ auth: state.auth })

const mapDispatchToProps = { signIn }

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
