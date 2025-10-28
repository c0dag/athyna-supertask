import { useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CompanyLetterPhoto } from "@/components/common/CompanyLetterPhoto"
import { ArrowLeft, MapPin, Briefcase, Building2, Clock, User, Award, FileText, CheckCircle2, DollarSign, Calendar } from "lucide-react"
import { useGetJobById } from "@/services/jobs"
import { JobStatus } from "@/types/JobStatus"
import { ApplicationModal } from '@/components/job/ApplicationModal'
import { Header } from '@/components/common/Header'
import { formatSalary } from '@/lib/utils'
import { formatDateLong } from '@/lib/dateUtils'
import { JobDetailedSkeleton } from '@/components/job/JobDetailedSkeleton'

export function JobDetailed() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: job, isLoading, error } = useGetJobById(id)

  if (isLoading) {
    return <JobDetailedSkeleton />
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Not Found</h2>
          <p className="text-gray-600 mb-4">The job you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/")} variant={"outline"}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: 'radial-gradient(circle at left top, rgba(37, 150, 190, 0.1), transparent 40%), radial-gradient(circle at bottom right, rgba(212, 23, 199, 0.1), transparent 40%), rgb(249, 249, 249)' }}>
      <Header />
      <div className="max-w-4xl mx-auto px-4 pb-4">
        <Button 
          onClick={() => navigate("/")} 
          variant="outline" 
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go back
        </Button>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-200 !pb-[12px]">
            <div className="space-y-4">
              <div className="flex gap-4 items-center">
                <CompanyLetterPhoto name={job.company?.name || "Company"} />
                <div className="flex-1">
                  <CardTitle className="text-2xl font-bold text-midnight-blue">
                    {job.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-blue-600">
                    <Building2 className="h-5 w-5" />
                    <span className="font-medium text-lg">{job.company?.name || "Company not specified"}</span>
                  </div>
                  {job.company?.description && (
                    <p className="text-gray-600 text-sm">{job.company.description}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{job.location || "Not specified"}</span>
                </div>
                
                <div className="h-5 w-px bg-gray-300 mx-1" />
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{job.type.replace("_", " ")}</span>
                </div>
                
                <div className="h-5 w-px bg-gray-300 mx-1" />
                
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">Posted {formatDateLong(job.createdAt)}</span>
                </div>
                
                {job.salary && (
                  <>
                    <div className="h-5 w-px bg-gray-300 mx-1" />
                    <div className="flex items-center gap-2 text-green-600">
                      <span className="text-sm font-semibold">${formatSalary(job.salary)}/year</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <div className="p-1.5 bg-blue-50/50 shadow-sm rounded-full">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-midnight-blue">Job Description</span>
                </h3>
                <div className="prose prose-gray max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line ">
                    {job.description}
                  </div>
                </div>
              </div>

              {job.skills && job.skills.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="p-1.5 bg-amber-50/50 shadow-sm rounded-full">
                      <Award className="h-5 w-5 text-amber-600" />
                    </div>
                    <span className="text-midnight-blue">Required Skills</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="px-3 py-1.5 bg-blue-50 text-blue-700 font-medium border border-blue-200 hover:bg-blue-100 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border border-gray-200 bg-gradient-to-br from-white to-blue-50/30 shadow-sm">
                  <CardHeader className="!pb-2 border-b border-gray-100">
                    <CardTitle className="text-lg text-midnight-blue flex items-center gap-2">
                      <div className="p-1.5 bg-blue-100 rounded-md">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      Job Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Briefcase className="h-4 w-4 text-gray-400" />
                        <span>Job Type</span>
                      </div>
                      <Badge className="bg-blue-50 text-blue-700 border-blue-200 font-medium">
                        {job.type.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-2 text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-gray-400" />
                        <span>Status</span>
                      </div>
                      <Badge className={`font-medium ${
                        job.status === JobStatus.ACTIVE 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : 'bg-gray-50 text-gray-600 border-gray-200'
                      }`}>
                        {job.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>Location</span>
                      </div>
                      <span className="text-right text-midnight-blue">{job.location}</span>
                    </div>
                    {job.salary && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-600">
                          <DollarSign className="h-4 w-4" />
                          <span>Salary</span>
                        </div>
                        <span className="text-midnight-blue">${formatSalary(job.salary)}/year</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 bg-gradient-to-br from-white to-purple-50/30 shadow-sm">
                  <CardHeader className="!pb-2 border-b border-gray-100">
                    <CardTitle className="text-lg text-midnight-blue flex items-center gap-2">
                      <div className="p-1.5 bg-purple-100 rounded-md">
                        <Building2 className="h-4 w-4 text-purple-600" />
                      </div>
                      Company Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Building2 className="h-4 w-4 text-gray-400" />
                        <span>Company</span>
                      </div>
                      <span className="text-right text-midnight-blue">{job.company?.name || "Not specified"}</span>
                    </div>
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Posted</span>
                      </div>
                      <span className="text-right text-gray-700">{formatDateLong(job.createdAt)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>Updated</span>
                      </div>
                      <span className="text-right text-gray-700">{formatDateLong(job.updatedAt)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="pt-5 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  {job.isApplied ? (
                    <Button size="lg" className="sm:px-8" disabled>
                      Applied
                    </Button>
                  ) : (
                    <Button size="lg" className="sm:px-8 bg-midnight-blue hover:bg-midnight-blue/90 text-white" onClick={() => setIsModalOpen(true)}>
                      Apply now
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <ApplicationModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        jobId={id!}
        jobTitle={job.title}
      />
    </div>
  )
}
