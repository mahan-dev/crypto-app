import { fearAndGreedApi } from '@/services/coingecko';
import { useQuery } from '@tanstack/react-query';

import styles from '@/components/modules/css/fearAndGreed/route.module.css';
import Loader from '@/components/loader/Loader';

// import FearAndGreedGauge from '@/components/modules/FearAndGreedGauge';
import { lazy } from 'react';
const FearAndGreedGauge = lazy(() => import('@/components/modules/FearAndGreedGauge'));

const FearAndGreed = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['fearAndGreed'],
    queryFn: async () => fearAndGreedApi(),
  });

  const status = data?.data[0].value_classification ?? '';

  return (
    <section className={styles.gauge}>
      <h4 className={styles.gauge__title}>Fear & Greed</h4>
      {isLoading && (
        <div className="my-auto">
          <Loader />
        </div>
      )}
      {isError && <h2 className="m-auto">Failed ... 😞</h2>}

      {data && !isError && (
        <>
          <FearAndGreedGauge data={data} status={status} />
        </>
      )}
    </section>
  );
};

export default FearAndGreed;
