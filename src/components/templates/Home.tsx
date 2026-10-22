import { getMarketList } from '@/services/coingecko';
import { lazy, Suspense, useEffect, useState } from 'react';
import type { CoinsProps } from '@/components/modules/CoinsList';

import { useQuery } from '@tanstack/react-query';
import stylesBanner from '@/components/modules/css/coinsList/route.module.css';

const CurrencyDropDown = lazy(() => import('@/components/modules/CurrencyDropDown'));
const CoinsList = lazy(() => import('@/components/modules/CoinsList'));
const PaginationPage = lazy(() => import('@/components/modules/Pagination'));

const FearAndGreed = lazy(() => import('@/components/modules/FearAndGreed'));
const AltCoinSeason = lazy(() => import('@/components/modules/AltCoinSeason'));
const Cmc20Chart = lazy(() => import('@/components/modules/Cmc20Chart'));

import 'react-loading-skeleton/dist/skeleton.css';
import HeaderSkeleton from '@/components/ui/reactSkeleton/skeleton';

import TableSkeleton from '@/components/ui/reactSkeleton/tableSkeleton';
import type { MarketError, MarketType } from '@/types/marketTypes';
import { toast, Toaster } from 'sonner';

const Home = () => {
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState<CoinsProps['currency']>('usd');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['crypto', page, currency],
    queryFn: () => getMarketList(currency, page),
  });

  const { status } = (data as MarketType) ?? [];
  const errorStatus = isError && status !== 'Success';

  const dataType = Array.isArray(data?.data) && data.data.length > 0;
  const coins = Array.isArray(data?.data) ? data.data : [];

  useEffect(() => {
    toast.warning('Ai chat may not accessible due to free api', { position: 'top-right' });
  }, []);
  return (
    <section>
      <div className={stylesBanner.coin__status}>
        <Suspense fallback={<HeaderSkeleton />}>
          <FearAndGreed />
        </Suspense>

        <Suspense fallback={<HeaderSkeleton />}>
          <AltCoinSeason />
        </Suspense>
        <Suspense fallback={<HeaderSkeleton />}>
          <Cmc20Chart />
        </Suspense>
      </div>
      {!dataType && (data?.data as MarketError)?.status?.error_code === 429 && (
        <h2 className="w-full flex justify-center mt-6">Something wen&apos;t wrong</h2>
      )}

      {isLoading && <TableSkeleton />}
      {dataType ? (
        <div className="mt-6 relative z-1">
          <CurrencyDropDown currency={currency} setCurrency={setCurrency} />

          <CoinsList data={coins} currency={currency} />
          <PaginationPage page={page} setPage={setPage} />
        </div>
      ) : (
        ''
      )}
      {errorStatus && (
        <h2 className="w-full flex justify-center mt-6">Something wen&apos;t wrong</h2>
      )}
      <Toaster />
    </section>
  );
};

export default Home;
