import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const tableWidthHeader = [16, 60, 50, 36, 36, 36, 80, 80, 90];

const TableSkeleton = ({ rows = 10 }: { rows?: number }) => {
  return (
    // Your original look (gray base, #444 highlight, 1.2s) applied to every skeleton below
    <SkeletonTheme baseColor="#6b7280" highlightColor="#444" duration={1.2}>
      <div className="mt-6 w-full overflow-x-auto" aria-busy="true" aria-label="Loading coins">
        {/* Currency dropdown placeholder */}
        <div className="mb-4 flex justify-start">
          <Skeleton width={75} height={36} borderRadius={8} />
        </div>

        <table className="w-full min-w-225 border-collapse">
          <thead>
            <tr>
              {tableWidthHeader.map((w, i) => (
                <th key={i} className={`p-3 ${i < 2 ? 'text-left' : 'text-right'}`}>
                  <Skeleton width={w} />
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i}>
                {/* Rank */}
                <td className="p-">
                  <Skeleton width={20} />
                </td>

                {/* Coin: icon + name + symbol */}
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <Skeleton circle width={32} height={32} />
                    <div className="flex flex-col">
                      <Skeleton width={90} />
                      <Skeleton width={40} height={10} />
                    </div>
                  </div>
                </td>

                {/* Price */}
                <td className="p-3 text-right">
                  <Skeleton width={70} />
                </td>

                {/* 1h / 24h / 7d change */}
                {[0, 1, 2].map((n) => (
                  <td key={n} className="p-3 text-right">
                    <Skeleton width={45} />
                  </td>
                ))}

                {/* 24h volume */}
                <td className="p-3 text-right">
                  <Skeleton width={90} />
                </td>

                {/* Market cap */}
                <td className="p-3 text-right">
                  <Skeleton width={100} />
                </td>

                {/* 7d sparkline */}
                <td className="p-3 text-right">
                  <Skeleton width={110} height={36} borderRadius={6} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination placeholder */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} width={32} height={32} borderRadius={6} />
          ))}
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default TableSkeleton;
