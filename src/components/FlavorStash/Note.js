import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, ButtonGroup, Col, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { actions as noteActions } from 'reducers/note';
import { getFlavorNote, isLoading } from 'selectors/note';

export class Note extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    flavorId: PropTypes.string.isRequired,
    loading: PropTypes.any.isRequired,
    note: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      edittingNote: false,
      updatedNote: null
    };

    this.handleNoteEditor = this.handleNoteEditor.bind(this);
    this.handleNoteSubmit = this.handleNoteSubmit.bind(this);
  }

  componentDidMount() {
    const { actions, flavorId } = this.props;

    actions.requestNote({ flavorId });
  }

  addNoteIcon(id) {
    return (
      <FontAwesomeIcon
        onClick={e => this.handleNoteEditor(id, e)}
        className="text-success"
        icon="plus-square"
        size="2x"
        title="Add Flavor Note"
      />
    );
  }

  editNoteIcon(id) {
    return (
      <FontAwesomeIcon
        onClick={e => this.handleNoteEditor(id, e)}
        className="text-success"
        icon="pen-square"
        size="2x"
        title="Edit Flavor Note"
      />
    );
  }

  handleNoteEditor() {
    this.setState({ edittingNote: !this.state.edittingNote });
  }

  handleNoteSubmit(values) {
    const { actions } = this.props;
    const { note, update } = values;

    if (update === true) {
      actions.updateNote(values);
    } else {
      actions.createNote(values);
    }
    this.setState({ updatedNote: note || '' });

    this.handleNoteEditor();
  }

  noteEditor() {
    const { flavorId, note, userId } = this.props;
    const { updatedNote } = this.state;
    const update = Boolean(note[flavorId].note);

    return (
      <FinalForm
        onSubmit={this.handleNoteSubmit}
        initialValues={{
          flavorId,
          note: updatedNote || note[flavorId].note,
          update,
          userId
        }}
        render={({ handleSubmit, submitting }) => (
          <Form noValidate onSubmit={handleSubmit}>
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
                        style={{ minHeight: '500px' }}
                      />
                    </InputGroup>
                  </Form.Group>
                )}
              </Field>
              <Field name="userId">
                {({ input }) => <Form.Control {...input} type="hidden" />}
              </Field>
              <Field name="flavorId">
                {({ input }) => <Form.Control {...input} type="hidden" />}
              </Field>
              <Field name="update">
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
    const { note, flavorId, loading } = this.props;
    const { edittingNote } = this.state;
    const updatedNote = this.state.updatedNote;

    if (loading !== flavorId) {
      return (
        <Fragment>
          <h3>
            {note[flavorId] || updatedNote
              ? this.editNoteIcon(flavorId)
              : this.addNoteIcon(flavorId)}{' '}
            Flavor Notes
          </h3>
          {!edittingNote &&
            (note[flavorId] || updatedNote
              ? updatedNote || note[flavorId].note
              : 'Add a note!')}
          {edittingNote ? this.noteEditor() : null}
        </Fragment>
      );
    } else {
      return <Fragment>Loading...</Fragment>;
    }
  }
}

const mapStateToProps = state => ({
  loading: isLoading(state),
  note: getFlavorNote(state)
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      ...noteActions
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Note);
