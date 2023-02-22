import { useState } from "react";
import { ContactType } from "../types/ContactType";
import { v4 as uuid } from "uuid";

const INTI_STATE: AddContactFormData = {
  name: "",
  email: "",
  phone: "",
};
type FormKey = "name" | "phone" | "email";

type ErrorField = {
  [key in FormKey]?: boolean;
};

type AddContactFormData = {
  name: string;
  email: string;
  phone: string;
};

type Props = {
  handleAddContact: (contact: ContactType) => void;
};

export const AddContact = ({ handleAddContact }: Props) => {
  const [formData, setFormData] = useState<AddContactFormData>(INTI_STATE);
  const [errors, setErrors] = useState<ErrorField>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, phone, email } = formData;

    const localErrors: ErrorField = {};
    if (name === "") {
      localErrors.name = true;
    }
    if (email === "") {
      localErrors["email"] = true;
    }
    if (phone === "") {
      localErrors["phone"] = true;
    }

    if (name === "" || email === "" || phone === "") {
      setErrors(localErrors);
    } else {
      const newContact = {
        id: uuid(),
        ...formData,
      };
      handleAddContact(newContact);
      setFormData(INTI_STATE);
      setErrors({});
    }
  };

  const handleFormFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: FormKey
  ) => {
    setFormData({ ...formData, [key]: e.target.value });
  };

  return (
    <div className="AddContact">
      <h2>Add Contact</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          type="text"
          placeholder="Enter Name..."
          value={formData["name"]}
          onChange={(e) => handleFormFieldChange(e, "name")}
        />
        <br />
        {errors["name"] && <p>The name input is invalid</p>}

        <label htmlFor="email">Email</label>
        <br />
        <input
          type="text"
          placeholder="Enter Email..."
          value={formData["email"]}
          onChange={(e) => handleFormFieldChange(e, "email")}
        />
        <br />
        {errors["email"] && <p>The email input is invalid</p>}

        <label htmlFor="phone">Phone</label>
        <br />
        <input
          type="text"
          placeholder="Enter Phone..."
          value={formData["phone"]}
          onChange={(e) => handleFormFieldChange(e, "phone")}
        />
        <br />
        {errors["phone"] && <p>The phone input is invalid</p>}

        <button type="submit">Add</button>
      </form>
    </div>
  );
};
