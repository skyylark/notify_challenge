import { useEffect, useRef, useState } from 'react';
import axios from '../api/axios';

import Checkbox from '../components/Checkbox';
import style from './NotificationPage.module.css';

const SUPERVISORS_URL = '/api/supervisors';
const NOTIFY_URL = '/api/submit';

const NotificationPage = () => {
  const errRef = useRef();
  const successRef = useRef();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [supervisors, setSupervisors] = useState();
  const [supervisor, setSupervidor] = useState('');
  const [selected, setSelected] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [emailCheck, setEmailCheck] = useState(false);
  const [phoneCheck, setPhoneCheck] = useState(false);

  const handleSelect = e => {
    const index = e.target.selectedIndex;
    const cn = e.target.childNodes[index];
    const idAttr = cn.getAttribute('id');
    setSelected(e.target.value);

    for (let i = 0; i < supervisors.length; i++) {
      if (supervisors[i].id === idAttr) {
        setSupervidor(supervisors[i]);
        break;
      }
    }
  };
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getSupervisors = async () => {
      try {
        const response = await axios.get(SUPERVISORS_URL, {
          signal: controller.signal,
        });
        isMounted && setSupervisors(response.data);
      } catch (err) {
        console.log('error while getting list of supervisors on page load');
        console.log(err);
      }
    };
    getSupervisors();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const submit = async e => {
    e.preventDefault();
    try {
      await axios.post(NOTIFY_URL, {
        firstName,
        lastName,
        email: emailCheck ? email : 'Not Checked',
        phoneNumber: phoneCheck ? phoneNumber : 'Not Checked',
        supervisor,
      });

      setErrMsg('');
      setSuccessMsg('Notification Sent Successfully');
      setTimeout(() => {
        setSuccessMsg('');
      }, 4000);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhoneNumber('');
      setEmailCheck(false);
      setPhoneCheck(false);
      setSelected('');
      setSupervidor('');
    } catch (err) {
      setSuccessMsg('');
      if (!err.response) {
        setErrMsg('no Server response');
        console.log('no server response');
      } else if (
        (err.response?.status === 400 &&
          err.response?.data.message === 'invalid first name') ||
        err.response?.data.message === 'invalid last name'
      ) {
        err.response?.data.message === 'invalid first name'
          ? setErrMsg('invalid first Name')
          : setErrMsg('invalid last Name');
      } else if (
        err.response?.status === 400 &&
        err.response?.data.message === 'No Selection'
      ) {
        setErrMsg('Please select a supervisor!');
      } else {
        setErrMsg(
          err.response?.data.message
            ? err.response.data.message
            : 'Internal Error'
        );
        console.log(err);
      }
      errRef.current.focus();
    }
  };
  return (
    <section>
      <form className={style.form} onSubmit={submit}>
        <div className={style.formHeader}>
          <h1>Notification form</h1>
        </div>
        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'}>
          {errMsg}
        </p>

        <p ref={successRef} className={successMsg ? 'successMsg' : 'offscreen'}>
          {successMsg}
        </p>
        <div className={style.formBody}>
          <div className={style.row}>
            <div className={style.inputGroup}>
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                autoComplete="false"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </div>
            <div className={style.inputGroup}>
              <label htmlFor="LastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                autoComplete="false"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className={style.row}>
            <Checkbox
              headerTitle="How would you like to be notified?"
              title="Email"
              checked={emailCheck}
              isChecked={setEmailCheck}
              textType={'email'}
              inputValue={email}
              isDisabled={!emailCheck}
              value1={'Please click checkbox'}
              value2={'support@domain.com'}
              setValue={setEmail}
            />
            <Checkbox
              title="Phone"
              checked={phoneCheck}
              isChecked={setPhoneCheck}
              textType={'tel'}
              inputValue={phoneNumber}
              isDisabled={!phoneCheck}
              value1={'Please click checkbox'}
              value2={'702-339-3242'}
              setValue={setPhoneNumber}
            />
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="">Select Supervisor</label>

            <select value={selected} onChange={handleSelect}>
              <option hidden>Please select Supervisor</option>
              {supervisors?.length ? (
                supervisors.map(s => (
                  <option
                    id={s.id}
                    key={s.id}
                  >{`${s.jurisdiction} - ${s.lastName}, ${s.firstName}`}</option>
                ))
              ) : (
                <option value="" defaultValue={true}>
                  No supervisors
                </option>
              )}
            </select>
          </div>
          <div className={style.submitBtn}>
            <button className={style.btn}>Create</button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default NotificationPage;
