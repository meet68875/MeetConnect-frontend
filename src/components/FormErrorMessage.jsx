// src/components/FormErrorMessage.jsx

export default function FormErrorMessage({ errors, field }) {
  if (!errors || !Array.isArray(errors)) return null;

  const fieldError = errors.find((err) => err.path === field);

  return fieldError ? (
    <p style={{ color: "red", fontSize: "0.9rem" }}>{fieldError.msg}</p>
  ) : null;
}
