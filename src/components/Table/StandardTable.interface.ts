interface ChildComponent<T> {
  key: keyof T;
  value: T[keyof T];
  rowData: T;
}

export default ChildComponent;
