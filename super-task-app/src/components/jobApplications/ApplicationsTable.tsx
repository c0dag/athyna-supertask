import { useGetApplications } from '@/services/applications';
import { ApplicationCard } from './ApplicationCard';
import { FilterBar } from '../common/FilterBar';
import { SelectPageSize } from '../common/SelectPageSize';
import { PaginationList } from '../common/Pagination';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { parseUrlParam } from '@/lib/utils';
import { FilterVariant } from '@/types/FilterVariant';

export function ApplicationsTable() {
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [currentPage, setCurrentPage] = useState(() => 
        parseUrlParam(searchParams.get('page'), '1')
    );
    const [pageSize, setPageSize] = useState(() => 
        parseUrlParam(searchParams.get('limit'), '5')
    );
    const [searchQuery, setSearchQuery] = useState(() => 
        searchParams.get('search') || ''
    );
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams();
        if (currentPage > 1) params.set('page', currentPage.toString());
        if (pageSize !== 5) params.set('limit', pageSize.toString());
        if (searchQuery) params.set('search', searchQuery);
        
        setSearchParams(params);
    }, [currentPage, pageSize, searchQuery, setSearchParams]);

    const { data, isPending } = useGetApplications({
        page: currentPage,
        limit: pageSize,
        search: searchQuery || undefined,
    });

    const { applications = [], pagination } = data || {};

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
        setCurrentPage(1);
    };

    const handleSearchChange = (search: string) => {
        setIsSearching(true);
        setSearchQuery(search);
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setSearchQuery('');
        setCurrentPage(1);
    };

    useEffect(() => {
        if (!isPending) {
            setIsSearching(false);
        }
    }, [isPending]);

    return (
        <div>
            <h1 className="flex text-4xl font-bold mb-8 items-center justify-center text-midnight-blue">Applications</h1>

            <FilterBar
                variant={FilterVariant.APPLICATIONS}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                onClear={handleClearFilters}
                isSearching={isSearching && isPending}
            />
            
            {isPending ? (
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="animate-pulse bg-gray-200 h-20 rounded-lg"></div>
                    ))}
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {applications.length > 0 ? (
                            applications.map((application) => (
                                <ApplicationCard key={application.id} application={application} />
                            ))
                        ) : (
                            <p className="text-center text-gray-600 text-lg">
                                No applications found. Please try again with different filters.
                            </p>
                        )}
                    </div>
                    
                    {pagination && (
                        <div className="my-4 flex justify-between items-center">
                            <SelectPageSize 
                                value={pageSize} 
                                onValueChange={handlePageSizeChange}
                            />
                            <PaginationList 
                                pagination={pagination} 
                                onPageChange={handlePageChange} 
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}