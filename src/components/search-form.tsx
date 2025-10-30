"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"


export function SearchForm({ initialQuery = '', initialType = 'anime' }) {
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState(initialType);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}&type=${type}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
      <div className="flex w-full items-center space-x-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for anime or manga..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 text-lg"
          />
        </div>
        <Button type="submit" size="lg" className="h-12">Search</Button>
      </div>
      <RadioGroup defaultValue={type} onValueChange={setType} className="flex space-x-4 mt-4 justify-center">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="anime" id="r-anime" />
          <Label htmlFor="r-anime">Anime</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="manga" id="r-manga" />
          <Label htmlFor="r-manga">Manga</Label>
        </div>
      </RadioGroup>
    </form>
  );
}
