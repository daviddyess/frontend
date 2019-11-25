import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { Form as FinalForm, Field } from 'react-final-form';
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { actions as flavorActions } from 'reducers/flavor';
import { actions as noteActions } from 'reducers/note';
import { getFlavorNote } from 'selectors/note';
import { getStash } from 'selectors/flavor';

export class FlavorStash extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    stash: PropTypes.array,
    note: PropTypes.array
  };

  constructor(props) {
    super(props);
    const { actions } = this.props;

    this.state = {
      editingStash: false,
      editingNote: false,
      notes: [],
      removed: [],
      usage: [],
      viewingNote: []
    };

    actions.requestStash();

    this.handleRemoveFromStash = this.removeFromStash.bind(this);
    this.handleAddToStash = this.addToStash.bind(this);
    this.handleStashEditor = this.handleStashEditor.bind(this);
    this.handleNoteEditor = this.handleNoteEditor.bind(this);
    this.handleNoteViewer = this.handleNoteViewer.bind(this);
    this.handleStashSubmit = this.handleStashSubmit.bind(this);
    this.handleNoteSubmit = this.handleNoteSubmit.bind(this);
  }

  date(d) {
    const s = new Date(d);

    return s.toLocaleDateString();
  }

  addToStash(id) {
    const { actions } = this.props;
    const { removed } = this.state;

    actions.addStash({ id });
    removed[id] = false;
    this.setState({ removed });
  }

  removeFromStash(id) {
    const { actions } = this.props;
    const { removed } = this.state;

    actions.removeStash({ id });
    removed[id] = true;
    this.setState({ removed });
  }

  inStashIcon(id) {
    const { editingStash } = this.state;

    return (
      <Fragment>
        <FontAwesomeIcon
          onClick={e => this.handleRemoveFromStash(id, e)}
          className="text-danger"
          icon="minus-square"
          size="2x"
          title="Remove from Stash"
        />{' '}
        {!editingStash && (
          <FontAwesomeIcon
            onClick={e => this.handleStashEditor(id, e)}
            className="text-info"
            icon="pen-square"
            size="2x"
            title="Edit Details"
          />
        )}
      </Fragment>
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

  noteIcon(id) {
    return (
      <FontAwesomeIcon
        onClick={e => this.handleNoteViewer(id, e)}
        className="text-primary"
        icon="sticky-note"
        size="2x"
        title="Flavor Note"
      />
    );
  }

  notesIcon(id) {
    return (
      <FontAwesomeIcon
        onClick={e => this.handleAddToStash(id, e)}
        className="text-warning"
        icon="book"
        size="2x"
        title="Flavor Notes"
      />
    );
  }

  handleStashEditor(id) {
    if (id) {
      this.setState({ editingStash: id });
    } else {
      this.setState({ editingStash: false });
    }
  }

  handleStashSubmit(values) {
    const { actions } = this.props;
    const { flavorId, minMillipercent, maxMillipercent } = values;

    actions.updateStash(values);
    const usage = this.state.usage;

    usage[flavorId] = {
      minMillipercent,
      maxMillipercent
    };
    this.setState({
      editingStash: false,
      ...usage
    });
  }

  stashEditor(flavor) {
    const { flavorId, maxMillipercent, minMillipercent } = flavor;

    return (
      <FinalForm
        onSubmit={this.handleStashSubmit}
        initialValues={{
          flavorId,
          maxMillipercent: maxMillipercent / 1000,
          minMillipercent: minMillipercent / 1000
        }}
        render={({ handleSubmit, submitting }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            initialValues={{ flavorId, maxMillipercent, minMillipercent }}
          >
            <h3>Usage Range:</h3>
            <Form.Row>
              <Field name="minMillipercent">
                {({ input }) => (
                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">
                          Min
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control {...input} type="number" step="0.1" />
                      <InputGroup.Text id="inputGroupAppend">%</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                )}
              </Field>
              <Field name="maxMillipercent">
                {({ input }) => (
                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">
                          Max
                        </InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control {...input} type="number" step="0.1" />
                      <InputGroup.Text id="inputGroupAppend">%</InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                )}
              </Field>
              <Field name="flavorId">
                {({ input }) => <Form.Control {...input} type="hidden" />}
              </Field>
            </Form.Row>
            <Form.Row>
              <Form.Group>
                <ButtonGroup>
                  <Button
                    className="button-animation"
                    variant="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    <span>Save</span>
                  </Button>
                  <Button
                    onClick={e => this.handleStashEditor(false, e)}
                    className="button-animation"
                    variant="danger"
                  >
                    <span>Cancel</span>
                  </Button>
                </ButtonGroup>
              </Form.Group>
            </Form.Row>
          </Form>
        )}
      />
    );
  }

  handleNoteViewer(id) {
    const viewingNote = this.state.viewingNote;

    if (id) {
      const { actions } = this.props;

      actions.requestNote(id);
      viewingNote[id] = true;
    } else {
      viewingNote[id] = false;
    }
    this.setState({ ...viewingNote });
    // eslint-disable-next-line no-console
    console.log(this.state.viewingNote[id]);
  }

  noteViewer(id) {
    const { note } = this.props;

    if (!note.user[id]) {
      return <div>No note exists for this flavor!</div>;
    }
  }

  handleNoteEditor(id) {
    if (id) {
      this.setState({ editingNote: id });
    } else {
      this.setState({ editingNote: false });
    }
  }

  handleNoteSubmit(values) {
    const { actions } = this.props;
    const { flavorId, note, update } = values;

    if (update === true) {
      actions.updateStash(values);
    }
    const notes = this.state.notes;

    notes[flavorId] = {
      note
    };
    this.setState({
      editingNote: false,
      ...notes
    });
  }

  noteEditor(flavor) {
    const { flavorId, userId } = flavor;

    const collection = this.props.note;

    let note = '';

    if (!collection.user[flavorId]) {
      note = collection.user[flavorId].note;
    }

    return (
      <FinalForm
        onSubmit={this.handleSubmit}
        initialValues={{
          flavorId,
          note,
          userId
        }}
        render={({ handleSubmit, submitting }) => (
          <Form
            noValidate
            onSubmit={handleSubmit}
            initialValues={{ flavorId, note, userId }}
          >
            <h3>Flavor Note:</h3>
            <Form.Row>
              <Field name="note">
                {({ input }) => (
                  <Form.Group as={Col}>
                    <InputGroup>
                      <Form.Control
                        {...input}
                        as="textarea"
                        placeholder="Flavor Note"
                        style={{ 'min-height': '500px' }}
                      />
                    </InputGroup>
                  </Form.Group>
                )}
              </Field>
              <Field name="flavorId">
                {({ input }) => <Form.Control {...input} type="hidden" />}
              </Field>
            </Form.Row>
            <Form.Row>
              <Form.Group>
                <ButtonGroup>
                  <Button
                    className="button-animation"
                    variant="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    <span>Save</span>
                  </Button>
                  <Button
                    onClick={e => this.handleNoteEditor(false, e)}
                    className="button-animation"
                    variant="danger"
                  >
                    <span>Cancel</span>
                  </Button>
                </ButtonGroup>
              </Form.Group>
            </Form.Row>
          </Form>
        )}
      />
    );
  }

  render() {
    const { stash } = this.props;
    const {
      editingStash,
      editingNote,
      removed,
      usage,
      viewingNote
    } = this.state;

    return (
      <Container>
        <Helmet title="Your Flavor Stash" />
        <Row className="text-center">
          <Col>
            <h1>Flavor Stash</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            {stash.map((flavor, index) => {
              const minMillipercent = flavor.minMillipercent / 1000;
              const maxMillipercent = flavor.maxMillipercent / 1000;

              return (
                <Card key={index} className="mb-2">
                  <Card.Header>
                    <h3 className="float-left">
                      {flavor.Flavor.name} ({flavor.Flavor.Vendor.code})
                    </h3>
                    <h5 className="float-right">
                      Added: {this.date(flavor.created)}
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>{flavor.Flavor.Vendor.name}</Card.Title>
                    <Card.Text>
                      Density: {flavor.Flavor.density}
                      <br />
                      Use:&nbsp;
                      {usage[flavor.flavorId]
                        ? `${usage[flavor.flavorId].minMillipercent} - 
                          ${usage[flavor.flavorId].maxMillipercent}`
                        : `${minMillipercent} - ${maxMillipercent}`}
                      %
                    </Card.Text>
                    {editingStash === flavor.flavorId
                      ? this.stashEditor(flavor)
                      : ''}
                    {editingNote === flavor.flavorId
                      ? this.noteEditor(flavor)
                      : ''}
                    {viewingNote[flavor.flavorId]
                      ? this.noteViewer(flavor.flavorId)
                      : ''}
                  </Card.Body>
                  <Card.Footer>
                    <span className="float-left">
                      {!removed[flavor.flavorId]
                        ? this.inStashIcon(flavor.flavorId)
                        : this.noStashIcon(flavor.flavorId)}{' '}
                      {this.noteIcon(flavor.flavorId)}{' '}
                      {this.notesIcon(flavor.flavorId)}
                    </span>
                    <span className="float-right">ID: {flavor.flavorId}</span>
                  </Card.Footer>
                </Card>
              );
            })}
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  stash: getStash(state),
  note: getFlavorNote(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...flavorActions,
      ...noteActions
    },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlavorStash);
