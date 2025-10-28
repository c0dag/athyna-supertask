import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateJob } from "@/services/jobs";
import { useGetCompanies } from "@/services/companies";
import { JobType } from "@/types/JobType";
import type { CreateJobData } from "@/types/job";
import { 
  Field, 
  FieldError, 
  FieldLabel 
} from "@/components/ui/field";

const createJobSchema = z.object({
  title: z.string().min(1, 'Job title is required'),
  description: z.string().min(1, 'Description is required'),
  location: z.string().optional(),
  salary: z.string().optional(),
  type: z.string().refine((val) => Object.values(JobType).includes(val as JobType), {
    message: 'Invalid job type',
  }),
  skills: z.string(),
  companyId: z.string().min(1, 'Company is required'),
  isRemote: z.boolean(),
});

type CreateJobFormData = z.infer<typeof createJobSchema>;

export function CreateJobForm() {
  const createJob = useCreateJob();
  const { data: companies = [], isLoading: isLoadingCompanies } = useGetCompanies();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CreateJobFormData>({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      type: JobType.FULL_TIME,
      skills: '',
      isRemote: false,
      companyId: '',
    },
  });

  const companyId = watch('companyId');
  const jobType = watch('type');

  const onSubmit = async (data: CreateJobFormData) => {
    try {
      const skillsArray = data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : [];
      const payload: CreateJobData = {
        title: data.title,
        description: data.description,
        type: data.type,
        skills: skillsArray,
        companyId: data.companyId,
        ...(data.location && { location: data.location }),
        ...(data.salary && { salary: Number(data.salary) }),
        ...(data.isRemote && { isRemote: data.isRemote }),
      };
      await createJob.mutateAsync(payload);
      toast.success('Job created successfully!');
      reset({
        title: '',
        description: '',
        type: JobType.FULL_TIME,
        skills: '',
        isRemote: false,
        companyId: '',
        location: '',
        salary: '',
      });
    } catch (error) {
      toast.error('Failed to create job');
      console.error('Error creating job:', error);
    }
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-midnight-blue">Create New Job</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field data-invalid={!!errors.title}>
            <FieldLabel htmlFor="title" className="text-midnight-blue">Job Title *</FieldLabel>
            <Input
              id="title"
              {...register('title')}
              aria-invalid={!!errors.title}
            />
            {errors.title && <FieldError>{errors.title.message}</FieldError>}
          </Field>

          <Field data-invalid={!!errors.description}>
            <FieldLabel htmlFor="description" className="text-midnight-blue">Description *</FieldLabel>
            <textarea
              id="description"
              {...register('description')}
              aria-invalid={!!errors.description}
              className={`w-full min-h-[120px] rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 ${
                errors.description ? 'border-destructive' : 'border-input'
              }`}
            />
            {errors.description && <FieldError>{errors.description.message}</FieldError>}
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field data-invalid={!!errors.location}>
              <FieldLabel htmlFor="location" className="text-midnight-blue">Location</FieldLabel>
              <Input
                id="location"
                {...register('location')}
                aria-invalid={!!errors.location}
              />
              {errors.location && <FieldError>{errors.location.message}</FieldError>}
            </Field>

            <Field data-invalid={!!errors.salary}>
              <FieldLabel htmlFor="salary" className="text-midnight-blue">Salary</FieldLabel>
              <Input
                id="salary"
                type="number"
                {...register('salary')}
                placeholder="e.g. 50000"
                aria-invalid={!!errors.salary}
              />
              {errors.salary && <FieldError>{errors.salary.message}</FieldError>}
            </Field>
          </div>

          <Field data-invalid={!!errors.type}>
            <FieldLabel htmlFor="type" className="text-midnight-blue">Job Type *</FieldLabel>
            <Select 
              value={jobType} 
              onValueChange={(value) => setValue('type', value)}
            >
              <SelectTrigger id="type" className={`w-full ${errors.type ? 'border-destructive' : ''}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={JobType.FULL_TIME}>Full Time</SelectItem>
                <SelectItem value={JobType.PART_TIME}>Part Time</SelectItem>
                <SelectItem value={JobType.CONTRACT}>Contract</SelectItem>
                <SelectItem value={JobType.INTERNSHIP}>Internship</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <FieldError>{errors.type.message}</FieldError>}
          </Field>

          <Field data-invalid={!!errors.skills}>
            <FieldLabel htmlFor="skills" className="text-midnight-blue">Skills (comma separated)</FieldLabel>
            <Input
              id="skills"
              {...register('skills')}
              placeholder="e.g. React, TypeScript, Node.js"
              aria-invalid={!!errors.skills}
            />
            {errors.skills && <FieldError>{errors.skills.message}</FieldError>}
          </Field>

          <Field data-invalid={!!errors.companyId}>
            <FieldLabel htmlFor="companyId" className="text-midnight-blue">Company *</FieldLabel>
            {companyId ? (
              <div className="flex gap-2">
                <Select 
                  value={companyId} 
                  onValueChange={(value) => setValue('companyId', value, { shouldValidate: true })}
                >
                  <SelectTrigger id="companyId" className={`flex-1 ${errors.companyId ? 'border-destructive' : ''}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingCompanies ? (
                      <SelectItem value="loading" disabled>Loading companies...</SelectItem>
                    ) : (
                      companies.map((company) => (
                        <SelectItem key={company.id} value={company.id}>
                          {company.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setValue('companyId', '', { shouldValidate: true })}
                >
                  Clear
                </Button>
              </div>
            ) : (
              <Select 
                value=""
                onValueChange={(value) => setValue('companyId', value, { shouldValidate: true })}
              >
                <SelectTrigger id="companyId" className={`w-full ${errors.companyId ? 'border-destructive' : ''}`}>
                  <SelectValue placeholder={isLoadingCompanies ? "Loading companies..." : "Select a company"} />
                </SelectTrigger>
                <SelectContent>
                  {isLoadingCompanies ? (
                    <SelectItem value="loading" disabled>Loading companies...</SelectItem>
                  ) : (
                    companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            )}
            {errors.companyId && <FieldError>{errors.companyId.message}</FieldError>}
          </Field>

          <Field>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isRemote"
                {...register('isRemote')}
                className="h-4 w-4"
              />
              <FieldLabel htmlFor="isRemote" className="!font-normal cursor-pointer text-midnight-blue">Remote Position</FieldLabel>
            </div>
          </Field>

          <Button type="submit" disabled={createJob.isPending} className="w-full bg-midnight-blue hover:bg-midnight-blue/90 text-white">
            {createJob.isPending ? 'Creating...' : 'Create Job'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

