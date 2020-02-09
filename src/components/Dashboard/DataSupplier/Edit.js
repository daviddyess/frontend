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

import { actions as dataSuppliersActions } from 'reducers/dataSuppliers';
import { actions as dashActions } from 'reducers/dashboard';
import { getDataSupplier } from 'selectors/dataSuppliers';

export class DataSupplierEdit extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    dataSupplier: PropTypes.object.isRequired,
    layoutOptions: PropTypes.object.isRequired,
    dataSupplierId: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    const { actions, dataSupplierId } = this.props;

    actions.requestDataSupplier(dataSupplierId);
  }

  handleSubmit({ name, code }) {
    const { actions, dataSupplierId } = this.props;

    actions.updateDataSupplier({
      dataSupplierId,
      name,
      code
    });
    actions.selectDashboard({ name: 'DataSuppliers' });
  }

  render() {
    const { dataSupplier, dataSupplierId, layoutOptions } = this.props;
    const { code, id, name } = dataSupplier;

    return (
      <Layout
        pageTitle="Edit DataSupplier - Dashboard"
        header={
          dataSupplier.name
            ? `Data Suppliers > Editor > ${dataSupplier.name}`
            : `Data Suppliers > Editor > ${dataSupplierId}`
        }
        options={layoutOptions}
      >
        <FontAwesomeIcon icon="chevron-left" /> &nbsp;
        <DashLink to="#data-suppliers" name="DataSuppliers">
          <span>Back</span>
        </DashLink>
        {dataSupplier.name ? (
          <FinalForm
            onSubmit={this.handleSubmit}
            initialValues={{
              id,
              name,
              code
            }}
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
        ) : null}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  dataSupplier: getDataSupplier(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...dataSuppliersActions,
      ...dashActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataSupplierEdit);
