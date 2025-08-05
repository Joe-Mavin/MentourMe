import User from './user.mjs';
import Journey from './journey.mjs';
import Task from './task.mjs';
import Specialization from './specialization.mjs';
import Message from './message.mjs';

// User <-> Journey
User.hasMany(Journey, { foreignKey: 'userId', as: 'journeys' });
Journey.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Journey <-> Task
Journey.hasMany(Task, { foreignKey: 'journeyId', as: 'tasks' });
Task.belongsTo(Journey, { foreignKey: 'journeyId', as: 'journey' });

// Task <-> User
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.belongsToMany(Specialization, { through: 'UserSpecialization', as: 'specializations', foreignKey: 'userId' });
Specialization.belongsToMany(User, { through: 'UserSpecialization', as: 'users', foreignKey: 'specializationId' });

// Message associations
Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
Message.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' });
User.hasMany(Message, { as: 'sentMessages', foreignKey: 'senderId' });
User.hasMany(Message, { as: 'receivedMessages', foreignKey: 'receiverId' });

export { User, Journey, Task, Message }; 