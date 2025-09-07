import { ZodTypeAny } from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { IFormInpuForChips } from '../../form/formInputForChipsComponent';
import { FromDropdownComponentProps } from '../../form/formDropdownComponent';

export interface DynamicFormProps<T extends FieldType = FieldType> {
  page: DynamicFormFieldSection<T>[];
  onSubmit: (form: UseFormReturn) => (values?: Record<string, unknown>) => void;
  onSaveAsDraft?: (values: Record<string, unknown>) => void;
  className?: string;
}
export type XOR<T, U> =
  | (T & { [K in Exclude<keyof U, keyof T>]?: never })
  | (U & { [K in Exclude<keyof T, keyof U>]?: never });
export type FormFieldOrSection<T extends FieldType = FieldType> = XOR<
  DynamicFormField<T>,
  DynamicFormTransaparentSection<T>
>;
export interface DynamicFormFieldSection<T extends FieldType = FieldType> {
  title: string;
  fields: XOR<FormFieldOrSection<T>, DynamicFormFieldSection<T>>[];
}

export interface DynamicFormTransaparentSection<T extends FieldType> {
  className?: string;
  transaparentSection: XOR<FormFieldOrSection<T>, DynamicFormFieldSection<T>>[];
}

export type FieldType =
  | 'file'
  | 'text'
  | 'number'
  | 'toggle'
  | 'checkbox'
  | 'dropdown'
  | 'chipsInput';
export interface BaseFormField<T extends FieldType> {
  name: string;
  label: string;
  type: T;
  className?: string;
  placeholder?: string;
  defaultValue?: T extends 'file' ? ImageData[] : string | number | boolean;
  onChange?: (value: unknown) => void;
  schema: ZodTypeAny;
}

export interface IToggleProps {
  subtitle?: string;
}

export interface IFileProps {
  setFiles: (mediaFiles: ImageData[]) => void;
}
export type DynamicFormField<T extends FieldType> = T extends 'dropdown'
  ? BaseFormField<T> & FromDropdownComponentProps
  : T extends 'toggle'
  ? BaseFormField<T> & IToggleProps
  : T extends 'file'
  ? BaseFormField<T> & IFileProps
  : T extends 'dropdownWithSuboption'
  ? BaseFormField<T> & IFormInpuForChips
  : BaseFormField<T>;
