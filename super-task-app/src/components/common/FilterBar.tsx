import { useCallback, useEffect, useState } from "react"
import { Search, Loader2 } from "lucide-react"
import { debounce } from "lodash"
import { Input } from "@/components/ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { JobType } from "@/types/job-type"
import { FilterVariant } from "@/types/filter-variant"

interface FilterBarProps {
  searchQuery: string
  jobType?: string
  onSearchChange: (value: string) => void
  onJobTypeChange?: (value: string) => void
  onClear?: () => void
  isSearching?: boolean
  variant?: FilterVariant
}

const jobTypeOptions = [
  { label: "All Types", value: "all" },
  { label: "Full Time", value: JobType.FULL_TIME },
  { label: "Part Time", value: JobType.PART_TIME },
  { label: "Contract", value: JobType.CONTRACT },
  { label: "Internship", value: JobType.INTERNSHIP },
]

export function FilterBar({ 
  searchQuery, 
  jobType, 
  onSearchChange, 
  onJobTypeChange, 
  onClear,
  isSearching = false,
  variant = FilterVariant.JOBS
}: FilterBarProps) {
  const [localSearchValue, setLocalSearchValue] = useState(searchQuery)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearchChange(value)
    }, 300),
    [onSearchChange]
  )

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalSearchValue(value)
    debouncedSearch(value)
  }

  useEffect(() => {
    setLocalSearchValue(searchQuery)
  }, [searchQuery])

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  const getSearchPlaceholder = () => {
    switch (variant) {
      case FilterVariant.APPLICATIONS:
        return "Search applications by candidate name, email, or job title..."
      case FilterVariant.JOBS:
      default:
        return "Search jobs"
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 mb-6 w-full">
      <div className="relative flex-1">
        {isSearching ? (
          <Loader2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 animate-spin" />
        ) : (
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        )}
        <Input
          type="text"
          placeholder={getSearchPlaceholder()}
          value={localSearchValue}
          onChange={handleSearchInputChange}
          className="pl-10 pr-4 h-11 bg-white border-gray-200 !rounded-full shadow-sm focus-visible:border-gray-300 focus-visible:ring-0 placeholder:text-gray-400"
        />
      </div>
      
      {variant === FilterVariant.JOBS && (
        <div className="flex gap-3 md:flex-row">
          {jobType && onJobTypeChange && (
            <Select value={jobType} onValueChange={onJobTypeChange}>
              <SelectTrigger className="w-full md:w-[180px] !h-[42px] bg-white rounded-xl hover:bg-accent hover:text-gray-900 transition-colors">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                {jobTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {onClear && (
            <Button 
              variant="outline" 
              onClick={onClear} 
              className="text-gray-600 hover:text-gray-900 bg-white h-[42px] px-3 whitespace-nowrap rounded-xl flex-1 md:flex-none"
            >
              Clear
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
