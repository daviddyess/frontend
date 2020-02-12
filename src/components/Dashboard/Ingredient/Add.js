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
import { getAllIngredientCategories } from 'selectors/ingredientCategories';

export class IngredientAdd extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    ingredientCategories: PropTypes.array.isRequired,
    layoutOptions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    const { actions } = this.props;

    this.handleSubmit = this.handleSubmit.bind(this);
    actions.requestIngredientCategories({ limit: 100, page: 1 });
  }

  handleSubmit({ name, casNumber, ingredientCategoryId, notes }) {
    const { actions } = this.props;

    actions.createIngredient({ name, casNumber, ingredientCategoryId, notes });
    actions.selectDashboard({ name: 'Safety' });
  }

  render() {
    const { ingredientCategories, layoutOptions } = this.props;

    return (
      <Layout
        pageTitle="Add Ingredient - Dashboard"
        header="Flavor Safety &gt; Add Ingredient"
        options={layoutOptions}
      >
        <FontAwesomeIcon icon="chevron-left" /> &nbsp;
        <DashLink to="#ingredients" name="Ingredients">
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
                        {!values.ingredientCategoryId ? (
                          <option value={false}>Select a Category</option>
                        ) : null}
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
            </Form>
          )}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
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
)(IngredientAdd);
