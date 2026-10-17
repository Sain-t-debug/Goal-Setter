import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import { getGoals, reset } from '../features/goals/goalSlice';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { goals, isLoading, isError, message } = useSelector((s) => s.goals);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(getGoals());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (isError) toast.error(message);
  }, [isError, message]);

  return (
    <>
      <section className="welcome">
        <h1>Hello, {user?.name}</h1>
        <p className="muted">
          {goals.length === 0
            ? 'Your list is empty.'
            : `You have ${goals.length} ${goals.length === 1 ? 'goal' : 'goals'}.`}
        </p>
      </section>

      <GoalForm />

      <section>
        {isLoading ? (
          <p className="muted">Loading your goals…</p>
        ) : goals.length > 0 ? (
          <ul className="goal-list">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </ul>
        ) : (
          <p className="empty">Add your first goal above to get started.</p>
        )}
      </section>
    </>
  );
}
