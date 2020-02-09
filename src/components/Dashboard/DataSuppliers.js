import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import {
  DashboardLink as DashLink,
  DashboardLayout as Layout
} from 'components/Dashboard/';
import { PagerInfo, withPagination } from 'components/Pagination';
import { actions as dataSuppliersActions } from 'reducers/dataSuppliers';
import {
  getAllDataSuppliers,
  getDataSuppliersPager
} from 'selectors/dataSuppliers';

export class DataSuppliers extends Component {
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
        pageTitle="Data Suppliers - Dashboard"
        header="Data Suppliers"
        options={layoutOptions}
      >
        {pagerNavigation}
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              <th>ID</th>
              <th>Name</th>
              <th>Code</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {collection.map((dataSupplier, index) => {
              return (
                <tr key={index}>
                  <td className="text-center">{dataSupplier.id}</td>
                  <td>{dataSupplier.name}</td>
                  <td className="text-center">{dataSupplier.code}</td>
                  <td>
                    <DashLink
                      to={`#data-supliers/edit/${dataSupplier.id}`}
                      name="DataSupplier/Edit"
                      item={dataSupplier.id}
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
        <PagerInfo contentType="DataSuppliers" pager={pager} />
      </Layout>
    );
  }
}

export default withPagination(
  DataSuppliers,
  dataSuppliersActions,
  'requestDataSuppliers',
  getDataSuppliersPager,
  getAllDataSuppliers
);
