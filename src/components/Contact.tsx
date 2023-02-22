import { useState } from "react";
import { ContactType } from "../types/ContactType";

type Props = {
  contact: ContactType;
  handleDeleteContact: (args: Pick<ContactType, "id">) => void;
};

export const Contact = ({ contact, handleDeleteContact }: Props) => {
  const { id, name, phone, email } = contact;
  const [isElementShown, setIsElementShown] = useState(true);

  const handleToggle = () => setIsElementShown(!isElementShown);

  return (
    <div className="Contact">
      <h4>
        {name}
        <i className="fas fa-sort-down" onClick={handleToggle}></i>
        <i
          className="fas fa-times"
          style={{ float: "right", color: "red" }}
          onClick={() => handleDeleteContact({ id })}
        ></i>
      </h4>

      {isElementShown && (
        <ul>
          <li>Email: {email}</li>
          <li>Phone: {phone}</li>
        </ul>
      )}
    </div>
  );
};
