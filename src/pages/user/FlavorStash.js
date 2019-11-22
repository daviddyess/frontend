import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { Col, Container, Row } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class FlavorStash extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Helmet title="Your Flavor Stash" />
        <Row className="text-center">
          <Col>
            <h1>Flavor Stash</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}
/*
const mapStateToProps = state => ({
  // collection: getAllFlavors(state),
  // pager: getFlavorsPager(state)
});

const mapDispatchToProps = dispatch => ({
  // actions: bindActionCreators(flavorsActions, dispatch)
});
*/
export default connect()(FlavorStash);
// mapStateToProps,
// mapDispatchToProps
