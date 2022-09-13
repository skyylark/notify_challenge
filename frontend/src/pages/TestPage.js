import { useState, useEffect } from 'react';
import axios from '../api/axios';
const SUPERVISORS_URL = '/api/supervisors';
const TestPage = () => {
  const [supervisors, setSupervisors] = useState();
  const [supervisor, setSupervidor] = useState('');
  const [selected, setSelected] = useState('');
  const [phoneCheck, setPhoneChecked] = useState(false);

  const handleSelect = e => {
    console.log('Fruit Selected!!');
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const option = el.getAttribute('id');
    console.log(option);
    setSelected(e.target.value);

    for (let i = 0; i < supervisors.length; i++) {
      if (supervisors[i].id == option) {
        console.log(supervisors[i]);
        setSupervidor(supervisors[i]);
        break;
      }
    }
  };

  const handleClick = e => {
    console.log('you clicked me');
    setSelected('');
    console.log(phoneCheck);
    setPhoneChecked(false);
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getList = async () => {
      try {
        const response = await axios.get(SUPERVISORS_URL, {
          signal: controller.signal,
        });
        isMounted && setSupervisors(response.data);
      } catch (err) {
        console.log('error while getting list of supervisors');
        console.log(err);
      }
    };
    getList();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  return (
    <>
      <input
        type="checkbox"
        checked={phoneCheck}
        onChange={e => setPhoneChecked(e.target.checked)}
      />
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
      <br />
      <button onClick={handleClick}>Click me</button>
    </>
  );
};

export default TestPage;
