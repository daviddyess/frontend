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
import { getDiluent } from 'selectors/diluents';

export class DiluentEdit extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    diluent: PropTypes.object.isRequired,
    layoutOptions: PropTypes.object.isRequired,
    diluentId: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    const { actions, diluentId } = this.props;

    actions.requestDiluent(diluentId);
  }

  handleSubmit({ name, slug, code, density }) {
    const { actions, diluentId } = this.props;

    actions.updateDiluent({ diluentId, name, slug, code, density });
    actions.selectDashboard({ name: 'Diluents' });
  }

  render() {
    const { diluent, diluentId, layoutOptions } = this.props;
    const { id, name, slug, code, density } = diluent;

    return (
      <Layout
        pageTitle="Edit Diluent - Dashboard"
        header={
          diluent.name
            ? `Ingredients > Diluents > Editor > ${diluent.name}`
            : `Ingredients > Diluents > Editor > ${diluentId}`
        }
        options={layoutOptions}
      >
        <FontAwesomeIcon icon="chevron-left" /> &nbsp;
        <DashLink to="#diluents" name="Diluents">
          <span>Back</span>
        </DashLink>
        {diluent.id ? (
          <FinalForm
            onSubmit={this.handleSubmit}
            initialValues={{
              id,
              name,
              slug,
              code,
              density
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
                  </Form.Row>
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
        ) : null}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  diluent: getDiluent(state)
});

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
  mapStateToProps,
  mapDispatchToProps
)(DiluentEdit);
