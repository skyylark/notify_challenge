import style from '../pages/NotificationPage.module.css';

const Checkbox = (props, children) => {
  const {
    headerTitle,
    checked,
    isChecked,
    title,
    textType,
    inputValue,
    isDisabled,
    value1,
    value2,
    setValue,
  } = props;
  return (
    <div className={style.inputGroup}>
      {headerTitle ? <label>{headerTitle}</label> : <br />}
      <div>
        <input
          type="checkbox"
          checked={checked}
          onChange={e => isChecked(e.target.checked)}
        />
        <label>{` ${title}`}</label>
      </div>
      <input
        type={textType}
        value={inputValue}
        disabled={isDisabled}
        placeholder={isDisabled ? value1 : value2}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
};

export default Checkbox;
