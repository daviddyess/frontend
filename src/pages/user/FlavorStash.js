import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { actions as flavorActions } from 'reducers/flavor';
import { getStash } from 'selectors/flavor';

export class FlavorStash extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    stash: PropTypes.array
  };

  constructor(props) {
    super(props);
    const { actions } = this.props;

    this.state = { removed: [] };

    actions.requestStash();

    this.handleRemoveFromStash = this.removeFromStash.bind(this);
    this.handleAddToStash = this.addToStash.bind(this);
  }

  addToStash(id) {
    const { actions } = this.props;

    actions.addStash({ id });

    const { removed } = this.state;

    removed[id] = false;

    this.setState({ removed });
  }

  removeFromStash(id) {
    const { actions } = this.props;

    actions.removeStash({ id });
    const { removed } = this.state;

    removed[id] = true;

    this.setState({ removed });
  }

  inStashIcon(id) {
    return (
      <FontAwesomeIcon
        onClick={e => this.handleRemoveFromStash(id, e)}
        className="text-danger"
        icon="minus-square"
        size="2x"
        title="Remove from Stash"
      />
    );
  }

  noStashIcon(id) {
    return (
      <FontAwesomeIcon
        onClick={e => this.handleAddToStash(id, e)}
        className="text-success"
        icon="plus-square"
        size="2x"
        title="Add to Stash"
      />
    );
  }

  render() {
    const { stash } = this.props;
    const { removed } = this.state;

    return (
      <Container>
        <Helmet title="Your Flavor Stash" />
        <Row className="text-center">
          <Col>
            <h1>Flavor Stash</h1>
          </Col>
        </Row>
        <Row>
          <Table responsive striped bordered hover size="sm">
            <thead>
              <tr className="text-center">
                <th>Options</th>
                <th>ID</th>
                <th>Vendor</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Density</th>
                <th>Minimum</th>
                <th>Maximum</th>
              </tr>
            </thead>
            <tbody>
              {stash.map((flavor, index) => {
                return (
                  <tr key={index}>
                    <td className="text-center">
                      {!removed[flavor.flavorId]
                        ? this.inStashIcon(flavor.flavorId)
                        : this.noStashIcon(flavor.flavorId)}
                    </td>
                    <td className="text-center">{flavor.flavorId}</td>
                    <td>{flavor.Flavor.Vendor.name}</td>
                    <td>{flavor.Flavor.name}</td>
                    <td className="text-center">{flavor.Flavor.slug}</td>
                    <td className="text-center">{flavor.Flavor.density}</td>
                    <td className="text-center">{flavor.minMillipercent}%</td>
                    <td className="text-center">{flavor.maxMillipercent}%</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  stash: getStash(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(flavorActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlavorStash);
