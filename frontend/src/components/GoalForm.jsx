import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGoal } from '../features/goals/goalSlice';

export default function GoalForm() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(createGoal({ text: text.trim() }));
    setText('');
  };

  return (
    <form className="goal-form" onSubmit={onSubmit}>
      <label htmlFor="goal-text">New goal</label>
      <div className="goal-form-row">
        <input
          id="goal-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What do you want to achieve?"
        />
        <button className="btn" type="submit">
          Add goal
        </button>
      </div>
    </form>
  );
}
