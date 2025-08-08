import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h2`
  color: ${props => props.theme.colors.titleText};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${props => props.theme.colors.fieldText};
  
  &:hover {
    color: ${props => props.theme.colors.titleText};
  }
`;

const AppointmentItem = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
  background-color: #f9f9f9;
`;

const AppointmentTime = styled.div`
  font-weight: bold;
  color: ${props => props.theme.colors.titleText};
  margin-bottom: 0.5rem;
`;

const AppointmentDescription = styled.div`
  color: ${props => props.theme.colors.fieldText};
`;

const NoAppointments = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.fieldText};
  font-style: italic;
`;

const AgendaModal = ({ isOpen, onClose, selectedDate, appointments }) => {
  if (!isOpen) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredAppointments = appointments.filter(
    appointment => appointment.date === selectedDate
  );

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Agendamentos - {formatDate(selectedDate)}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment, index) => (
            <AppointmentItem key={index}>
              <AppointmentTime>{appointment.time}</AppointmentTime>
              <AppointmentDescription>{appointment.description}</AppointmentDescription>
            </AppointmentItem>
          ))
        ) : (
          <NoAppointments>
            Nenhum agendamento para esta data.
          </NoAppointments>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default AgendaModal; 