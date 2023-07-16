import React from 'react';

export default function RegisterInput({
  type,
  placeholder,
  name,
  onChange,
  value
}) {
  return (
    <div className="flex w-full mb-4 border rounded-xl">
      <input
        className="border-bg-color-2 w-full p-2.5 border text-xl rounded-xl border-none focus:border-gray-500 focus:outline-none placeholder:tracking-wider tracking-wider"
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
