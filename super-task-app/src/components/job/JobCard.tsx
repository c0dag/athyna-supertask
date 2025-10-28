"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import type { Job } from "@/types/job"
import { MapPin, Briefcase, ChevronRight, Globe, Clock } from "lucide-react"
import { formatDate } from "@/lib/dateUtils"
import { CompanyLetterPhoto } from "../common/CompanyLetterPhoto"

interface JobCardProps {
  job: Job
  onClick?: () => void
}

export function JobCard({ job, onClick }: JobCardProps) {
  return (
    <Card
        className="group cursor-pointer hover:shadow-md transition-shadow duration-200 bg-white hover:bg-gray-50 border border-gray-200 hover:border-purple-variant relative"
      onClick={onClick}
    >
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
        <span 
          className="text-midnight-blue flex items-center whitespace-nowrap cursor-pointer font-medium"
        >
          apply now
          <ChevronRight className="ml-1 h-4 w-4" />
        </span>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-4">
          <div className="flex gap-4 items-center">
            <CompanyLetterPhoto name={job.company?.name}/>
            <div className="flex-1">
              <CardTitle className="text-base font-bold text-gray-900 mb-1">{job.title}</CardTitle>
              <p className="text-sm text-midnight-blue font-medium">{job.company?.name || "Company not specified"}</p>
            </div>
          </div>
          {job.isRemote && (
            <Badge className="flex items-center gap-1 bg-blue-100 text-midnight-blue border-blue-200" variant={"default"}>
              <Globe className="h-3 w-3" />
              <span>Remote</span>
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Badge 
            className="text-xs hover:scale-103 transition duration-300 ease-in-out border border-gray-200"
            variant={"secondary"}>
              <MapPin className="h-3 w-3" />
              <span>{job.location || "Not specified"}</span>
            </Badge>
            <Badge 
              className="text-xs hover:scale-103 transition duration-300 ease-in-out border border-gray-200"
              variant={"secondary"}>
              <Briefcase className="h-3 w-3" />
              <span>{job.type.replace("_", " ")}</span>
            </Badge>
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-1">
            <div className="flex flex-wrap items-center gap-1">
              {job?.skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="text-xs hover:scale-103 transition duration-300 ease-in-out border border-gray-200">
                  {skill}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3 text-gray-400" />
              <span>Posted {formatDate(job.createdAt)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
