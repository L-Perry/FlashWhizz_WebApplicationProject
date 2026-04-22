export interface HealthStatus {
  status: string;
  message: string;
}

export const getHealthStatus = (): HealthStatus => ({
  status: 'ok',
  message: 'TypeScript Express MVC backend is running'
});
