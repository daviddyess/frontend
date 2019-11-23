import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
import { Col, Container, Form, Row, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { actions as flavorActions } from 'reducers/flavor';
import { actions as flavorsActions } from 'reducers/flavors';
import { getStash } from 'selectors/flavor';
import { getAllFlavors, getFlavorsPager } from 'selectors/flavors';

export class Flavors extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    collection: PropTypes.array,
    pager: PropTypes.object,
    stash: PropTypes.array
  };

  constructor(props) {
    super(props);

    this.state = { limit: 20, page: 1, stashControl: false };
    this.handlePageChange = this.changePage.bind(this);
    this.handleLimitChange = this.changeLimit.bind(this);
    this.handleLimitUpdate = this.updateLimit.bind(this);
    this.handleStashControl = this.stashController.bind(this);
    this.handleAddToStash = this.addToStash.bind(this);
    this.handleRemoveFromStash = this.removeFromStash.bind(this);
  }

  componentDidMount() {
    const { actions } = this.props;

    actions.requestFlavors({ page: 1, limit: 20 });
    actions.requestStash();
  }

  pagerCounter() {
    const { pages } = this.props.pager;

    let i = 1;

    const pager = [];

    while (i <= pages) {
      pager[i] = i;
      i++;
    }
    return pager;
  }

  changePage(page) {
    const { actions, pager } = this.props;

    this.setState({ page: page.target.value });
    actions.requestFlavors({ ...pager, page: Number(page.target.value) });
  }

  changeLimit(limit) {
    this.setState({ limit: limit.target.value });
  }

  updateLimit() {
    const { actions, pager } = this.props;
    const { limit } = this.state;

    actions.requestFlavors({ ...pager, limit: Number(limit) });
  }

  stashController(event) {
    const { stash } = this.props;
    const { holdings: stashMap } = this.state;

    if (!stashMap) {
      const holdings = [];

      stash.map(flavor => {
        holdings[flavor.flavorId] = true;
      });
      this.setState({ holdings });
    }
    const target = event.target;
    const checked = target.checked;
    const name = target.name;

    this.setState({
      [name]: checked
    });
  }

  addToStash(id) {
    const { actions } = this.props;

    actions.addStash({ id });

    const { holdings } = this.state;

    holdings[id] = true;

    this.setState({ holdings });
  }

  removeFromStash(id) {
    const { actions } = this.props;

    actions.removeStash({ id });

    const { holdings } = this.state;

    holdings[id] = false;

    this.setState({ holdings });
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
    const { collection, pager } = this.props;
    const { holdings, stashControl } = this.state;

    return (
      <Container>
        <Helmet title="Flavors" />
        <Container fluid={true}>
          <Row className="text-center">
            <Col>
              <h1>Flavors</h1>
            </Col>
          </Row>
          <Row className="pb-2">
            <Col xs={3}>
              <input
                type="number"
                min="20"
                max="200"
                step="20"
                className="form-control"
                onChange={this.handleLimitChange}
                onBlur={this.handleLimitUpdate}
                value={this.state.limit}
              />
            </Col>
            <Col className="text-center">
              <Form>
                <Form.Check
                  name="stashControl"
                  type="checkbox"
                  id="flavorStash"
                  label="&nbsp;Enable Flavor Stash"
                  onChange={this.handleStashControl}
                />
              </Form>
            </Col>
            <Col xs={3} className="text-right">
              <select
                value={this.state.page}
                onChange={this.handlePageChange}
                onBlur={this.handlePageChange}
              >
                {this.pagerCounter().map((value, i) => (
                  <option value={value} key={i}>
                    Page {value}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
        </Container>
        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr className="text-center">
              {stashControl && <th>Stash</th>}
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
                  {stashControl && (
                    <td className="text-center">
                      {holdings &&
                        (holdings[flavor.id] === true
                          ? this.inStashIcon(flavor.id)
                          : this.noStashIcon(flavor.id))}
                    </td>
                  )}
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
        <Container fluid={true}>
          <Row>
            <Col xs={3}>
              <input
                type="number"
                min="20"
                max="200"
                step="20"
                className="form-control"
                onChange={this.handleLimitChange}
                onBlur={this.handleLimitUpdate}
                value={this.state.limit}
              />
            </Col>
            <Col className="text-right">
              <select
                value={this.state.page}
                onChange={this.handlePageChange}
                onBlur={this.handlePageChange}
              >
                {this.pagerCounter().map((value, i) => (
                  <option value={value} key={i}>
                    Page {value}
                  </option>
                ))}
              </select>
            </Col>
          </Row>
          <Row>
            <Col>{pager.count} Flavors</Col>
            <Col className="text-right">{pager.pages} Pages</Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  collection: getAllFlavors(state),
  pager: getFlavorsPager(state),
  stash: getStash(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...flavorActions, ...flavorsActions }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Flavors);
