'use client'

import { useState } from 'react'
import styles from './SearchInput.module.scss'

interface Props {
  onSearch: (query: string) => void
}

export default function SearchInput({ onSearch }: Props) {
  const [query, setQuery] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    onSearch(value)
  }

  return (
    <input
      className={styles.input}
      type="text"
      placeholder="جستجو در محصولات..."
      value={query}
      onChange={handleChange}
    />
  )
}
