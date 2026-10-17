import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteGoal, updateGoal } from '../features/goals/goalSlice';

export default function GoalItem({ goal }) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(goal.text);

  const onSave = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch(updateGoal({ id: goal._id, text: text.trim() }));
    setEditing(false);
  };

  const onCancel = () => {
    setText(goal.text);
    setEditing(false);
  };

  return (
    <li className="goal">
      {editing ? (
        <form className="goal-edit" onSubmit={onSave}>
          <input value={text} onChange={(e) => setText(e.target.value)} autoFocus />
          <button className="btn" type="submit">Save</button>
          <button className="btn btn-quiet" type="button" onClick={onCancel}>Cancel</button>
        </form>
      ) : (
        <>
          <div>
            <p className="goal-text">{goal.text}</p>
            <small>Added {new Date(goal.createdAt).toLocaleDateString()}</small>
          </div>
          <div className="goal-actions">
            <button className="btn btn-quiet" onClick={() => setEditing(true)}>Edit</button>
            <button className="btn btn-danger" onClick={() => dispatch(deleteGoal(goal._id))}>
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}
