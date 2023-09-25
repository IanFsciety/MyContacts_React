import { useParams, useHistory } from "react-router-dom";
import { useEffect, useRef, useState, useImperativeHandle } from "react";

import ContactForm from "../../components/ContactForm";
import PageHeader from "../../components/PageHeader";

import ContactsService from "../../services/ContactsService";
import Loader from "../../components/Loader";
import toast from "../../utils/toast"
import useSafeAsyncAction from "../../hooks/useSafeAsyncAction";

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);
  const [contactName, setContactName] = useState('');

  const contactFormRef = useRef(null);

  const { id } = useParams();
  const history = useHistory();
  const SafeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function loadContact() {
      try {
        const contact = await ContactsService.getContactById(
          id
          );
          SafeAsyncAction(() => {
            contactFormRef.current.setFieldsValues(contact);
            setContactName(contact.name);
            setIsLoading(false);

          });


      } catch {
        SafeAsyncAction(() => {
          history.push('/');
          console.log(history);
          toast({
            type: 'danger',
            text: 'Contato não encontrado'
          });
        });
      }
    }
    loadContact();
  }, [id, history, useSafeAsyncAction])


  async function handleSubmit(formData) {
    try {
      const contact = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      category_id: formData.categoryId
    }
    const contactData = await ContactsService.updateContact(id, contact);

    setContactName(contactData.name)
    toast({
      type: 'sucess',
      text:'Contato editado com sucesso'
    })

  } catch {
    toast({
      type: 'danger',
      text:'Ocorreu um erro ao editar o contato',
    })

  }

  }
  return (
    <>
    <Loader size={90} isLoading={isLoading}/>
    <PageHeader title={isLoading ? 'Carregando...' : `Editar ${contactName}`}/>
    <ContactForm
    ref={contactFormRef}
    buttonLabel="Salvar Alteracões "
    onSubmit={handleSubmit}
    />
    </>
  )
}
