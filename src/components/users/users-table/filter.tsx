'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const UsersFilter = () => {
  const searchParams = useSearchParams();

  const setSearchParams = (params: URLSearchParams) => {
    const currentParams = new URLSearchParams(window.location.search);
    params.forEach((value, key) => currentParams.set(key, value));
    window.history.replaceState(null, '', '?' + currentParams.toString());
  };

  const [search, setSearch] = useState(searchParams.get('user_name') || '');
  const [status, setStatus] = useState(searchParams.get('status') || ''); // Adiciona status

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }

    if (status && status !== 'all') {
      params.set('status', status);
    } else {
      params.delete('status');
    }

    window.history.replaceState(null, '', `?${params.toString()}`);

    setSearchParams(params);
  };

  const handleClear = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete('search');
    params.delete('status');

    setSearch('');
    setStatus('');

    window.history.replaceState(null, '', `?${params.toString()}`);
  };

  return (
    <div className="border-b bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex space-x-5">
          <div className="w-full">
            <Label>Usuário</Label>
            <Input
              placeholder="Buscar por nome de usuário..."
              className="max-w-xs"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="w-full">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="true">Ativo</SelectItem>
                <SelectItem value="false">Desativado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-5 flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={handleSearch}>
            <FaSearch className="mr-2" />
            Buscar
          </Button>

          <Button variant="outline" size="sm" onClick={handleClear}>
            <FaTimes className="mr-2" />
            Limpar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UsersFilter;
