import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { Table } from 'react-bootstrap';
import {
  DashboardLink as DashLink,
  DashboardLayout as Layout
} from 'components/Dashboard/';
import { PagerInfo, withPagination } from 'components/Pagination';
import { actions as ingredientCategoriesActions } from 'reducers/ingredientCategories';
import {
  getAllIngredientCategories,
  getIngredientCategoriesPager
} from 'selectors/ingredientCategories';

export class IngredientCategories extends Component {
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
        header="Flavor Safety &gt; Ingredient Categories"
        options={layoutOptions}
      >
        {pagerNavigation}
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Name</th>
              <th>Ordinal</th>
              <th>Description</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {collection.map((ingredientCategory, index) => {
              return (
                <Fragment key={index}>
                  <tr>
                    <td className="text-center">{ingredientCategory.id}</td>
                    <td>{ingredientCategory.name}</td>
                    <td className="text-center">
                      {ingredientCategory.ordinal}
                    </td>
                    <td>{ingredientCategory.description}</td>
                    <td className="text-center">
                      <DashLink
                        to={`#flavor-safety/category/edit/${ingredientCategory.id}`}
                        name="Ingredient/Category/Edit"
                        item={ingredientCategory.id}
                      >
                        Edit
                      </DashLink>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </Table>
        {pagerNavigation}
        <PagerInfo contentType="Categories" pager={pager} />
      </Layout>
    );
  }
}

export default withPagination(
  IngredientCategories,
  ingredientCategoriesActions,
  'requestIngredientCategories',
  getIngredientCategoriesPager,
  getAllIngredientCategories
);
