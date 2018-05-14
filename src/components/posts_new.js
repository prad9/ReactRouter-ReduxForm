import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions";

class PostsNew extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        //... is the JSX shorthand form of wiring field.input props to input props
        //e.g. onChange = field.input.onChange, ..
        return (
            <div className={className}>
                <label>{field.labelToShow}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                {touched ? error : ""}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            //This prop history is passed by react Route automatically when we configure route for this component
            this.props.history.push("/");
        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    labelToShow="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    labelToShow="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    labelToShow="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    if (!values.title) {
        errors.title = "Enter a title!";
    }

    if (!values.categories) {
        errors.categories = "Enter some categories";
    }

    if (!values.content) {
        errors.content = "Enter some content please";
    }

    //If errors is empty, the form is fine to submit
    return errors;
}

//form key below is the name of the form. Make sure to have the form value to be unique.
export default reduxForm({
    validate,
    form: "PostsNewForm"
})(
   connect(null, { createPost })(PostsNew)
);