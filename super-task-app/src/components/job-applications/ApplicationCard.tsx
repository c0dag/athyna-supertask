import type { Application } from "@/types/application";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Mail, Building2, Phone, Copy } from "lucide-react";
import { formatDate } from "@/lib/date";
import { toast } from "sonner";

export function ApplicationCard({ application }: { application: Application }) {

    return (
        <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg font-semibold text-gray-900">
                            {application.job.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                            <Building2 className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">
                                {application.job.company.name}
                            </span>
                        </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                        Applied {formatDate(application.createdAt)}
                    </Badge>
                </div>
            </CardHeader>
            
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-blue-500" />
                            <span className="text-sm font-medium text-gray-700">
                                {application.candidate.firstName} {application.candidate.lastName}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-600">
                                {application.candidate.phone}
                            </span>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-600">
                                {application.candidate.email}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-purple-500" />
                            <span className="text-sm text-gray-600">
                                Application ID:
                            </span>
                            <button
                                onClick={async () => {
                                    try {
                                        await navigator.clipboard.writeText(application.id);
                                        toast.success('ID copied to clipboard');
                                    } catch {
                                        toast.error('Failed to copy ID');
                                    }
                                }}
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 hover:underline transition-colors cursor-pointer"
                            >
                                {application.id.slice(0, 8)}...
                                <Copy className="h-3 w-3" />
                            </button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}