export default function Input({ field, form, ...props }) {
  return (
    <input
      {...field}
      {...props}
      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:outline-none"
    />
  );
}
