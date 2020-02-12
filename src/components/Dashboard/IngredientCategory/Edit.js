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
import { getCategory } from 'selectors/ingredientCategory';

export class IngredientCategoryEdit extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    ingredientCategory: PropTypes.object.isRequired,
    layoutOptions: PropTypes.object.isRequired,
    ingredientCategoryId: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    const { actions, ingredientCategoryId } = this.props;

    actions.requestIngredientCategory(ingredientCategoryId);
  }

  handleSubmit({ name, ordinal, description }) {
    const { actions, ingredientCategoryId } = this.props;

    actions.updateIngredient({
      ingredientCategoryId,
      name,
      ordinal,
      description
    });
    actions.selectDashboard({ name: 'Safety' });
  }

  render() {
    const {
      ingredientCategory,
      ingredientCategoryId,
      layoutOptions
    } = this.props;
    const { id, name, ordinal, description } = ingredientCategory;

    return (
      <Layout
        pageTitle="Edit Ingredient Category - Dashboard"
        header={
          ingredientCategory.name
            ? `Flavor Safety > Category Editor > ${ingredientCategory.name}`
            : `Flavor Safety > Category Editor > ${ingredientCategoryId}`
        }
        options={layoutOptions}
      >
        <FontAwesomeIcon icon="chevron-left" /> &nbsp;
        <DashLink to="#flavor-safety/categories" name="Ingredient/Categories">
          <span>Back</span>
        </DashLink>
        {ingredientCategory.id ? (
          <FinalForm
            onSubmit={this.handleSubmit}
            initialValues={{
              id,
              name,
              ordinal,
              description
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
        ) : null}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  ingredientCategory: getCategory(state)
});

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
  mapStateToProps,
  mapDispatchToProps
)(IngredientCategoryEdit);
