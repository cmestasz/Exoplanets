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
  send: (value: string) => Promise<void>;
};

export default function Input({
  label, name, send, defaultValue = '', ...props
}: InputProps) {
  const { t } = useTranslation();
  const SUCCESS_UPLOADING = t('components.form.input.success-update') as string;
  const SENDIND_MESSAGE = t('components.form.input.sending') as string;
  const showAlert = useContext(AlertContext);
  const [stateInput, setStateInput] = useState<'normal' | 'editing' | 'sending'>('normal');
  const [savedValue, setSavedValue] = useState<string>(defaultValue);
  const inputRef = useRef<ReactUnity.UGUI.InputComponent>(null);
  const handleEdit = () => {
    setStateInput('editing');
  };
  const handleSending = () => {
    const valueInput = inputRef.current?.Value || '';
    if (valueInput === savedValue) {
      return;
    }
    console.log('Para enviar: ', valueInput);
    setStateInput('sending');
    send(valueInput).then(() => {
      setSavedValue(valueInput);
      setStateInput('normal');
      showAlert({ message: SUCCESS_UPLOADING, type: 'success' });
    }).catch((message: Error) => {
      console.log('error ocurrido');
      setStateInput('editing');
      showAlert({ message: message.message, type: 'error' });
    });
  };
  const handleCancel = () => {
    setStateInput('normal');
    if (inputRef.current) {
      inputRef.current.Value = savedValue;
    }
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
          className="font-audiowide text-primary cursor-default text-5xl leading-8"
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
          onFocus={handleEdit}
          className="bg-transparent cursor-text focus:outline-none focus:border-b-2 border-b-transparent focus:border-b-primary transition-colors font-exo flex-grow rounded-none pb-1 placeholder:text-quaternary"
          {...props}
        />
        {
          stateInput === 'sending' && (
            <p className="font-exo text-sm">{SENDIND_MESSAGE}</p>
          )
        }
        {
          stateInput === 'editing' && (
            <Options
              handleCancel={handleCancel}
              handleSending={handleSending}
            />
          )
        }
        {
          stateInput === 'normal' && (
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
