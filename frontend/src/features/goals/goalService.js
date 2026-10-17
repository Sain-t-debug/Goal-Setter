import axios from 'axios';

const API_URL = '/api/goals/';

const config = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

const getGoals = async (token) => (await axios.get(API_URL, config(token))).data;

const createGoal = async (goalData, token) =>
  (await axios.post(API_URL, goalData, config(token))).data;

const updateGoal = async (id, goalData, token) =>
  (await axios.put(API_URL + id, goalData, config(token))).data;

const deleteGoal = async (id, token) =>
  (await axios.delete(API_URL + id, config(token))).data;

export default { getGoals, createGoal, updateGoal, deleteGoal };
