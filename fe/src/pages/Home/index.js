import { Link } from 'react-router-dom';
import { useEffect, useState, useMemo, useCallback } from 'react';

import {
  Container, Header, ListHeader, Card, InputSearchContainer, ErrorContainer,EmptyLisContainer, SearchNotFound, ButtonContainer, ButtonRetry
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import trash from '../../assets/images/icons/trash.svg';
import edit from '../../assets/images/icons/edit.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import lupa from '../../assets/images/lupa.svg';

import Loader from '../../components/Loader/index';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast'
import Modal from '../../components/Modal';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
  )), [contacts, searchTerm]);

  const loadContacts = useCallback ( async () => {
      try {
        setIsLoading(true);

        const contactsList = await ContactsService.listContacts(orderBy);
        setHasError(false);
        setContacts(contactsList);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
  }, [orderBy])

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  const handleRetry = () => {
    console.log('click')
    loadContacts();

  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleDeleteContact(contact) {
    setContactBeingDeleted(contact)
    setIsDeleteModalVisible(true)
  }

  function handleCloseDeleteContact() {
    setIsDeleteModalVisible(false)
    setContactBeingDeleted(null)
  }

  async function handleConfirmDeleteContact() {
    setIsLoadingDelete(true)
    try {
      await ContactsService.deleteContact(contactBeingDeleted.id);

      setContacts(prevState => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id
      ));
      handleCloseDeleteContact(true);

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso'
      });

    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao deletar o contato'
      });
    }
  }




  return (
    <Container>
      <Loader isLoading={isLoading}/>

      <Modal
      danger
      isLoading={isLoadingDelete}
      visible={isDeleteModalVisible}
      title={`Tem certeza que deseja remover este o contato "${contactBeingDeleted?.name}"`}
      confirmLabel='Deletar'
      onCancel={handleCloseDeleteContact}
      onConfirm={handleConfirmDeleteContact}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>

      {Boolean(contacts.length) && (
        <InputSearchContainer>
        <input value={searchTerm} type="text" placeholder='Pesquise pelo nome...'
        onChange={handleChangeSearchTerm}
        />
       </InputSearchContainer>
      )}

      <Header justifycontent={
        hasError ? 'flex-end'
        : (
          contacts.length > 0
          ? 'space-between'
          : 'center'
        )
      }
        >

        {Boolean(!hasError && contacts.length) && (
          <strong>{filteredContacts.length}
          {filteredContacts.length === 1 ? ' contato' : ' contatos '}
          </strong>
        )}

        <Link to="/new">Novo Contato</Link>

      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>
            <ButtonRetry onClick= {handleRetry}>
              Tentar novamente
              </ButtonRetry>

          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {(contacts.length < 1 && !isLoading) && (
            <EmptyLisContainer>
              <img src={emptyBox} alt="emptybox" />
              <p>Você ainda não tem nenhum contato cadastrado! Clique no botão <strong>"Novo Contato"</strong> à cima para cadastrar o seu primeiro!</p>
            </EmptyLisContainer>
          )}

          {(contacts.length > 0 && filteredContacts.length < 1) && (
              <SearchNotFound>
                <img src={lupa} alt="lupa" />
                <span>
                  Nenhum resultado foi encontrado para <strong>{searchTerm}</strong>
                </span>
              </SearchNotFound>
            )
          }

          {filteredContacts.length > 0 && (
              <ListHeader orderBy={orderBy}>
              <button className="sort-button" type="button" onClick={handleToggleOrderBy}>
                <span>Nome</span>
                <img src={arrow} alt="Arow" />
              </button>
              </ListHeader>
            )}


       {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category_name && (
                <small>{contact.category_name}</small>
              )
              }

            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}><img src={edit} alt="edit" /></Link>
            <button type="button">
              <img onClick={() => handleDeleteContact(contact)} src={trash} alt="Delete" />
            </button>
          </div>
        </Card>
       ))}
        </>
      )}
    </Container>
  );
}
