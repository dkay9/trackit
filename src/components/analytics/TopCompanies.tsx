// src/components/analytics/TopCompanies.tsx

interface CompanyData {
  company: string;
  count: number;
}

interface TopCompaniesProps {
  data: CompanyData[];
}

export default function TopCompanies({ data }: TopCompaniesProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Companies</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No data to display
        </div>
      </div>
    );
  }

  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Companies Applied</h3>
      
      <div className="space-y-4">
        {data.map((company, index) => (
          <div key={company.company}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500 w-6">
                  #{index + 1}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {company.company}
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {company.count} {company.count === 1 ? 'application' : 'applications'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(company.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}