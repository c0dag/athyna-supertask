import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApplicationsTable } from "@/components/jobApplications/ApplicationsTable";
import { CreateJobForm } from "@/components/jobApplications/CreateJobForm";
import { Header } from "@/components/common/Header";

export function AdminPage() {
    return (
        <div className="min-h-screen" style={{ background: 'radial-gradient(circle at left top, rgba(37, 150, 190, 0.1), transparent 40%), radial-gradient(circle at bottom right, rgba(212, 23, 199, 0.1), transparent 40%), rgb(249, 249, 249)' }}>
            <Header />
            <div className='max-w-6xl mx-auto px-4 py-2 flex flex-col items-center'>
                <Tabs defaultValue="applications" className="w-full max-w-4xl">
                    <div className="flex justify-start mb-6">
                        <TabsList>
                            <TabsTrigger value="applications">Applications</TabsTrigger>
                            <TabsTrigger value="create-job">Create Job</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="applications">
                        <ApplicationsTable />
                    </TabsContent>
                    <TabsContent value="create-job">
                        <CreateJobForm />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
