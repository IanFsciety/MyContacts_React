import PageHeader from "../../components/PageHeader";

import ContactForm from "../../components/ContactForm";
import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";
import { useRef } from "react";

export default function NewContact() {
  const contactFormRef = useRef(null)

  async function handleSubmit(formData) {
    try {
      const contact = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      category_id: formData.categoryId
    }
    await ContactsService.createContacts(contact);

    contactFormRef.current.resetFields();
    toast({
      type: 'success',
      text:'Contato cadastrado com sucesso'
    })

  } catch {
    toast({
      type: 'danger',
      text:'Ocorreu um erro ao cadastrar o contato',
    })

  }

  }

  return (
   <>
    <PageHeader title="Novo Contato"/>
    <ContactForm
    ref={contactFormRef}
    buttonLabel="Cadastrar"
    onSubmit={handleSubmit}
    />
   </>
  )
  }
