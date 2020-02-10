import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import {
  DashboardLink as DashLink,
  DashboardLayout as Layout
} from 'components/Dashboard/';
import { PagerInfo, withPagination } from 'components/Pagination';
import { actions as diluentsActions } from 'reducers/diluents';
import { getAllDiluents, getDiluentsPager } from 'selectors/diluents';

export class Diluents extends Component {
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
        pageTitle="Diluents - Dashboard"
        header="Ingredients &gt; Diluents"
        options={layoutOptions}
      >
        {pagerNavigation}
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Code</th>
              <th>Density</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {collection.map((diluent, index) => {
              return (
                <tr key={index}>
                  <td className="text-center">{diluent.id}</td>
                  <td>{diluent.name}</td>
                  <td className="text-center">{diluent.slug}</td>
                  <td className="text-center">{diluent.code}</td>
                  <td className="text-center">{diluent.density}</td>
                  <td className="text-center">
                    <DashLink
                      to={`#diluents/edit/${diluent.id}`}
                      name="Diluent/Edit"
                      item={diluent.id}
                    >
                      Edit
                    </DashLink>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {pagerNavigation}
        <PagerInfo contentType="Diluents" pager={pager} />
      </Layout>
    );
  }
}

export default withPagination(
  Diluents,
  diluentsActions,
  'requestDiluents',
  getDiluentsPager,
  getAllDiluents
);
