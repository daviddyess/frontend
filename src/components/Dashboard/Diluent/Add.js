import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, Col, Form } from 'react-bootstrap';
import {
  DashboardLink as DashLink,
  DashboardLayout as Layout
} from 'components/Dashboard/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { actions as diluentsActions } from 'reducers/diluents';
import { actions as dashActions } from 'reducers/dashboard';

export class DiluentAdd extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    layoutOptions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ name, slug, code, density }) {
    const { actions } = this.props;

    actions.createDiluent({ name, slug, code, density });
    actions.selectDashboard({ name: 'Diluents' });
  }

  render() {
    const { layoutOptions } = this.props;

    return (
      <Layout
        pageTitle="Add Diluent - Dashboard"
        header="Ingredients &gt; Diluents &gt; Add Diluent"
        options={layoutOptions}
      >
        <FontAwesomeIcon icon="chevron-left" /> &nbsp;
        <DashLink to="#diluents" name="Diluents">
          <span>Back</span>
        </DashLink>
        <FinalForm
          onSubmit={this.handleSubmit}
          render={({ handleSubmit, submitting, values }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <Field name="name" required="true">
                  {({ input, meta }) => (
                    <Form.Group as={Col} controlId="formGridName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        {...input}
                        type="text"
                        isInvalid={meta.error}
                      />
                      {meta.error && (
                        <Form.Control.Feedback type="invalid">
                          {meta.error === 'required'
                            ? 'This field is required'
                            : ''}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  )}
                </Field>

                <Field name="slug" required="true">
                  {({ input, meta }) => (
                    <Form.Group as={Col} controlId="formGridSlug">
                      <Form.Label>Slug</Form.Label>
                      <Form.Control
                        {...input}
                        type="text"
                        isInvalid={meta.error}
                      >
                        {meta.error && (
                          <Form.Control.Feedback type="invalid">
                            {meta.error === 'required'
                              ? 'This field is required'
                              : ''}
                          </Form.Control.Feedback>
                        )}
                      </Form.Control>
                    </Form.Group>
                  )}
                </Field>
              </Form.Row>
              <Form.Row>
                <Field name="code" required="true">
                  {({ input, meta }) => (
                    <Form.Group as={Col} controlId="formGridCode">
                      <Form.Label>Code</Form.Label>
                      <Form.Control
                        {...input}
                        type="text"
                        isInvalid={meta.error}
                      >
                        {meta.error && (
                          <Form.Control.Feedback type="invalid">
                            {meta.error === 'required'
                              ? 'This field is required'
                              : ''}
                          </Form.Control.Feedback>
                        )}
                      </Form.Control>
                    </Form.Group>
                  )}
                </Field>
                <Field name="density" required="true">
                  {({ input, meta }) => (
                    <Form.Group as={Col} controlId="formGridDensity">
                      <Form.Label>Density</Form.Label>
                      <Form.Control
                        {...input}
                        type="number"
                        min="0.499"
                        max="1.999"
                        step="0.001"
                        isInvalid={meta.error}
                      >
                        {meta.error && (
                          <Form.Control.Feedback type="invalid">
                            {meta.error === 'required'
                              ? 'This field is required'
                              : ''}
                          </Form.Control.Feedback>
                        )}
                      </Form.Control>
                    </Form.Group>
                  )}
                </Field>
              </Form.Row>
              <Button
                className="button-animation"
                variant="primary"
                type="submit"
                disabled={submitting}
              >
                <span>Save</span>
              </Button>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </Form>
          )}
        />
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...diluentsActions,
      ...dashActions
    },
    dispatch
  )
});

export default connect(
  null,
  mapDispatchToProps
)(DiluentAdd);
