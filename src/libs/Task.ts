interface TaskProps {
  id: string;
  title: string;
  description: string;
  assignees: string[];
  dueDate: string | null;
  isDone: boolean;
  doneAt: string | null;
}
export type { TaskProps }

interface TaskItemProps {
  tasks: TaskProps[];
  setTasks: (tasks: TaskProps[]) => void;
  addTask: (
    title: string,
    description: string,
    dueDate: string | null,
    assignees: string[],

  ) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
}
export type { TaskItemProps }

interface TaskFormState {
  title: string,
  description: string,
  dueDate: string | null,
  assignees: string[],
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setDueDate: (dueDate: string | null) => void;
  setAssignee:(assignee:string[])=>void;
  resetForm: () => void;
}
export type { TaskFormState }