import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../services/api';

export function useEmployees() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: () => client.get('/api/employees').then(r => r.data)
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => client.post('/api/employees', data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] })
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: any) => client.put(`/api/employees/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] })
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => client.delete(`/api/employees/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] })
  });

  return { employees: data || [], isLoading, createMutation, updateMutation, deleteMutation };
}
