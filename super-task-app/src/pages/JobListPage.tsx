import { useGetJobs } from '@/services/jobs'
import { JobCard } from '@/components/job/JobCard';
import { useNavigate, useSearchParams } from "react-router-dom"
import { PaginationList } from '@/components/common/Pagination';
import { SelectPageSize } from '@/components/common/SelectPageSize';
import { FilterBar } from '@/components/common/FilterBar';
import { Header } from '@/components/common/Header';
import { JobCardSkeletonList } from '@/components/job/JobCardSkeleton';
import { useState, useEffect } from 'react';
import { parseUrlParam } from '@/lib/utils';


export function JobListPage () {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  
  const [currentPage, setCurrentPage] = useState(() => 
    parseUrlParam(searchParams.get('page'), '1')
  );
  const [pageSize, setPageSize] = useState(() => 
    parseUrlParam(searchParams.get('limit'), '5')
  );
  const [searchQuery, setSearchQuery] = useState(() => 
    searchParams.get('search') || ''
  );
  const [jobType, setJobType] = useState(() => 
    searchParams.get('type') || 'all'
  );
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams()
    if (currentPage > 1) params.set('page', currentPage.toString())
    if (pageSize !== 5) params.set('limit', pageSize.toString())
    if (searchQuery) params.set('search', searchQuery)
    if (jobType !== 'all') params.set('type', jobType)
    
    setSearchParams(params)
  }, [currentPage, pageSize, searchQuery, jobType, setSearchParams])

  const { data, isPending } = useGetJobs({
    page: currentPage,
    limit: pageSize,
    search: searchQuery || undefined,
    type: jobType !== 'all' ? jobType : undefined
  })

  const { jobs = [], pagination } = data || {};

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

  const handleJobTypeChange = (type: string) => {
    setJobType(type);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setJobType('all');
    setCurrentPage(1);
  };

  useEffect(() => {
    if (!isPending) {
      setIsSearching(false);
    }
  }, [isPending]);

  return(
    <>
      <div className="min-h-screen" style={{ background: 'radial-gradient(circle at left top, rgba(37, 150, 190, 0.1), transparent 40%), radial-gradient(circle at bottom right, rgba(212, 23, 199, 0.1), transparent 40%), rgb(249, 249, 249)' }}>
        <Header />
        <div className='max-w-6xl mx-auto px-4 py-2'>
          <h1 className="flex text-4xl font-bold mb-2 items-center justify-center text-midnight-blue">Job Listings</h1>
          <div className='flex flex-col items-center justify-center mb-6'>
            <p className='max-w-2xl mx-4 text-xl text-center text-gray-600 leading-relaxed'>
              Skip the manual forms. Just upload your LinkedIn CV and let our AI connect you with roles that match your experience, skills, and goals.
            </p>
          </div>
          
          <FilterBar
            searchQuery={searchQuery}
            jobType={jobType}
            onSearchChange={handleSearchChange}
            onJobTypeChange={handleJobTypeChange}
            onClear={handleClearFilters}
            isSearching={isSearching && isPending}
          />

          {isPending ? (
            <JobCardSkeletonList count={6} />
          ) : (
            <>
              <div className='flex flex-col gap-3'>
                {jobs.length > 0 ?
                 jobs.map((job) => <JobCard key={job.id} job={job} onClick={() => navigate(`/job/${job.id}`)} />) 
                 : <p className='text-center text-gray-600 text-lg'>
                  No jobs found. Please try again with different filters.
                </p>}
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
      </div>
    </>
  )
}