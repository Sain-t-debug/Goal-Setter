import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', password2: '' });
  const { name, email, password, password2 } = form;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((s) => s.auth);

  useEffect(() => {
    if (isError) toast.error(message);
    if (isSuccess || user) navigate('/');
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Passwords do not match');
      return;
    }
    dispatch(register({ name, email, password }));
  };

  return (
    <section className="form-page">
      <h1>Create your account</h1>
      <p className="muted">Start tracking your goals in a minute.</p>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={name} onChange={onChange} required />

        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" value={email} onChange={onChange} required />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" name="password" value={password} onChange={onChange} required />

        <label htmlFor="password2">Confirm password</label>
        <input id="password2" type="password" name="password2" value={password2} onChange={onChange} required />

        <button className="btn btn-block" type="submit" disabled={isLoading}>
          {isLoading ? 'Creating account…' : 'Create account'}
        </button>
      </form>
      <p className="muted">
        Already registered? <Link to="/login">Log in</Link>
      </p>
    </section>
  );
}
