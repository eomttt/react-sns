import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Checkbox, Button } from 'antd';
import Router from 'next/router';
import { signUpRequestAction } from '../reducers/user';

import { useInput } from '../components/LoginForm';

const Signup = () => {
  const dispatch = useDispatch();
  const { isSigningUp, me } = useSelector(state => state.user);
  // const [id, setId] = useState(''); // Using custom hook in bottom
  // const [nick, setNick] = useState(''); // Using custom hook in bottom

  const [id, onChangeId] = useInput('');
  const [nick, onChangedNick] = useInput('');

  const [pass, setPass] = useState('');
  const [passChk, setPassChk] = useState('');
  const [term, setTerm] = useState('');

  const [passError, setPassError] = useState(false);
  const [termError, setTermError] = useState(false);

  useEffect(() => {
    if (me) {
      alert('Move to mainpage because logged in.');
      Router.push('/');
    }
  }, [me && me.id]);

  const onSubmit = useCallback((e) => {
    e.preventDefault();

    if (pass !== passChk) {
      return setPassError(true);
    }

    if (!term) {
      return setTermError(true);
    }

    return dispatch(signUpRequestAction({
      id,
      pass,
      nick,
    }));
  }, [pass, passChk, term]);

  // const onChangeId = (e) => { // Using custom hook in bottom
  //   setId(e.target.value);
  // };

  // const onChangedNick = (e) => {
  //   setNick(e.target.value);
  // };

  const onChangePass = useCallback((e) => {
    setPass(e.target.value);
  }, []);

  const onChangePassChk = useCallback((e) => {
    setPassError(e.target.value !== pass);
    setPassChk(e.target.value);
  }, [pass]);

  const onChangeTerm = (e) => {
    setTermError(false);
    setTerm(e.target.checked);
  };

  return (
    <>
      <Form onSubmit={onSubmit} style={{ padding: 10 }}>
        <div>
          <label htmlFor="user-id">ID</label>
          <br />
          <Input name="user-id" required value={id} onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="user-nick">Nickname</label>
          <br />
          <Input name="user-nick" required value={nick} onChange={onChangedNick} />
        </div>
        <div>
          <label htmlFor="user-pass">Password</label>
          <br />
          <Input name="user-pass" type="password" required value={pass} onChange={onChangePass} />
        </div>
        <div>
          <label htmlFor="user-pass-chk">Password Check</label>
          <br />
          <Input name="user-pass-chk" type="password" required value={passChk} onChange={onChangePassChk} />
          {passError && <div style={{ color: 'red' }}>Please check password</div>}
        </div>
        <div>
          <Checkbox name="user-term" value={term} onChange={onChangeTerm}>
            Are you agree this term?
          </Checkbox>
          {termError && <div style={{ color: 'red' }}>You must agrre term</div>}
        </div>
        <div>
          <Button type="primary" htmlType="submit" loading={isSigningUp}>Register</Button>
        </div>
      </Form>
    </>
  );
};

export default Signup;
