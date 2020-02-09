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

import { actions as flavorsActions } from 'reducers/flavors';
import { actions as dashActions } from 'reducers/dashboard';

export class FlavorAdd extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    layoutOptions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ name, vendorId, slug, density }) {
    const { actions } = this.props;

    actions.createFlavor({ name, vendorId, slug, density });
    actions.selectDashboard({ name: 'Flavors' });
  }

  render() {
    const { layoutOptions } = this.props;

    return (
      <Layout
        pageTitle="Add Flavor - Dashboard"
        header="Flavors &gt; Add Flavor"
        options={layoutOptions}
      >
        <FontAwesomeIcon icon="chevron-left" /> &nbsp;
        <DashLink to="#flavors" name="Flavors">
          <span>Back</span>
        </DashLink>
        <FinalForm
          onSubmit={this.handleSubmit}
          render={({ handleSubmit, submitting, values }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <Field name="vendorId" required="true">
                  {({ input, meta }) => (
                    <Form.Group as={Col} controlId="formGridVendor">
                      <Form.Label>Vendor</Form.Label>
                      <Form.Control {...input} as="select">
                        <option value="1">Capella</option>
                        <option value="2">Flavorah</option>
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
              </Form.Row>
              <Form.Row>
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
                <Field name="density" required="false">
                  {({ input }) => (
                    <Form.Group as={Col} controlId="formGridDensity">
                      <Form.Label>Density</Form.Label>
                      <Form.Control
                        {...input}
                        type="number"
                        min="0.499"
                        max="1.999"
                        step="0.001"
                      />
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
      ...flavorsActions,
      ...dashActions
    },
    dispatch
  )
});

export default connect(
  null,
  mapDispatchToProps
)(FlavorAdd);
