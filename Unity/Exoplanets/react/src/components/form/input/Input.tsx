'use client';

import { INVERTED_COLOR } from '@styles/colors';
import React, { useEffect, useRef, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { AlertOptions, useAlert } from '@lib/hooks';
import Alert from '../../alerts/Alert';
import Options from './Options';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string,
  name: string,
  defaultValue?: string,
}

export default function Input({
  label, name, defaultValue = '', ...props
}: InputProps) {
  const { t } = useTranslation();
  const ERROR_UPLOADING = t('components.form.input.error-update');
  // const SUCCESS_UPLOADING = t('success-update');
  const SENDIND_MESSAGE = t('components.form.input.sending');
  const {
    isVisible, alertOptions, showAlert, hideAlert,
  } = useAlert();
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [onSending, setOnSending] = useState<boolean>(false);
  const [savedValue/* setSavedValue */] = useState<string>(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleShowAlert = ({ message, type, duration }: AlertOptions) => {
    showAlert({
      message,
      type,
      duration,
    });
  };
  const handleEdit = () => {
    setOnEdit(true);
  };
  const handleSending = () => {
    setOnEdit(false);
    const valueInput = inputRef.current?.value || '';
    if (valueInput === savedValue) {
      return;
    }
    setOnSending(true);
    console.log('El valor de la entrada es: ', inputRef.current?.value);
    // Simula el envío de datos y esperar respuesta
    setTimeout(() => {
      setOnSending(false);
      if (inputRef.current) {
        // Si no hay errores en el envío
        // setSavedValue(inputRef.current?.value);
        // handleShowAlert({ message: SUCCESS_UPLOADING, type: 'success' });
        // De otra manera
        setOnEdit(true);
        handleShowAlert({ message: ERROR_UPLOADING, type: 'error' });
      }
    }, 500);
  };
  const handleCancel = () => {
    setOnEdit(false);
    if (inputRef.current) {
      inputRef.current.value = savedValue;
    }
  };
  useEffect(() => {
    if (onEdit) {
      inputRef.current?.focus();
    }
  }, [onEdit]);
  const baseStyle = 'flex flex-col gap-2 justify-center w-fit p-3';
  return (
    <div
      className={baseStyle}
    >
      {label && (
        <label
          htmlFor={name}
          className="font-audiowide text-primary text-xl"
        >
          {label}
        </label>
      )}
      <div
        className="text-secondary flex justify-between gap-4 items-center"
      >
        <input
          ref={inputRef}
          name={name}
          defaultValue={savedValue}
          onFocus={handleEdit}
          className="bg-transparent cursor-text focus:outline-none focus:border-b-2 border-b-transparent focus:border-b-primary transition-colors font-exo text-lg"
          {...props}
        />
        {
          onSending && (
            <p className="font-exo text-sm">{SENDIND_MESSAGE}</p>
          )
        }
        {
          onEdit && !onSending && (
            <Options handleCancel={handleCancel} handleSending={handleSending} />
          )
        }
        {
          !onEdit && !onSending && (
            <FaEdit
              onClick={handleEdit}
              className={`${INVERTED_COLOR} cursor-pointer`}
            />
          )
        }
      </div>
      <Alert alertOptions={alertOptions} hideAlert={hideAlert} isVisible={isVisible} />
    </div>
  );
}
