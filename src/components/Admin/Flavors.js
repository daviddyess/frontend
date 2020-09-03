import PropTypes from 'prop-types';
import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import { Col, Table } from 'react-bootstrap';
import { PagerInfo, withPagination } from 'components/Pagination/Pagination';
import { actions as flavorsActions } from 'reducers/flavors';
import { getAllFlavors, getFlavorsPager } from 'selectors/flavors';

export default withPagination(
  flavorsActions.requestFlavors,
  getAllFlavors,
  getFlavorsPager
)(function Flavors({ collection, pager, pagerNavigation }) {
  Flavors.propTypes = {
    collection: PropTypes.array.isRequired,
    pager: PropTypes.object.isRequired,
    pagerNavigation: PropTypes.node.isRequired
  };

  return (
    <Col>
      <Breadcrumbs base="admin" active="Flavors" />
      <h2>Flavors</h2>
      {pagerNavigation}
      <Table responsive striped bordered hover size="sm">
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Vendor</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Density</th>
          </tr>
        </thead>
        <tbody>
          {collection.map((flavor, index) => {
            return (
              <tr key={index}>
                <td className="text-center">{flavor.id}</td>
                <td>{flavor.Vendor.name}</td>
                <td>{flavor.name}</td>
                <td className="text-center">{flavor.slug}</td>
                <td className="text-center">{flavor.density}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {pagerNavigation}
      <PagerInfo contentType="Flavors" pager={pager} />
    </Col>
  );
});
