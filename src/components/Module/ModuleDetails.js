import React, { Component } from "react"
import { connect } from "react-redux"
import { Form, Field } from "react-final-form"
import arrayMutators from "final-form-arrays"
import { FieldArray } from "react-final-form-arrays"
import styled from "styled-components"

import { readModule, updateModule } from "../../actions/module"

import StandardBlock from "./StandardBlock"
import ExportsWrapper from "./ExportsWrapper"

const Wrapper = styled.div``
const StandardBlockAdapter = ({ input }) => {
    return <StandardBlock value={input.value} onChange={input.onChange} />
}
const ExportsWrapperAdapter = ({ input }) => {
    return <ExportsWrapper value={input.value} onChange={input.onChange} />
}

export class ModuleDetails extends Component {
    handleonSubmit = async (formValues) => {
        await this.props.updateModule(formValues, {
            category: this.props.public + this.props.category,
            id: this.props.id,
        })
    }
    componentDidMount() {
        this.props.readModule({ ...this.props.module.moduleListState, id: this.props.id })
    }
    render() {
        return (
            <div>
                <Form
                    initialValues={this.props.module.moduleData}
                    onSubmit={this.handleonSubmit}
                    mutators={{
                        ...arrayMutators,
                    }}
                    render={({
                        handleSubmit,
                        form,
                        submitting,
                        pristine,
                        values,
                        form: {
                            mutators: { push, pop },
                        },
                    }) => {
                        return (
                            <div>
                                <Field name="name" component="input" placeholder="Module Name" />
                                <button type="button" onClick={() => push("content", undefined)}>
                                    Add block
                                </button>
                                <FieldArray name="content">
                                    {({ fields }) =>
                                        fields.map((name, index) => (
                                            <Wrapper key={index}>
                                                <Field
                                                    name={name}
                                                    component={StandardBlockAdapter}
                                                />
                                            </Wrapper>
                                        ))
                                    }
                                </FieldArray>
                                <button type="button" onClick={() => push("exports", undefined)}>
                                    Add exports
                                </button>
                                <FieldArray name="exports">
                                    {({ fields }) =>
                                        fields.map((name, index) => (
                                            <Wrapper key={index}>
                                                <Field
                                                    name={name}
                                                    component={ExportsWrapperAdapter}
                                                />
                                            </Wrapper>
                                        ))
                                    }
                                </FieldArray>
                                {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={submitting || pristine}
                                >
                                    {submitting ? "Submitting" : "Save"}
                                </button>
                            </div>
                        )
                    }}
                ></Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({ module: state.module })

const mapDispatchToProps = {
    readModule,
    updateModule,
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleDetails)
