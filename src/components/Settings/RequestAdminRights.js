import React, { Component } from "react"
import { connect } from "react-redux"
import { Form, Field } from "react-final-form"

import history from "../../history"

import { requestAdminRights } from "../../actions/user"

export class RequestAdminRights extends Component {
    onSubmit = async (formValues) => {
        await this.props.requestAdminRights(formValues)
    }
    componentDidMount() {
        if (!this.props.auth.isSignedIn) {
            history.push("/signIn")
        }
    }
    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    {({ handleSubmit, submitting, pristine }) => (
                        <form onSubmit={handleSubmit}>
                            {" "}
                            <div>
                                <label>Request Access</label>
                                <br />
                                <Field name="request" component="select">
                                    <option value="Administrator">Administrator</option>
                                    <option value="Contributor">Contributor</option>
                                </Field>
                            </div>
                            <div>
                                <button type="submit" disabled={submitting || pristine}>
                                    Request
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

const mapDispatchToProps = { requestAdminRights }

export default connect(mapStateToProps, mapDispatchToProps)(RequestAdminRights)
