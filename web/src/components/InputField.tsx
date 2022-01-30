import { useField } from "formik";

import styles from "@styles/components/InputField.module.css";

type InputFieldProps = React.InputHTMLAttributes<
  HTMLInputElement | HTMLTextAreaElement
> & {
  name: string;
  label: string;
  helperText?: string;
};

export default function InputField({
  label,
  helperText,
  ...props
}: InputFieldProps): JSX.Element {
  const [field, { error }] = useField(props);
  return (
    <fieldset className={styles.container}>
      <label htmlFor={field.name}>{label}</label>
      <input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placeholder}
      />
      {helperText ? (
        <span className="form-helper-text break-word">{helperText}</span>
      ) : null}
      {error ? (
        <span className={`${styles.error} break-word`}>{error}</span>
      ) : null}
    </fieldset>
  );
}
