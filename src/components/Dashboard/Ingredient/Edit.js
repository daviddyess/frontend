import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Alert, Button, Col, Form } from 'react-bootstrap';
import {
  DashboardLink as DashLink,
  DashboardLayout as Layout
} from 'components/Dashboard/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { actions as ingredientsActions } from 'reducers/ingredients';
import { actions as ingredientCategoriesActions } from 'reducers/ingredientCategories';
import { actions as dashActions } from 'reducers/dashboard';
import { getIngredient } from 'selectors/ingredients';
import { getAllIngredientCategories } from 'selectors/ingredientCategories';

export class IngredientEdit extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    ingredient: PropTypes.object.isRequired,
    ingredientCategories: PropTypes.array.isRequired,
    layoutOptions: PropTypes.object.isRequired,
    ingredientId: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);

    const { actions, ingredientId } = this.props;

    actions.requestIngredient(ingredientId);
    actions.requestIngredientCategories({ limit: 100, page: 1 });
  }

  handleSubmit({ name, casNumber, ingredientCategoryId, notes }) {
    const { actions, ingredientId } = this.props;

    actions.updateIngredient({
      ingredientId,
      name,
      casNumber,
      ingredientCategoryId,
      notes
    });
    actions.selectDashboard({ name: 'Safety' });
  }

  render() {
    const {
      ingredient,
      ingredientCategories,
      ingredientId,
      layoutOptions
    } = this.props;
    const { id, name, casNumber, ingredientCategoryId, notes } = ingredient;

    return (
      <Layout
        pageTitle="Edit Ingredient - Dashboard"
        header={
          ingredient.name
            ? `Flavor Safety > Ingredient Editor > ${ingredient.name}`
            : `Flavor Safety > Ingredient Editor > ${ingredientId}`
        }
        options={layoutOptions}
      >
        <FontAwesomeIcon icon="chevron-left" /> &nbsp;
        <DashLink to="#flavor-safety" name="Ingredients">
          <span>Back</span>
        </DashLink>
        {ingredient.id ? (
          <FinalForm
            onSubmit={this.handleSubmit}
            initialValues={{
              id,
              name,
              casNumber,
              ingredientCategoryId,
              notes
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
                </Form.Row>
                <Form.Row>
                  <Field name="casNumber" required="true">
                    {({ input, meta }) => (
                      <Form.Group as={Col} controlId="formGridCasNumber">
                        <Form.Label>CAS</Form.Label>
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
                  <Field name="ingredientCategoryId" required="true">
                    {({ input, meta }) => (
                      <Form.Group as={Col} controlId="formGridCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control {...input} as="select">
                          {ingredientCategories.map((category, index) => {
                            return (
                              <option value={category.id} key={index}>
                                {category.name}
                              </option>
                            );
                          })}
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
                {values.ingredientCategoryId
                  ? ingredientCategories.map(category => {
                      if (category.id === Number(values.ingredientCategoryId)) {
                        return (
                          <Alert variant="info">{category.description}</Alert>
                        );
                      }
                    })
                  : null}
                <Form.Row>
                  <Field name="notes" required="false">
                    {({ input, meta }) => (
                      <Form.Group as={Col} controlId="formGridNotes">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                          {...input}
                          as="textarea"
                          rows="4"
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
                <pre>{JSON.stringify(ingredientCategories, 0, 2)}</pre>
              </Form>
            )}
          />
        ) : null}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  ingredient: getIngredient(state),
  ingredientCategories: getAllIngredientCategories(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...ingredientsActions,
      ...ingredientCategoriesActions,
      ...dashActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IngredientEdit);
