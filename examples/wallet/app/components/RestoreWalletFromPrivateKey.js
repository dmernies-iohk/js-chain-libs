// @flow
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import typeof { setAccount as SetAccount } from '../actions/account';

type Props = {
  setAccount: SetAccount
};

// FIXME: this has no error handling, neither while parsing the address
// nor when fetching the balance.
export default ({ setAccount }: Props) => {
  const handleSubmit = function handleSubmit(event) {
    event.preventDefault();
    if (checkValidUnlockWalletPassword(password, confirmPassword)) {
      setAccount(newPrivateKey, password);
    }
  };

  const checkValidUnlockWalletPassword = function checkValidUnlockWalletPassword(
    pass,
    confirmation
  ) {
    if (!pass && !confirmation) return true;
    if (pass.length < 8) {
      setIsValidPassword(false);
      return false;
    }
    setIsValidPassword(true);

    if (pass !== confirmation) {
      setArePasswordAndConfirmationEqual(false);
      return false;
    }
    setArePasswordAndConfirmationEqual(true);
    return true;
  };

  const [isValidPassword, setIsValidPassword] = useState(true);
  const [newPrivateKey, setNewPrivateKey] = useState('');

  const [
    arePasswordAndConfirmationEqual,
    setArePasswordAndConfirmationEqual
  ] = useState(true);

  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="mt-5">
        <Form.Group>
          <Form.Label>Private key:</Form.Label>
          <Form.Control
            required
            type="text"
            name="privateKey"
            value={newPrivateKey}
            onChange={event => setNewPrivateKey(event.target.value)}
          />
          <Form.Text>
            It&apos;s a string like:
            <br />
            <em className="text-danger">
              ed25519e_sk15psr45hyqnpwcl8xd4lv0m32prenhh8kcltgte2305h5jgynndxect9274j0am0qmmd0snjuadnm6xkgssnkn2njvkg8et8qg0vevsgnwvmpl
            </em>
          </Form.Text>
          <Form.Group className="mt-3">
            <Form.Control
              type="password"
              id="password"
              name="password"
              placeholder="New password (min 8 chars)"
              value={password}
              isInvalid={!isValidPassword}
              onChange={event => setPassword(event.target.value)}
            />
            <Form.Label hidden={isValidPassword}>
              <em className="text-danger">
                The password must have at least 8 chars.
              </em>
            </Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={event => setConfirmPassword(event.target.value)}
              className="mt-3"
            />
            <Form.Label
              className="text-danger"
              hidden={arePasswordAndConfirmationEqual}
            >
              <em className="text-danger">
                Password and confirmation must be the same.
              </em>
            </Form.Label>
          </Form.Group>
        </Form.Group>
        <Row className="justify-content-center">
          <Button variant="primary" type="submit">
            Initialize wallet using key string
          </Button>
        </Row>
      </Form>
    </Container>
  );
};