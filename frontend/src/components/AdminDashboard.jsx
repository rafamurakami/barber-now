import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AgendaModal from './AgendaModal';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
`;

const Header = styled.header`
  background-color: ${props => props.theme.colors.menuBackground};
  color: ${props => props.theme.colors.menuText};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Menu = styled.nav`
  display: flex;
  gap: 2rem;
`;

const MenuItem = styled.a`
  color: ${props => props.theme.colors.menuText};
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Profile = styled.div`
  color: ${props => props.theme.colors.menuText};
  font-weight: 500;
`;

const LogoutButton = styled.button`
  background: none;
  border: 1px solid ${props => props.theme.colors.menuText};
  color: ${props => props.theme.colors.menuText};
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 1rem;
  
  &:hover {
    background-color: ${props => props.theme.colors.menuText};
    color: ${props => props.theme.colors.menuBackground};
  }
`;

const MainContent = styled.main`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.titleText};
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const AgendaContainer = styled.div`
  background-color: ${props => props.theme.colors.agendaBackground};
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const WeekGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const DayCard = styled.div`
  background-color: ${props => props.hasAppointments ? props.theme.colors.dateBackground : '#f0f0f0'};
  color: ${props => props.hasAppointments ? props.theme.colors.dateText : props.theme.colors.fieldText};
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const DayName = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const DayNumber = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const AppointmentCount = styled.div`
  font-size: 0.8rem;
  margin-top: 0.5rem;
  opacity: 0.8;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: ${props => props.theme.colors.fieldText};
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: red;
  font-size: 1.2rem;
`;

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAgenda();
  }, []);

  const fetchAgenda = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/agenda', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      } else {
        setError('Erro ao carregar agenda');
      }
    } catch (err) {
      setError('Erro de conexão');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const getWeekDays = () => {
    const today = new Date();
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    
    return days;
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getAppointmentsForDate = (date) => {
    const dateString = formatDate(date);
    return appointments.filter(appointment => appointment.date === dateString);
  };

  const weekDays = getWeekDays();

  if (loading) {
    return (
      <DashboardContainer>
        <Header>
          <Menu>
            <MenuItem onClick={() => alert('Funcionalidade em desenvolvimento')}>Histórico</MenuItem>
            <MenuItem onClick={() => alert('Funcionalidade em desenvolvimento')}>Listas</MenuItem>
            <MenuItem onClick={() => alert('Funcionalidade em desenvolvimento')}>Promoções</MenuItem>
            <MenuItem onClick={() => alert('Funcionalidade em desenvolvimento')}>Avaliações</MenuItem>
            <MenuItem onClick={() => alert('Funcionalidade em desenvolvimento')}>Configuração</MenuItem>
          </Menu>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Profile>Perfil: ADM</Profile>
            <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
          </div>
        </Header>
        <MainContent>
          <LoadingMessage>Carregando agenda...</LoadingMessage>
        </MainContent>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <Header>
        <Menu>
          <MenuItem onClick={() => alert('Funcionalidade em desenvolvimento')}>Histórico</MenuItem>
          <MenuItem onClick={() => alert('Funcionalidade em desenvolvimento')}>Listas</MenuItem>
          <MenuItem onClick={() => alert('Funcionalidade em desenvolvimento')}>Promoções</MenuItem>
          <MenuItem onClick={() => alert('Funcionalidade em desenvolvimento')}>Avaliações</MenuItem>
          <MenuItem onClick={() => alert('Funcionalidade em desenvolvimento')}>Configuração</MenuItem>
        </Menu>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Profile>Perfil: ADM</Profile>
          <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
        </div>
      </Header>
      
      <MainContent>
        <Title>Agenda Semanal</Title>
        
        {error ? (
          <ErrorMessage>{error}</ErrorMessage>
        ) : (
          <AgendaContainer>
            <WeekGrid>
              {weekDays.map((day, index) => {
                const dayAppointments = getAppointmentsForDate(day);
                const hasAppointments = dayAppointments.length > 0;
                
                return (
                  <DayCard
                    key={index}
                    hasAppointments={hasAppointments}
                    onClick={() => handleDayClick(formatDate(day))}
                  >
                    <DayName>
                      {day.toLocaleDateString('pt-BR', { weekday: 'short' })}
                    </DayName>
                    <DayNumber>{day.getDate()}</DayNumber>
                    {hasAppointments && (
                      <AppointmentCount>
                        {dayAppointments.length} agendamento(s)
                      </AppointmentCount>
                    )}
                  </DayCard>
                );
              })}
            </WeekGrid>
          </AgendaContainer>
        )}
      </MainContent>
      
      <AgendaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
        appointments={appointments}
      />
    </DashboardContainer>
  );
};

export default AdminDashboard; 