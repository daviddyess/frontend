import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Table } from 'react-bootstrap';
import {
  DashboardLink as DashLink,
  DashboardLayout as Layout
} from 'components/Dashboard/';
import { PagerInfo, withPagination } from 'components/Pagination';
import { actions as ingredientsActions } from 'reducers/ingredients';
import { getAllIngredients, getIngredientsPager } from 'selectors/ingredients';

export class Ingredients extends Component {
  static propTypes = {
    layoutOptions: PropTypes.object.isRequired,
    collection: PropTypes.array.isRequired,
    pager: PropTypes.object.isRequired,
    pagerNavigation: PropTypes.node.isRequired
  };

  render() {
    const { collection, layoutOptions, pager, pagerNavigation } = this.props;

    return (
      <Layout
        pageTitle="Flavor Safety - Dashboard"
        header="Flavor Safety &gt; Ingredients"
        options={layoutOptions}
      >
        {pagerNavigation}
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Name</th>
              <th>CAS</th>
              <th>Category</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {collection.map((ingredient, index) => {
              return (
                <Fragment key={index}>
                  <tr>
                    <td className="text-center">{ingredient.id}</td>
                    <td>{ingredient.name}</td>
                    <td className="text-center">{ingredient.casNumber}</td>
                    <td className="text-center">
                      {ingredient.IngredientCategory
                        ? ingredient.IngredientCategory.name
                        : 'None'}
                    </td>
                    <td className="text-center">
                      <DashLink
                        to={`#flavor-safety/edit/${ingredient.id}`}
                        name="Ingredient/Edit"
                        item={ingredient.id}
                      >
                        Edit
                      </DashLink>
                    </td>
                  </tr>
                  {ingredient.notes ? (
                    <tr key={`notes-${index}`}>
                      <td colSpan="6">
                        <h4>Notes</h4>
                        {ingredient.notes}
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              );
            })}
          </tbody>
        </Table>
        {pagerNavigation}
        <PagerInfo contentType="Ingredients" pager={pager} />
      </Layout>
    );
  }
}

export default withPagination(
  Ingredients,
  ingredientsActions,
  'requestIngredients',
  getIngredientsPager,
  getAllIngredients
);
