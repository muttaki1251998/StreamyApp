import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

  renderError({ touched, error }) {
    if (touched && error) {
      return (
        <div className="ui message error">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderForm = (formProps) => {
    return (
      <div className="field">
        <label>{formProps.label}</label>
        <input {...formProps.input} autoComplete="off" />
        {this.renderError(formProps.meta)}
      </div>
    );
  }

  onSubmit = (formProps) => {
    this.props.onSubmit(formProps);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
        <Field name="title" component={this.renderForm} label="Title" />
        <Field name="description" component={this.renderForm} label="Description" />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validateForm = formValues => {

  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title"
  }

  if (!formValues.description) {
    errors.description = "You must enter a description"
  }

  return errors;
}

// Hooking up redux-form
export default reduxForm({
  form: 'streamForm',
  validate: validateForm
})(StreamForm);

