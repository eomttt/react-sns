import React, { useState } from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import { Form, Input, Checkbox, Button } from 'antd';

const Signup = () => {
  // const [id, setId] = useState(''); // Using custom hook in bottom
  // const [nick, setNick] = useState(''); // Using custom hook in bottom
  const [pass, setPass] = useState('');
  const [passChk, setPassChk] = useState('');
  const [term, setTerm] = useState('');

  const [passError, setPassError] = useState(false);
  const [termError, setTermError] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (pass !== passChk) {
      return setPassError(true);
    }

    if (!term) {
      return setTermError(true);
    }

    console.log({
      id, nick, pass, passChk, term
    })
  };

  // const onChangeId = (e) => { // Using custom hook in bottom
  //   setId(e.target.value);
  // };

  // const onChangedNick = (e) => {
  //   setNick(e.target.value);
  // };

  const onChangePass = (e) => {
    setPass(e.target.value);
  };

  const onChangePassChk = (e) => {
    setPassError(e.target.value !== pass);
    setPassChk(e.target.value);
  };

  const onChangeTerm = (e) => {
    setTermError(false);
    setTerm(e.target.checked);
  };

  // Custom hook
  const useInput = (initValue = null) => {
    const [value, setter] = useState(initValue);
    const handler = (e) => {
      setter(e.target.value);
    };

    return [value, handler];
  }

  const [id, onChangeId] = useInput('');
  const [nick, onChangedNick] = useInput('');

  return (
    <>
      <Head>
        <title>NodeBird</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.20.5/antd.css"/>
      </Head>
      <AppLayout>
        <Form onSubmit={onSubmit} style={{ padding: 10 }}>
          <div>
            <label htmlFor="user-id">ID</label>
            <br/>
            <Input name="user-id" required value={id} onChange={onChangeId}/>
          </div>
          <div>
            <label htmlFor="user-nick">Nickname</label>
            <br/>
            <Input name="user-nick" required value={nick} onChange={onChangedNick}/>
          </div>
          <div>
            <label htmlFor="user-pass">Password</label>
            <br/>
            <Input name="user-pass" type="password" required value={pass} onChange={onChangePass}/>
          </div>
          <div>
            <label htmlFor="user-pass-chk">Password Check</label>
            <br/>
            <Input name="user-pass-chk" type="password" required value={passChk} onChange={onChangePassChk}/>
            {passError && <div style={{ color: 'red' }}>Please check password</div>}
          </div>
          <div>
            <Checkbox name="user-term" value={term} onChange={onChangeTerm}>
              Are you agree this term?
            </Checkbox>
            {termError && <div style={{ color: 'red' }}>You must agrre term</div>}
          </div>
          <div>
            <Button type="primary" htmlType="submit">Register</Button>
          </div>
        </Form>
      </AppLayout>
    </>
  );
};

export default Signup;
