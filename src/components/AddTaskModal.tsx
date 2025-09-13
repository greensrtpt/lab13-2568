import {
  Modal,
  Stack,
  TextInput,
  Textarea,
  Button,
  MultiSelect,
  type MultiSelectProps,
  Avatar,
  Group,
  Text,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useTaskFormStore } from "../store/TaskFromStore1";

interface AddTaskModalProps {
  opened: boolean;
  onClose: () => void;
  onAdd: (title: string, description: string, dueDate: string | null, assignees:string[]) => void;
}
const usersData: Record<string, { image: string; email: string }> = {
  "Emily Johnson": {
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png",
    email: "emily92@gmail.com",
  },
  "Ava Rodriguez": {
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png",
    email: "ava_rose@gmail.com",
  },
  "Olivia Chen": {
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-4.png",
    email: "livvy_globe@gmail.com",
  },
  "Ethan Barnes": {
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
    email: "ethan_explorer@gmail.com",
  },
  "Mason Taylor": {
    image:
      "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png",
    email: "mason_musician@gmail.com",
  },
};

export default function AddTaskModal({
  opened,
  onClose,
  onAdd,
}: AddTaskModalProps) {

  const {
    title,
    description,
    dueDate,
    assignees,
    setTitle,
    setDescription,
    setDueDate,
    setAssignee,
    resetForm,
  } = useTaskFormStore();

  const renderMultiSelectOption: MultiSelectProps['renderOption'] = ({ option }) => (
  <Group gap="sm">
    <Avatar src={usersData[option.value].image} size={36} radius="xl" />
    <div>
      <Text size="sm">{option.value}</Text>
      <Text size="xs" opacity={0.5}>
        {usersData[option.value].email}
      </Text>
    </div>
  </Group>
);

  const handleAdd = () => {
    if (!title.trim() || !description.trim() || !dueDate) return;
    onAdd(title, description, dueDate,assignees);
    onClose();
    resetForm();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Task">
      <Stack>
        <TextInput
          label="Title"
          withAsterisk
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          error={!title.trim() && "Title is required"}
        />
        <Textarea
          label="Description"
          withAsterisk
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
          error={!description.trim() && "Description is required"}
        />
        <DateInput
          label="Due Date"
          withAsterisk
          valueFormat="ddd MMM DD YYYY"
          minDate={new Date()}
          value={dueDate}
          onChange={(date) => setDueDate(date ? date : null)}
          error={!dueDate?.trim() ? "Due Date is required" : false}
        />
        {/* เพิ่ม MultiSelect ตรงนี้*/}
        <MultiSelect
          label="Assignees"
          withAsterisk
          searchable
          value={assignees}
          placeholder="Search for assignees"
          renderOption={renderMultiSelectOption}
          onChange={(e)=>setAssignee(e)}
          error={assignees.length ===0 ? "Assignee is required" : false}
          data={['Emily Johnson', 'Ava Rodriguez', 'Olivia Chen', 'Ethan Barnes', 'Mason Taylor']}
        />
        <Button onClick={handleAdd}>Save</Button>
      </Stack>
    </Modal>
  );
}