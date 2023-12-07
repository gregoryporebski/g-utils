import cloneWith from "./cloneWith";

export default function clone<CloneInput>(input: CloneInput): CloneInput {
  return cloneWith({}, input);
}
