import mongoose from 'mongoose';

export interface Project extends mongoose.Document {
  project_id: string;
  id: string;
  events: JSON;
}

export const ProjectSchema = new mongoose.Schema({
  project_id: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  events: { type: JSON, required: true, select: false },
});

const Project = mongoose.model<Project>('Project', ProjectSchema);
export default Project;
