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

import { actions as ingredientCategoryActions } from 'reducers/ingredientCategory';
import { actions as dashActions } from 'reducers/dashboard';

export class IngredientCategoryAdd extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    layoutOptions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit({ name, ordinal, description }) {
    const { actions } = this.props;

    actions.createIngredientCategory({
      name,
      ordinal,
      description
    });
    actions.selectDashboard({ name: 'Ingredient/Categories' });
  }

  render() {
    const { layoutOptions } = this.props;

    return (
      <Layout
        pageTitle="Add Category - Dashboard"
        header="Flavor Safety &gt; Add Category"
        options={layoutOptions}
      >
        <FontAwesomeIcon icon="chevron-left" /> &nbsp;
        <DashLink to="#flavor-safety/categories" name="Ingredient/Categories">
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
                <Field name="ordinal" required="true">
                  {({ input, meta }) => (
                    <Form.Group as={Col} controlId="formGridOrdinal">
                      <Form.Label>Ordinal</Form.Label>
                      <Form.Control
                        {...input}
                        type="number"
                        min="0"
                        max="99"
                        step="1"
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
                <Field name="description" required="true">
                  {({ input, meta }) => (
                    <Form.Group as={Col} controlId="formGridDescription">
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        {...input}
                        as="textarea"
                        rows="2"
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
      ...ingredientCategoryActions,
      ...dashActions
    },
    dispatch
  )
});

export default connect(
  null,
  mapDispatchToProps
)(IngredientCategoryAdd);
