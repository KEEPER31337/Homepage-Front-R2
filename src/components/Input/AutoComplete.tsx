interface Item {
  value: any;
  label: string;
  fixed?: boolean;
  group: string;
}

interface AutoCompleteProps {
  items: Array<Item>;
  value: Array<Item> | Item | null;
  onChange: (value: Array<Item> | Item) => void;
  multiple: boolean;
  placeholder: string;
}

const AutoComplete = ({ items, value = null, onChange, multiple = false, placeholder }: AutoCompleteProps) => {
  return;
};

export default AutoComplete;
