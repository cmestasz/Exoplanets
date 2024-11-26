import { INVERTED_COLOR } from '@styles/colors';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { UGUIElements } from '@reactunity/renderer/ugui';
import { ReactUnity } from '@reactunity/renderer';
import { AlertContext } from '@components/alerts/AlertContext';
import Options from './Options';

type InputProps = UGUIElements['input'] & {
  label?: string,
  name: string,
  defaultValue?: string,
  send: (name: string, value: string) => Promise<void>;
};

export default function Input({
  label, name, send, defaultValue = '', disabled, ...props
}: InputProps) {
  const { t } = useTranslation();
  const SUCCESS_UPLOADING = t('components.form.input.success-update');
  const SENDIND_MESSAGE = t('components.form.input.sending');
  const showAlert = useContext(AlertContext);
  const [stateInput, setStateInput] = useState<'normal' | 'editing' | 'sending'>('normal');
  const [savedValue, setSavedValue] = useState<string>(defaultValue);
  const inputRef = useRef<ReactUnity.UGUI.InputComponent>(null);
  const handleEdit = () => {
    setStateInput('editing');
  };
  const handleCancel = () => {
    setStateInput('normal');
    if (inputRef.current) {
      inputRef.current.Value = savedValue;
    }
  };
  const handleSending = () => {
    const valueInput = inputRef.current?.Value || '';
    if (!valueInput) {
      handleCancel();
      return;
    }
    if (valueInput === savedValue) {
      setStateInput('normal');
      return;
    }
    setStateInput('sending');
    send(name, valueInput).then(() => {
      setSavedValue(valueInput);
      setStateInput('normal');
      showAlert({ message: SUCCESS_UPLOADING, type: 'success' });
    }).catch((message: Error) => {
      setStateInput('editing');
      showAlert({ message: message.message, type: 'error' });
    });
  };
  useEffect(() => {
    if (defaultValue && inputRef.current) {
      inputRef.current.Value = defaultValue;
    }
  }, [defaultValue, inputRef]);
  useEffect(() => {
    if (stateInput === 'editing' && inputRef.current) {
      inputRef.current.Focus();
    }
  }, [stateInput]);
  const baseStyle = 'flex flex-col gap-4 justify-center w-fit p-3';
  return (
    <div
      className={baseStyle}
    >
      {label && (
        <label
          // eslint-disable-next-line react/no-unknown-property
          for={name}
          className="font-audiowide text-primary cursor-default text-5xl leading-10"
        >
          {label}
        </label>
      )}
      <div
        className="text-secondary flex flex-row justify-between gap-4 items-center text-4xl"
      >
        <input
          name={name}
          ref={inputRef}
          onFocus={disabled ? undefined : handleEdit}
          className="bg-transparent cursor-text focus:outline-none focus:border-b-2 border-b-transparent focus:border-b-primary transition-colors font-exo flex-grow rounded-none pb-1 placeholder:text-quaternary"
          disabled={disabled}
          {...props}
        />
        {
          !disabled && stateInput === 'sending' && (
            <p className="font-exo text-3xl">{SENDIND_MESSAGE}</p>
          )
        }
        {
          !disabled && stateInput === 'editing' && (
            <Options
              handleCancel={handleCancel}
              handleSending={handleSending}
            />
          )
        }
        {
          !disabled && stateInput === 'normal' && (
            <icon
              onClick={handleEdit}
              className={`${INVERTED_COLOR} cursor-pointer text-6xl`}
            >
              edit
            </icon>
          )
        }
      </div>
    </div>
  );
}
