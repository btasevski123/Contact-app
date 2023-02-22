import { useEffect, useState } from "react";
import { ContactType } from "../types/ContactType";
import { AddContact } from "./AddContact";
import { Contact } from "./Contact";

const INIT_STATE: ContactType[] = [
  {
    id: "1",
    name: "Joe",
    email: "Joe@hmail.com",
    phone: "+38977 421 222",
  },
  {
    id: "2",
    name: "Sarah",
    email: "sarah@gmail.com",
    phone: "+38977 621 546",
  },
  { id: "3", name: "Mike", email: "mike@gmail.com", phone: "+38977 981 441" },
];

export const Contacts = () => {
  const [contacts, setContacts] = useState<ContactType[]>(INIT_STATE);

  const handleDeleteContact = (args: Pick<ContactType, "id">) => {
    const { id } = args;
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleAddContact = (contact: ContactType) => {
    setContacts([...contacts, contact]);
  };

  useEffect(() => {
    const localList: string | null = localStorage.getItem("contacts");
    if (localList) {
      setContacts(JSON.parse(localList));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <AddContact handleAddContact={handleAddContact} />
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          contact={contact}
          handleDeleteContact={handleDeleteContact}
        />
      ))}
    </>
  );
};
