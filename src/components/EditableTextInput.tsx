import { useState } from "react";

interface EditableTextInputProps {
  initialText: string;
}

const EditableTexInput: React.FC<EditableTextInputProps> = ({
  initialText
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    }
  };

  return isEditing ? (
    <input
      type="text"
      value={text}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      autoFocus
    />
  ) : (
    <div onDoubleClick={handleDoubleClick}>{text}</div>
  );
};

export default EditableTexInput;
