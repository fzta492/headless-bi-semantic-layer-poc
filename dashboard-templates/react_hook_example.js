// consumo da API Semântica em um App React
import cubejs from '@cubejs-client/core';
import { useCubeQuery } from '@cubejs-client/react';

const cubeApi = cubejs(
  'TOKEN_DA_API',
  { apiUrl: 'http://localhost:4000/cubejs-api/v1' }
);

const NetRevenueChart = () => {
  // Pede a métrica pelo NOME, sem saber SQL
  const { resultSet, isLoading, error } = useCubeQuery({
    measures: ['orders.net_revenue'],
    timeDimensions: [{
      dimension: 'orders.created_at',
      granularity: 'month',
      dateRange: 'last year',
    }],
  });

  if (isLoading) return <div>Carregando...</div>;
  
  // Renderização do gráfico
  return <Chart data={resultSet.chartPivot()} />;
};
