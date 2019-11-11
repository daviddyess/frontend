import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  CardGroup,
  ButtonGroup,
  Button
} from 'react-bootstrap';
import { actions as appActions } from 'reducers/application';
import { actions as profileActions } from 'reducers/profile';
import { isLoggedIn } from 'selectors/application';
import { getUserProfile } from 'selectors/profile';

export class Profile extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
    // collection: PropTypes.array,
    // currentUserId: PropTypes.any,
    // loggedIn: PropTypes.bool.isRequired
  };
  constructor(props) {
    super(props);
    /* const { actions } = this.props;

    actions.requestCurrentUserProfile();*/
  }

  componentDidMount() {
    const { actions } = this.props;

    actions.requestCurrentUserProfile();
  }
  render() {
    // const { currentUserId } = this.props;

    return (
      <Container>
        <Helmet title="Your Profile" />
        <Row className="text-center">
          <Col>
            <p>
              This is what other users see when they look at your profile.
              <br />
              <Link to="/user-settings">Click here to edit your profile</Link>
            </p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <h1>xXTeddyBearSlayer69Xx</h1>
            <img src="/media/harold.jpeg" alt="Profile pic" />
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <ButtonGroup>
              <Button className="button-animation" variant="primary">
                <span>Message</span>
              </Button>
              <Button className="button-animation" variant="primary">
                <span>Follow</span>
              </Button>
              <Button className="button-animation" variant="primary">
                <span>Report</span>
              </Button>
            </ButtonGroup>
            <hr />
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <h2>Newest recipes</h2>
            <CardGroup>
              <Card>
                <Card.Img
                  variant="top"
                  src="/media/card-test-1.jpg"
                  className="img-fluid w-75 mx-auto"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="#">Strawberry Milkshake</Link>
                  </Card.Title>
                  <Card.Text>created 10/13/2018</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>
                    <span role="img" aria-label="Checkmark emoji">
                      ✔
                    </span>
                    ️ You have everything!
                  </small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img
                  variant="top"
                  src="/media/card-test-2.jpg"
                  className="img-fluid w-75 mx-auto"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="#">Bomb Pop</Link>
                  </Card.Title>
                  <Card.Text>created 12/1/2018</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>
                    <span role="img" aria-label="Checkmark emoji">
                      ✔
                    </span>
                    ️ You have everything!
                  </small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img
                  variant="top"
                  src="/media/card-test-3.jpg"
                  className="img-fluid w-75 mx-auto"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="#">Tiramisu</Link>
                  </Card.Title>
                  <Card.Text>created 6/28/2019</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>
                    <span role="img" aria-label="X emoji">
                      ❌
                    </span>{' '}
                    You are missing 1 flavor
                  </small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img
                  variant="top"
                  src="/media/card-test-4.jpeg"
                  className="img-fluid w-75 mx-auto"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="#">RY4 Tobaccy</Link>
                  </Card.Title>
                  <Card.Text>created 4/4/2019</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>
                    <span role="img" aria-label="Checkmark emoji">
                      ✔
                    </span>
                    ️ You have everything!
                  </small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img
                  variant="top"
                  src="/media/card-test-5.jpeg"
                  className="img-fluid w-75 mx-auto"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="#">Fruit Punch</Link>
                  </Card.Title>
                  <Card.Text>created 1/1/2018</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>
                    <span role="img" aria-label="X emoji">
                      ❌
                    </span>{' '}
                    You are missing 3 flavors
                  </small>
                </Card.Footer>
              </Card>
            </CardGroup>
            <hr />
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <h2>Most popular recipes</h2>
            <CardGroup>
              <Card>
                <Card.Img
                  variant="top"
                  src="/media/card-test-1.jpg"
                  className="img-fluid w-75 mx-auto"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="#">Strawberry Milkshake</Link>
                  </Card.Title>
                  <Card.Text>created 10/13/2018</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>
                    <span role="img" aria-label="Checkmark emoji">
                      ✔
                    </span>
                    ️ You have everything!
                  </small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img
                  variant="top"
                  src="/media/card-test-2.jpg"
                  className="img-fluid w-75 mx-auto"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="#">Bomb Pop</Link>
                  </Card.Title>
                  <Card.Text>created 12/1/2018</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>
                    <span role="img" aria-label="Checkmark emoji">
                      ✔
                    </span>
                    ️ You have everything!
                  </small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img
                  variant="top"
                  src="/media/card-test-3.jpg"
                  className="img-fluid w-75 mx-auto"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="#">Tiramisu</Link>
                  </Card.Title>
                  <Card.Text>created 6/28/2019</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>
                    <span role="img" aria-label="X emoji">
                      ❌
                    </span>{' '}
                    You are missing 1 flavor
                  </small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img
                  variant="top"
                  src="/media/card-test-4.jpeg"
                  className="img-fluid w-75 mx-auto"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="#">RY4 Tobaccy</Link>
                  </Card.Title>
                  <Card.Text>created 4/4/2019</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>
                    <span role="img" aria-label="Checkmark emoji">
                      ✔
                    </span>
                    ️ You have everything!
                  </small>
                </Card.Footer>
              </Card>
              <Card>
                <Card.Img
                  variant="top"
                  src="/media/card-test-5.jpeg"
                  className="img-fluid w-75 mx-auto"
                />
                <Card.Body>
                  <Card.Title>
                    <Link to="#">Fruit Punch</Link>
                  </Card.Title>
                  <Card.Text>created 1/1/2018</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small>
                    <span role="img" aria-label="X emoji">
                      ❌
                    </span>{' '}
                    You are missing 3 flavors
                  </small>
                </Card.Footer>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  // currentUserId: getUser(state),
  loggedIn: isLoggedIn(state),
  collection: getUserProfile(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...appActions,
      ...profileActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
