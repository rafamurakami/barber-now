import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => props.theme.colors.background};
`;

const LoginForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.titleText};
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.fieldText};
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  color: ${props => props.theme.colors.fieldText};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.titleText};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: ${props => props.theme.colors.buttonBackground};
  color: ${props => props.theme.colors.buttonText};
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 1rem;
  
  &:hover {
    opacity: 0.9;
  }
`;

const ForgotPassword = styled.a`
  display: block;
  text-align: center;
  color: ${props => props.theme.colors.titleText};
  text-decoration: none;
  margin-bottom: 1rem;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const RegisterLink = styled.a`
  display: block;
  text-align: center;
  color: ${props => props.theme.colors.titleText};
  text-decoration: none;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const LoginFormComponent = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/admin');
      } else {
        setError(data.error || 'Erro no login');
      }
    } catch (err) {
      setError('Erro de conexão');
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Login</Title>
        
        {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        
        <FormGroup>
          <Label htmlFor="username">Usuário</Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="password">Senha</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <Button type="submit">Entrar</Button>
        
        <ForgotPassword onClick={() => alert('Funcionalidade em desenvolvimento')}>
          Esqueceu sua senha?
        </ForgotPassword>
        
        <RegisterLink onClick={() => navigate('/register')}>
          Cadastrar-se
        </RegisterLink>
      </LoginForm>
    </LoginContainer>
  );
};

export default LoginFormComponent; 