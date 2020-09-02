import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Form as FinalForm, Field } from 'react-final-form';
import { Button, Form } from 'react-bootstrap';
import { actions as rolesActions } from 'reducers/roles';
import { actions as editorActions } from 'reducers/editor';
export default function RoleEditor({ role }) {
  RoleEditor.propTypes = {
    role: PropTypes.object
  };
  const dispatch = useDispatch();
  const handleRoleSubmit = ({ id, name }) => {
    dispatch(rolesActions.updateRole({ roleId: id, name }));
  };
  const closeEditor = () => {
    dispatch(
      editorActions.displayEditor({
        editor: 'adminRole',
        status: false
      })
    );
  };
  const { id, name } = role;

  return (
    <Fragment>
      <FinalForm
        onSubmit={handleRoleSubmit}
        initialValues={{ id, name }}
        render={({ handleSubmit, submitting }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Field name="name" required="true">
              {({ input, meta }) => (
                <Form.Group>
                  <Form.Label>Role Name</Form.Label>
                  <Form.Control {...input} type="text" isInvalid={meta.error} />
                  {meta.error && (
                    <Form.Control.Feedback type="invalid">
                      {meta.error === 'required'
                        ? 'This field is required'
                        : ''}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              )}
            </Field>
            <Button
              className="button-animation"
              variant="primary"
              type="submit"
              disabled={submitting}
            >
              <span>Save</span>
            </Button>
            <Button
              onClick={() => closeEditor()}
              className="button-animation"
              variant="danger"
            >
              <span>Cancel</span>
            </Button>
          </Form>
        )}
      />
    </Fragment>
  );
}
