import { render, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';
import { authContext } from '../context/authContext';

// Mocks para las funciones de navegación y autenticación
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('../context/authContext', () => ({
  useAuth: () => ({
    login: jest.fn(),
    loginWithGoogle: jest.fn(),
  }),
}));

describe('LoginForm', () => {
  it('renders correctly', () => {
    const { getByLabelText } = render(<LoginForm />);
    expect(getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(getByLabelText(/contraseña/i)).toBeInTheDocument();
  });

  it('toggles password visibility', () => {
    const { getByLabelText, getByRole } = render(<LoginForm />);
    const passwordInput = getByLabelText(/contraseña/i);
    const toggleButton = getByRole('button', { name: /mostrar contraseña/i });
    // Asumiendo que el botón de mostrar/ocultar tiene un aria-label o texto

    // Contraseña debería estar oculta inicialmente
    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(toggleButton);
    // Contraseña debería mostrarse después de hacer clic
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  // Añade aquí más pruebas...
});
