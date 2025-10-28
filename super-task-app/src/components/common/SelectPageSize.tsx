import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectPageSizeProps {
  value: number;
  onValueChange: (value: number) => void;
}

export function SelectPageSize({ value, onValueChange }: SelectPageSizeProps) {
  const handleValueChange = (stringValue: string) => {
    onValueChange(parseInt(stringValue, 10));
  };

  return (
    <Select value={value.toString()} onValueChange={handleValueChange}>
      <SelectTrigger className="w-auto bg-white">
        <SelectValue placeholder="Size" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="25">25</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}