import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCreateApplication } from '@/services/applications';
import { Spinner } from '@/components/ui/spinner';

const applicationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface ApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string;
  jobTitle: string;
}

export function ApplicationModal({
  open,
  onOpenChange,
  jobId,
  jobTitle,
}: ApplicationModalProps) {
  const createApplication = useCreateApplication();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      await createApplication.mutateAsync({
        jobId,
        ...data,
      });
      
      toast.success('Application Submitted!', {
        description: "Thank you for your interest. We'll be in touch soon.",
      });
      
      onOpenChange(false);
      reset();
    } catch (error) {
      toast.error('Failed to submit application');
      console.error('Failed to submit application:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply for {jobTitle}</DialogTitle>
          <DialogDescription>
            Fill in your information to apply for this position.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Contact Information</FieldLegend>
              <FieldDescription>
                Please provide your contact details so we can reach you.
              </FieldDescription>

              <FieldGroup>
                <Field data-invalid={!!errors.firstName}>
                  <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                  <Input
                    id="firstName"
                    {...register('firstName')}
                    aria-invalid={!!errors.firstName}
                  />
                  {errors.firstName && (
                    <FieldError>{errors.firstName.message}</FieldError>
                  )}
                </Field>

                <Field data-invalid={!!errors.lastName}>
                  <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                  <Input
                    id="lastName"
                    {...register('lastName')}
                    aria-invalid={!!errors.lastName}
                  />
                  {errors.lastName && (
                    <FieldError>{errors.lastName.message}</FieldError>
                  )}
                </Field>

                <Field data-invalid={!!errors.email}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <FieldError>{errors.email.message}</FieldError>
                  )}
                </Field>

                <Field data-invalid={!!errors.phone}>
                  <FieldLabel htmlFor="phone">Phone</FieldLabel>
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <FieldError>{errors.phone.message}</FieldError>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>

            <div className="flex gap-3 justify-end pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={createApplication.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createApplication.isPending} className="bg-midnight-blue hover:bg-midnight-blue/90 text-white">
                {createApplication.isPending ? (
                  <>
                    <Spinner className="mr-2" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
