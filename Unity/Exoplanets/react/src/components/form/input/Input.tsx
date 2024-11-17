import { INVERTED_COLOR } from '@styles/colors';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { UGUIElements } from '@reactunity/renderer/ugui';
import { ReactUnity } from '@reactunity/renderer';
import { AlertContext } from '@components/alerts/Alert';
import Options from './Options';

type InputProps = UGUIElements['input'] & {
  label?: string,
  name: string,
  defaultValue?: string,
};

export default function Input({
  label, name, defaultValue = '', ...props
}: InputProps) {
  const { t } = useTranslation();
  const ERROR_UPLOADING = t('components.form.input.error-update');
  // const SUCCESS_UPLOADING = t('success-update');
  const SENDIND_MESSAGE = t('components.form.input.sending');
  const showAlert = useContext(AlertContext);
  const [stateInput, setStateInput] = useState<'normal' | 'editing' | 'sending'>('normal');
  const [savedValue/* setSavedValue */] = useState<string>(defaultValue);
  const inputRef = useRef<ReactUnity.UGUI.InputComponent>(null);
  const handleEdit = () => {
    setStateInput('editing');
  };
  const handleSending = () => {
    const valueInput = inputRef.current?.Value || '';
    if (valueInput === savedValue) {
      return;
    }
    setStateInput('sending');
    console.log('El valor de la entrada es: ', inputRef.current?.Value);
    // Simula el envío de datos y esperar respuesta
    setTimeout(() => {
      if (inputRef.current) {
        // Si no hay errores en el envío
        // setSavedValue(inputRef.current?.value);
        // handleShowAlert({ message: SUCCESS_UPLOADING, type: 'success' });
        // De otra manera
        setStateInput('editing');
        showAlert({ message: ERROR_UPLOADING, type: 'error' });
      }
    }, 500);
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
  const baseStyle = 'flex flex-col gap-2 justify-center w-fit p-3';
  return (
    <div
      className={baseStyle}
    >
      {label && (
        <label
          // eslint-disable-next-line react/no-unknown-property
          for={name}
          className="font-audiowide text-primary text-xl"
        >
          {label}
        </label>
      )}
      <div
        className="text-secondary flex flex-row justify-between gap-4 items-center"
      >
        <input
          name={name}
          ref={inputRef}
          onFocus={handleEdit}
          className="bg-transparent cursor-text focus:outline-none focus:border-b-2 border-b-transparent focus:border-b-primary transition-colors font-exo text-lg flex-grow rounded-none"
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
              className={`${INVERTED_COLOR} cursor-pointer`}
            >
              edit
            </icon>
          )
        }
      </div>
    </div>
  );
}
